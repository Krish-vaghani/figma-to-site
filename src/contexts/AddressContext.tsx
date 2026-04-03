import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { DeliveryAddress } from "@/contexts/OrderContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  useGetAddressListQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} from "@/store/services/addressApi";
import {
  apiAddressToSavedAddress,
  toAddAddressRequest,
  toUpdateAddressRequest,
} from "@/types/address";

export interface SavedAddress extends DeliveryAddress {
  id: string;
  label: string;
  isDefault: boolean;
}

interface AddressContextType {
  addresses: SavedAddress[];
  addAddress: (address: DeliveryAddress, label: string) => SavedAddress | Promise<SavedAddress>;
  updateAddress: (id: string, address: DeliveryAddress, label: string) => void;
  deleteAddress: (id: string) => void;
  setDefault: (id: string) => void;
  getDefault: () => SavedAddress | undefined;
  isLoadingAddresses?: boolean;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

const getStorageKey = (phone: string | undefined) => phone ? `saved_addresses_${phone}` : "saved_addresses";

export const AddressProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoggedIn } = useAuth();
  const storageKey = getStorageKey(user?.phone);

  const [localAddresses, setLocalAddresses] = useState<SavedAddress[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  /** Gate on `isLoggedIn` (token), not `user` — if token exists but auth_user is missing, APIs must still run. */
  const { data: listResponse, isLoading: isLoadingAddresses } = useGetAddressListQuery(
    { page: 1, limit: 100 },
    { skip: !isLoggedIn }
  );
  const [addAddressMutation] = useAddAddressMutation();
  const [updateAddressMutation] = useUpdateAddressMutation();
  const [deleteAddressMutation] = useDeleteAddressMutation();

  const apiAddresses: SavedAddress[] = listResponse?.data?.map(apiAddressToSavedAddress) ?? [];
  const addresses = isLoggedIn ? apiAddresses : localAddresses;

  useEffect(() => {
    if (isLoggedIn) return;
    try {
      const stored = localStorage.getItem(storageKey);
      setLocalAddresses(stored ? JSON.parse(stored) : []);
    } catch { setLocalAddresses([]); }
  }, [storageKey, isLoggedIn]);

  const persist = useCallback(
    (updated: SavedAddress[]) => {
      setLocalAddresses(updated);
      localStorage.setItem(storageKey, JSON.stringify(updated));
    },
    [storageKey]
  );

  const addAddress = useCallback(
    (address: DeliveryAddress, label: string): SavedAddress | Promise<SavedAddress> => {
      if (isLoggedIn) {
        const isFirst = apiAddresses.length === 0;
        const body = toAddAddressRequest(address, label, isFirst);
        return addAddressMutation(body)
          .unwrap()
          .then((res) => {
            if (!res.data) throw new Error("Address saved but no data returned");
            return apiAddressToSavedAddress(res.data) as SavedAddress;
          });
      }
      const isFirst = localAddresses.length === 0;
      const newAddr: SavedAddress = { ...address, id: `addr-${Date.now()}`, label, isDefault: isFirst };
      persist([...localAddresses, newAddr]);
      return newAddr;
    },
    [isLoggedIn, apiAddresses.length, localAddresses, addAddressMutation, persist]
  );

  const updateAddress = useCallback(
    (id: string, address: DeliveryAddress, label: string) => {
      if (isLoggedIn) {
        updateAddressMutation({
          id,
          body: toUpdateAddressRequest({ ...address, label }),
        });
        return;
      }
      persist(localAddresses.map((a) => (a.id === id ? { ...a, ...address, label } : a)));
    },
    [isLoggedIn, localAddresses, updateAddressMutation, persist]
  );

  const deleteAddress = useCallback(
    (id: string) => {
      if (isLoggedIn) {
        deleteAddressMutation(id);
        return;
      }
      const remaining = localAddresses.filter((a) => a.id !== id);
      const hadDefault = localAddresses.find((a) => a.id === id)?.isDefault;
      if (hadDefault && remaining.length > 0) remaining[0].isDefault = true;
      persist(remaining);
    },
    [isLoggedIn, localAddresses, deleteAddressMutation, persist]
  );

  const setDefault = useCallback(
    (id: string) => {
      if (isLoggedIn) {
        updateAddressMutation({ id, body: { is_default: true } });
        return;
      }
      persist(localAddresses.map((a) => ({ ...a, isDefault: a.id === id })));
    },
    [isLoggedIn, localAddresses, updateAddressMutation, persist]
  );

  const getDefault = useCallback(() => addresses.find((a) => a.isDefault), [addresses]);

  return (
    <AddressContext.Provider
      value={{
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefault,
        getDefault,
        isLoadingAddresses: isLoggedIn ? isLoadingAddresses : false,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddresses = () => {
  const ctx = useContext(AddressContext);
  if (!ctx) throw new Error("useAddresses must be used within AddressProvider");
  return ctx;
};
