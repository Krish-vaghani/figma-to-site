import { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from "react";
import { toast } from "@/lib/toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
} from "@/store/services/cartApi";
import { cartApiItemToCartItem } from "@/types/cart";

export interface CartItem {
  id: number | string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: number | string, color: string) => void;
  updateQuantity: (id: number | string, color: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const getStorageKey = (phone: string | undefined) => phone ? `cart_${phone}` : "cart";

function normalizeId(id: number | string): string {
  return String(id);
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const storageKey = getStorageKey(user?.phone);

  const [localCart, setLocalCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const { data: cartData } = useGetCartQuery(undefined, { skip: !user });
  const [addMutation] = useAddToCartMutation();
  const [updateMutation] = useUpdateCartMutation();
  const [removeMutation] = useRemoveFromCartMutation();

  const [apiSyncedCart, setApiSyncedCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (cartData?.data != null)
      setApiSyncedCart(cartData.data.map(cartApiItemToCartItem));
  }, [cartData?.data]);

  const cart = user ? apiSyncedCart : localCart;

  useEffect(() => {
    if (user) return;
    try {
      const stored = localStorage.getItem(storageKey);
      setLocalCart(stored ? JSON.parse(stored) : []);
    } catch {
      setLocalCart([]);
    }
  }, [storageKey, user]);

  useEffect(() => {
    if (!user) localStorage.setItem(storageKey, JSON.stringify(localCart));
  }, [user, localCart, storageKey]);

  const addToCart = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      const sid = normalizeId(item.id);
      if (user) {
        setApiSyncedCart((prev) => {
          const existingIndex = prev.findIndex(
            (c) => normalizeId(c.id) === sid && c.color === item.color
          );
          if (existingIndex > -1) {
            const updated = [...prev];
            updated[existingIndex].quantity += quantity;
            toast.cart.updated(item.name, updated[existingIndex].quantity);
            return updated;
          }
          toast.cart.added(item.name, quantity);
          return [...prev, { ...item, quantity }];
        });
        addMutation({ productId: sid, quantity }).catch(() => {});
      } else {
        setLocalCart((prev) => {
          const existingIndex = prev.findIndex(
            (c) => c.id === item.id && c.color === item.color
          );
          if (existingIndex > -1) {
            const updated = [...prev];
            updated[existingIndex].quantity += quantity;
            toast.cart.updated(item.name, updated[existingIndex].quantity);
            return updated;
          }
          toast.cart.added(item.name, quantity);
          return [...prev, { ...item, quantity }];
        });
      }
    },
    [user, addMutation]
  );

  const removeFromCart = useCallback(
    (id: number | string, color: string) => {
      const sid = normalizeId(id);
      if (user) {
        setApiSyncedCart((prev) => {
          const item = prev.find((c) => normalizeId(c.id) === sid && c.color === color);
          if (item) toast.cart.removed(item.name);
          return prev.filter((c) => !(normalizeId(c.id) === sid && c.color === color));
        });
        removeMutation({ productId: sid }).catch(() => {});
      } else {
        setLocalCart((prev) => {
          const item = prev.find((c) => c.id === id && c.color === color);
          if (item) toast.cart.removed(item.name);
          return prev.filter((c) => !(c.id === id && c.color === color));
        });
      }
    },
    [user, removeMutation]
  );

  const updateQuantity = useCallback(
    (id: number | string, color: string, quantity: number) => {
      if (quantity < 1) {
        removeFromCart(id, color);
        return;
      }
      const sid = normalizeId(id);
      if (user) {
        setApiSyncedCart((prev) =>
          prev.map((c) =>
            normalizeId(c.id) === sid && c.color === color ? { ...c, quantity } : c
          )
        );
        updateMutation({ productId: sid, quantity }).catch(() => {});
      } else {
        setLocalCart((prev) =>
          prev.map((c) =>
            c.id === id && c.color === color ? { ...c, quantity } : c
          )
        );
      }
    },
    [user, removeFromCart, updateMutation]
  );

  const clearCart = useCallback(() => {
    if (user) {
      apiSyncedCart.forEach((item) => {
        removeMutation({ productId: normalizeId(item.id) }).catch(() => {});
      });
      setApiSyncedCart([]);
    } else {
      setLocalCart([]);
    }
    toast.cart.cleared();
  }, [user, apiSyncedCart, removeMutation]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal, isCartOpen, setIsCartOpen }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
