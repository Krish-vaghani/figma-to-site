import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { toast } from "@/lib/toast";
import { useAuth } from "@/contexts/AuthContext";

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

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const storageKey = getStorageKey(user?.phone);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Re-load cart when user changes
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    setCart(stored ? JSON.parse(stored) : []);
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, storageKey]);

  const addToCart = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.color === item.color
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
  }, []);

  const removeFromCart = useCallback((id: number | string, color: string) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === id && i.color === color);
      if (item) toast.cart.removed(item.name);
      return prev.filter((item) => !(item.id === id && item.color === color));
    });
  }, []);

  const updateQuantity = useCallback((id: number | string, color: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.color === color ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    toast.cart.cleared();
  }, []);

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
