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

export type OrderStatus = "placed" | "confirmed" | "shipped" | "out_for_delivery" | "delivered" | "cancelled";

export interface TrackingEvent {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp: string; // ISO
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
  estimatedDelivery: string; // ISO date
  trackingEvents: TrackingEvent[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Add `hours` hours to an ISO timestamp */
const addHours = (iso: string, hours: number): string => {
  const d = new Date(iso);
  d.setHours(d.getHours() + hours);
  return d.toISOString();
};

/** Add calendar days to an ISO timestamp */
const addDays = (iso: string, days: number): string => {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

/** Build the canonical tracking timeline for a new order */
export function buildTrackingTimeline(placedAt: string): TrackingEvent[] {
  return [
    {
      status: "placed",
      label: "Order Placed",
      description: "Your order has been received and is being reviewed.",
      timestamp: placedAt,
      completed: true,
    },
    {
      status: "confirmed",
      label: "Order Confirmed",
      description: "Payment confirmed. Your order is being prepared.",
      timestamp: addHours(placedAt, 2),
      completed: true,
    },
    {
      status: "shipped",
      label: "Shipped",
      description: "Your package is on its way with our delivery partner.",
      timestamp: addDays(placedAt, 1),
      completed: false,
    },
    {
      status: "out_for_delivery",
      label: "Out for Delivery",
      description: "Your package is out for delivery today.",
      timestamp: addDays(placedAt, 4),
      completed: false,
    },
    {
      status: "delivered",
      label: "Delivered",
      description: "Package delivered successfully. Enjoy your order!",
      timestamp: addDays(placedAt, 5),
      completed: false,
    },
  ];
}

// ─────────────────────────────────────────────────────────────────────────────

interface OrderContextType {
  orders: Order[];
  placeOrder: (
    items: CartItem[],
    address: DeliveryAddress,
    paymentMethod: "cod" | "online",
    total: number
  ) => Order;
  getOrder: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

/** Migrate legacy orders that may be missing the new fields */
function migrateOrder(raw: Partial<Order> & { id: string; placedAt: string }): Order {
  const placedAt = raw.placedAt ?? new Date().toISOString();
  return {
    id: raw.id,
    items: raw.items ?? [],
    address: raw.address ?? ({} as DeliveryAddress),
    total: raw.total ?? 0,
    paymentMethod: raw.paymentMethod ?? "cod",
    status: (raw.status as OrderStatus) ?? "placed",
    placedAt,
    estimatedDelivery: raw.estimatedDelivery ?? addDays(placedAt, 5),
    trackingEvents: raw.trackingEvents ?? buildTrackingTimeline(placedAt),
  };
}

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem("orders");
      const raw: Order[] = stored ? JSON.parse(stored) : [];
      return raw.map(migrateOrder);
    } catch {
      return [];
    }
  });

  const placeOrder = (
    items: CartItem[],
    address: DeliveryAddress,
    paymentMethod: "cod" | "online",
    total: number
  ): Order => {
    const placedAt = new Date().toISOString();
    const trackingEvents = buildTrackingTimeline(placedAt);

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items,
      address,
      total,
      paymentMethod,
      status: "confirmed", // immediately move to confirmed
      placedAt,
      estimatedDelivery: addDays(placedAt, 5),
      trackingEvents,
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
