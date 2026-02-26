import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

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

export type OrderStatus = "placed" | "confirmed" | "shipped" | "out_for_delivery" | "delivered" | "cancelled";

export interface TrackingEvent {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  address: DeliveryAddress;
  total: number;
  paymentMethod: "cod" | "online";
  status: OrderStatus;
  placedAt: string;
  estimatedDelivery: string;
  trackingEvents: TrackingEvent[];
}

const addHours = (iso: string, hours: number): string => {
  const d = new Date(iso);
  d.setHours(d.getHours() + hours);
  return d.toISOString();
};

const addDays = (iso: string, days: number): string => {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

export function buildTrackingTimeline(placedAt: string): TrackingEvent[] {
  return [
    { status: "placed", label: "Order Placed", description: "Your order has been received and is being reviewed.", timestamp: placedAt, completed: true },
    { status: "confirmed", label: "Order Confirmed", description: "Payment confirmed. Your order is being prepared.", timestamp: addHours(placedAt, 2), completed: true },
    { status: "shipped", label: "Shipped", description: "Your package is on its way with our delivery partner.", timestamp: addDays(placedAt, 1), completed: false },
    { status: "out_for_delivery", label: "Out for Delivery", description: "Your package is out for delivery today.", timestamp: addDays(placedAt, 4), completed: false },
    { status: "delivered", label: "Delivered", description: "Package delivered successfully. Enjoy your order!", timestamp: addDays(placedAt, 5), completed: false },
  ];
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (items: CartItem[], address: DeliveryAddress, paymentMethod: "cod" | "online", total: number) => Order;
  getOrder: (id: string) => Order | undefined;
  /** Add an order from API (e.g. after create-razorpay-order). */
  addOrder: (order: Order) => void;
  /** Update an existing order (e.g. after verify-razorpay-payment). */
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

function migrateOrder(raw: Partial<Order> & { id: string; placedAt: string }): Order {
  const placedAt = raw.placedAt ?? new Date().toISOString();
  return {
    id: raw.id, items: raw.items ?? [], address: raw.address ?? ({} as DeliveryAddress),
    total: raw.total ?? 0, paymentMethod: raw.paymentMethod ?? "cod",
    status: (raw.status as OrderStatus) ?? "placed", placedAt,
    estimatedDelivery: raw.estimatedDelivery ?? addDays(placedAt, 5),
    trackingEvents: raw.trackingEvents ?? buildTrackingTimeline(placedAt),
  };
}

const getStorageKey = (phone: string | undefined) => phone ? `orders_${phone}` : "orders";

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const storageKey = getStorageKey(user?.phone);

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      const raw: Order[] = stored ? JSON.parse(stored) : [];
      return raw.map(migrateOrder);
    } catch { return []; }
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      const raw: Order[] = stored ? JSON.parse(stored) : [];
      setOrders(raw.map(migrateOrder));
    } catch { setOrders([]); }
  }, [storageKey]);

  const placeOrder = (items: CartItem[], address: DeliveryAddress, paymentMethod: "cod" | "online", total: number): Order => {
    const placedAt = new Date().toISOString();
    const newOrder: Order = {
      id: `ORD-${Date.now()}`, items, address, total, paymentMethod,
      status: "confirmed", placedAt,
      estimatedDelivery: addDays(placedAt, 5),
      trackingEvents: buildTrackingTimeline(placedAt),
    };
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem(storageKey, JSON.stringify(updatedOrders));
    return newOrder;
  };

  const getOrder = (id: string) => orders.find((o) => o.id === id);

  const addOrder = (order: Order) => {
    const normalized = migrateOrder(order);
    setOrders((prev) => {
      const next = [normalized, ...prev.filter((o) => o.id !== normalized.id)];
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  };

  const updateOrder = (orderId: string, updates: Partial<Order>) => {
    setOrders((prev) => {
      const next = prev.map((o) => (o.id === orderId ? { ...o, ...updates } : o));
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getOrder, addOrder, updateOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within an OrderProvider");
  return context;
};
