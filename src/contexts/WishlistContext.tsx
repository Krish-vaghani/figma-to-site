import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/lib/toast";
import { useAuth } from "@/contexts/AuthContext";

interface WishlistContextType {
  wishlist: (string | number)[];
  addToWishlist: (id: string | number) => void;
  removeFromWishlist: (id: string | number) => void;
  toggleWishlist: (id: string | number, productName?: string) => void;
  isInWishlist: (id: string | number) => boolean;
  wishlistCount: number;
  getShareUrl: () => string;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const getStorageKey = (phone: string | undefined) => phone ? `wishlist_${phone}` : "wishlist";

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const storageKey = getStorageKey(user?.phone);

  const [wishlist, setWishlist] = useState<(string | number)[]>(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    setWishlist(stored ? JSON.parse(stored) : []);
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(wishlist));
  }, [wishlist, storageKey]);

  const addToWishlist = (id: string | number) => {
    setWishlist((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFromWishlist = (id: string | number) => {
    setWishlist((prev) => prev.filter((item) => item !== id));
  };

  const toggleWishlist = (id: string | number, productName?: string) => {
    setWishlist((prev) => {
      const isAdding = !prev.includes(id);
      if (isAdding) {
        toast.wishlist.added(productName);
        return [...prev, id];
      } else {
        toast.wishlist.removed(productName);
        return prev.filter((item) => item !== id);
      }
    });
  };

  const isInWishlist = (id: string | number) => wishlist.includes(id);

  const getShareUrl = () => {
    const base = `${window.location.origin}/purses`;
    return wishlist.length > 0 ? `${base}?wishlist=${wishlist.join(",")}` : base;
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, wishlistCount: wishlist.length, getShareUrl }}
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
