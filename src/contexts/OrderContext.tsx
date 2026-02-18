import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem } from "@/contexts/CartContext";

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  address: DeliveryAddress;
  total: number;
  paymentMethod: "cod" | "online";
  status: "placed" | "confirmed" | "shipped" | "delivered" | "cancelled";
  placedAt: string;
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (items: CartItem[], address: DeliveryAddress, paymentMethod: "cod" | "online", total: number) => Order;
  getOrder: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const stored = localStorage.getItem("orders");
    return stored ? JSON.parse(stored) : [];
  });

  const placeOrder = (
    items: CartItem[],
    address: DeliveryAddress,
    paymentMethod: "cod" | "online",
    total: number
  ): Order => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items,
      address,
      total,
      paymentMethod,
      status: "placed",
      placedAt: new Date().toISOString(),
    };
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    return newOrder;
  };

  const getOrder = (id: string) => orders.find((o) => o.id === id);

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within an OrderProvider");
  return context;
};
