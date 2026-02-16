import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/lib/toast";

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

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<(string | number)[]>(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

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
      value={{
        wishlist,
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
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
