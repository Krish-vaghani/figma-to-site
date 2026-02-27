import { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from "react";
import { toast } from "@/lib/toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "@/store/services/wishlistApi";
import type { WishlistItem } from "@/types/wishlist";

interface WishlistContextType {
  wishlist: (string | number)[];
  wishlistItemsFromApi: WishlistItem[];
  addToWishlist: (id: string | number) => void;
  removeFromWishlist: (id: string | number) => void;
  toggleWishlist: (id: string | number, productName?: string) => void;
  isInWishlist: (id: string | number) => boolean;
  wishlistCount: number;
  getShareUrl: () => string;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const getStorageKey = (phone: string | undefined) => phone ? `wishlist_${phone}` : "wishlist";

function normalizeId(id: string | number): string {
  return String(id);
}

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const storageKey = getStorageKey(user?.phone);

  const [localWishlist, setLocalWishlist] = useState<(string | number)[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [optimisticAdd, setOptimisticAdd] = useState<Set<string>>(() => new Set());
  const [optimisticRemove, setOptimisticRemove] = useState<Set<string>>(() => new Set());

  const { data: wishlistData } = useGetWishlistQuery(undefined, { skip: !user });
  const [addMutation] = useAddToWishlistMutation();
  const [removeMutation] = useRemoveFromWishlistMutation();

  const apiIds = useMemo(
    () => (wishlistData?.data ?? []).map((i) => i._id),
    [wishlistData?.data]
  );

  useEffect(() => {
    setOptimisticAdd(new Set());
    setOptimisticRemove(new Set());
  }, [wishlistData?.data]);

  useEffect(() => {
    if (user) return;
    try {
      const stored = localStorage.getItem(storageKey);
      setLocalWishlist(stored ? JSON.parse(stored) : []);
    } catch {
      setLocalWishlist([]);
    }
  }, [storageKey, user]);

  useEffect(() => {
    if (!user) localStorage.setItem(storageKey, JSON.stringify(localWishlist));
  }, [user, localWishlist, storageKey]);

  const wishlist = useMemo(() => {
    if (user) {
      const withAdd = new Set(apiIds);
      optimisticAdd.forEach((id) => withAdd.add(id));
      optimisticRemove.forEach((id) => withAdd.delete(id));
      return [...withAdd];
    }
    return localWishlist;
  }, [user, apiIds, optimisticAdd, optimisticRemove, localWishlist]);

  const wishlistItemsFromApi = useMemo(() => wishlistData?.data ?? [], [wishlistData?.data]);

  const addToWishlist = useCallback(
    (id: string | number) => {
      const sid = normalizeId(id);
      if (user) {
        setOptimisticAdd((prev) => new Set(prev).add(sid));
        setOptimisticRemove((prev) => {
          const next = new Set(prev);
          next.delete(sid);
          return next;
        });
        addMutation({ productId: sid }).catch(() => {});
      } else {
        setLocalWishlist((prev) => (prev.includes(id) ? prev : [...prev, id]));
      }
    },
    [user, addMutation]
  );

  const removeFromWishlist = useCallback(
    (id: string | number) => {
      const sid = normalizeId(id);
      if (user) {
        setOptimisticRemove((prev) => new Set(prev).add(sid));
        setOptimisticAdd((prev) => {
          const next = new Set(prev);
          next.delete(sid);
          return next;
        });
        removeMutation({ productId: sid }).catch(() => {});
      } else {
        setLocalWishlist((prev) => prev.filter((item) => normalizeId(item) !== sid));
      }
    },
    [user, removeMutation]
  );

  const toggleWishlist = useCallback(
    (id: string | number, productName?: string) => {
      const sid = normalizeId(id);
      const inList = wishlist.some((w) => normalizeId(w) === sid);
      if (inList) {
        toast.wishlist.removed(productName);
        removeFromWishlist(id);
      } else {
        toast.wishlist.added(productName);
        addToWishlist(id);
      }
    },
    [wishlist, addToWishlist, removeFromWishlist]
  );

  const isInWishlist = useCallback(
    (id: string | number) => wishlist.some((w) => normalizeId(w) === normalizeId(id)),
    [wishlist]
  );

  const getShareUrl = useCallback(() => {
    const base = `${window.location.origin}/purses`;
    const ids = wishlist.map((w) => String(w));
    return ids.length > 0 ? `${base}?wishlist=${ids.join(",")}` : base;
  }, [wishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistItemsFromApi,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,
        getShareUrl,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
};
