import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { DeliveryAddress } from "@/contexts/OrderContext";
import { useAuth } from "@/contexts/AuthContext";

export interface SavedAddress extends DeliveryAddress {
  id: string;
  label: string;
  isDefault: boolean;
}

interface AddressContextType {
  addresses: SavedAddress[];
  addAddress: (address: DeliveryAddress, label: string) => SavedAddress;
  updateAddress: (id: string, address: DeliveryAddress, label: string) => void;
  deleteAddress: (id: string) => void;
  setDefault: (id: string) => void;
  getDefault: () => SavedAddress | undefined;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

const getStorageKey = (phone: string | undefined) => phone ? `saved_addresses_${phone}` : "saved_addresses";

export const AddressProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const storageKey = getStorageKey(user?.phone);

  const [addresses, setAddresses] = useState<SavedAddress[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      setAddresses(stored ? JSON.parse(stored) : []);
    } catch { setAddresses([]); }
  }, [storageKey]);

  const persist = (updated: SavedAddress[]) => {
    setAddresses(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const addAddress = (address: DeliveryAddress, label: string): SavedAddress => {
    const isFirst = addresses.length === 0;
    const newAddr: SavedAddress = { ...address, id: `addr-${Date.now()}`, label, isDefault: isFirst };
    persist([...addresses, newAddr]);
    return newAddr;
  };

  const updateAddress = (id: string, address: DeliveryAddress, label: string) => {
    persist(addresses.map((a) => (a.id === id ? { ...a, ...address, label } : a)));
  };

  const deleteAddress = (id: string) => {
    const remaining = addresses.filter((a) => a.id !== id);
    const hadDefault = addresses.find((a) => a.id === id)?.isDefault;
    if (hadDefault && remaining.length > 0) remaining[0].isDefault = true;
    persist(remaining);
  };

  const setDefault = (id: string) => {
    persist(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const getDefault = () => addresses.find((a) => a.isDefault);

  return (
    <AddressContext.Provider value={{ addresses, addAddress, updateAddress, deleteAddress, setDefault, getDefault }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddresses = () => {
  const ctx = useContext(AddressContext);
  if (!ctx) throw new Error("useAddresses must be used within AddressProvider");
  return ctx;
};
