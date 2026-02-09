import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

export interface CartItem {
  id: number;
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
  removeFromCart: (id: number, color: string) => void;
  updateQuantity: (id: number, color: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.color === item.color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        toast.success("Cart Updated 🛒", {
          description: `${item.name} quantity increased to ${updated[existingIndex].quantity}.`,
        });
        return updated;
      }

      toast.success("Added to Cart 🛒", {
        description: `${quantity}x ${item.name} has been added to your cart.`,
      });
      return [...prev, { ...item, quantity }];
    });
  };

  const removeFromCart = (id: number, color: string) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === id && i.color === color);
      if (item) {
        toast.success("Removed from Cart", {
          description: `${item.name} has been removed from your cart.`,
        });
      }
      return prev.filter((item) => !(item.id === id && item.color === color));
    });
  };

  const updateQuantity = (id: number, color: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.color === color ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Cart Cleared", {
      description: "All items have been removed from your cart.",
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
