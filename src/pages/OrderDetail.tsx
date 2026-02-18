import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  CheckCircle2, Package, MapPin, ShoppingBag, Truck, Clock,
  ArrowLeft, Star, Navigation, PartyPopper, XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useOrders, Order, OrderStatus, TrackingEvent } from "@/contexts/OrderContext";
import { shopBackground } from "@/lib/assetUrls";

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_META: Record<OrderStatus, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  placed:           { label: "Order Placed",      icon: Clock,        color: "text-foreground",                           bg: "bg-secondary" },
  confirmed:        { label: "Confirmed",          icon: CheckCircle2, color: "text-[hsl(var(--toast-info))]",             bg: "bg-[hsl(var(--toast-info))]/10" },
  shipped:          { label: "Shipped",            icon: Truck,        color: "text-coral",                               bg: "bg-coral/10" },
  out_for_delivery: { label: "Out for Delivery",   icon: Navigation,   color: "text-[hsl(var(--toast-warning))]",          bg: "bg-[hsl(var(--toast-warning))]/10" },
  delivered:        { label: "Delivered",          icon: PartyPopper,  color: "text-[hsl(var(--toast-success))]",          bg: "bg-[hsl(var(--toast-success))]/10" },
  cancelled:        { label: "Cancelled",          icon: XCircle,      color: "text-destructive",                         bg: "bg-destructive/10" },
};

// ── Timeline step ─────────────────────────────────────────────────────────────
const TimelineStep = ({
  event,
  isLast,
  isCurrent,
}: {
  event: TrackingEvent;
  isLast: boolean;
  isCurrent: boolean;
}) => {
  const meta = STATUS_META[event.status];
  const Icon = meta.icon;

  const formattedDate = new Date(event.timestamp).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
  const formattedTime = new Date(event.timestamp).toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit", hour12: true,
  });

  return (
    <div className="flex gap-4">
      {/* Left: icon + line */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={isCurrent ? { scale: 0.8 } : false}
          animate={isCurrent ? { scale: [1, 1.12, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 z-10 ${
            event.completed
              ? isCurrent
                ? `${meta.bg} ${meta.color} border-current shadow-md`
                : "bg-secondary border-border text-foreground"
              : "bg-background border-dashed border-border text-muted-foreground"
          }`}
        >
          <Icon className="h-4 w-4" />
        </motion.div>
        {!isLast && (
          <div
            className={`w-0.5 flex-1 mt-1 mb-1 min-h-[32px] rounded-full ${
              event.completed ? "bg-border" : "bg-border/40 border-dashed"
            }`}
          />
        )}
      </div>

      {/* Right: content */}
      <div className={`pb-6 flex-1 ${isLast ? "" : ""}`}>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
          <p className={`text-sm font-semibold ${event.completed ? "text-foreground" : "text-muted-foreground"}`}>
            {event.label}
            {isCurrent && (
              <span className={`ml-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>
                Current
              </span>
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            {event.completed ? `${formattedDate} · ${formattedTime}` : `Est. ${formattedDate}`}
          </p>
        </div>
        <p className={`text-xs mt-0.5 ${event.completed ? "text-muted-foreground" : "text-muted-foreground/60"}`}>
          {event.description}
        </p>
      </div>
    </div>
  );
};

// ── Estimated delivery banner ──────────────────────────────────────────────────
const DeliveryBanner = ({ order }: { order: Order }) => {
  if (order.status === "cancelled") return null;

  const deliveryDate = new Date(order.estimatedDelivery);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  deliveryDate.setHours(0, 0, 0, 0);

  const diffMs = deliveryDate.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  const isDelivered = order.status === "delivered";
  const dateLabel = deliveryDate.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

  let countdownLabel = "";
  if (!isDelivered) {
    if (diffDays === 0) countdownLabel = "Today";
    else if (diffDays === 1) countdownLabel = "Tomorrow";
    else if (diffDays > 1) countdownLabel = `In ${diffDays} days`;
    else countdownLabel = "Delayed";
  }

  return (
    <div
      className={`rounded-2xl p-5 flex items-center gap-4 ${
        isDelivered
          ? "bg-[hsl(var(--toast-success))]/10 border border-[hsl(var(--toast-success))]/20"
          : "bg-coral/5 border border-coral/20"
      }`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
          isDelivered ? "bg-[hsl(var(--toast-success))]/15" : "bg-coral/10"
        }`}
      >
        {isDelivered
          ? <PartyPopper className="h-6 w-6 text-[hsl(var(--toast-success))]" />
          : <Truck className="h-6 w-6 text-coral" />
        }
      </div>
      <div>
        {isDelivered ? (
          <>
            <p className="font-semibold text-[hsl(var(--toast-success))]">Delivered!</p>
            <p className="text-sm text-muted-foreground">Your order was delivered on {dateLabel}.</p>
          </>
        ) : (
          <>
            <p className="font-semibold text-foreground">
              Estimated Delivery ·{" "}
              <span className="text-coral">{countdownLabel}</span>
            </p>
            <p className="text-sm text-muted-foreground">{dateLabel}</p>
          </>
        )}
      </div>
    </div>
  );
};

// ── Main page ─────────────────────────────────────────────────────────────────
const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getOrder } = useOrders();
  const order = id ? getOrder(id) : undefined;

  useEffect(() => {
    if (!order) navigate("/orders");
  }, [order, navigate]);

  if (!order) return null;

  const statusMeta = STATUS_META[order.status];
  const StatusIcon = statusMeta.icon;

  const currentEventIndex = order.status === "cancelled"
    ? -1
    : [...order.trackingEvents].reverse().findIndex((e) => e.completed);
  const currentStepIdx = currentEventIndex === -1
    ? -1
    : order.trackingEvents.length - 1 - currentEventIndex;

  const placedDate = new Date(order.placedAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  const addressParts = [
    order.address.addressLine1,
    order.address.addressLine2,
    order.address.landmark,
    order.address.city,
    order.address.state,
    order.address.pincode,
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <Navbar />

      {/* Page header */}
      <div
        className="relative w-full py-8 md:py-10 flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: `url(${shopBackground})`, backgroundSize: "cover", backgroundPosition: "top left" }}
      >
        <div className="absolute inset-0 bg-background/60" />
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold font-playfair text-foreground">Order Details</h1>
          <p className="text-muted-foreground text-sm mt-1">
            <Link to="/" className="hover:text-coral transition-colors">Home</Link>
            {" / "}
            <Link to="/orders" className="hover:text-coral transition-colors">Orders</Link>
            {" / "}
            <span className="text-foreground font-mono">{order.id}</span>
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Back + order ID bar */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/orders" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Orders
          </Link>
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${statusMeta.bg} ${statusMeta.color}`}
          >
            <StatusIcon className="h-3.5 w-3.5" />
            {statusMeta.label}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">

          {/* ── LEFT ─────────────────────────────────────────────────────── */}
          <div className="space-y-6">

            {/* Estimated delivery banner */}
            <DeliveryBanner order={order} />

            {/* Tracking timeline */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-base font-semibold text-foreground mb-6 flex items-center gap-2">
                <Package className="h-4 w-4 text-coral" /> Tracking Timeline
              </h2>

              {order.status === "cancelled" ? (
                <div className="flex items-center gap-3 text-destructive bg-destructive/5 border border-destructive/20 rounded-xl p-4">
                  <XCircle className="h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Order Cancelled</p>
                    <p className="text-xs text-muted-foreground mt-0.5">This order was cancelled. No further updates.</p>
                  </div>
                </div>
              ) : (
                <div>
                  {order.trackingEvents.map((event, idx) => (
                    <TimelineStep
                      key={event.status}
                      event={event}
                      isLast={idx === order.trackingEvents.length - 1}
                      isCurrent={idx === currentStepIdx}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Items */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-coral" /> Items Ordered
              </h2>
              <div className="divide-y divide-border">
                {order.items.map((item) => (
                  <div key={`${item.id}-${item.color}`} className="flex items-center gap-4 py-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary/30 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground line-clamp-1">{item.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="w-3 h-3 rounded-full border border-border" style={{ backgroundColor: item.color }} />
                        <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">₹{item.price.toLocaleString()} each</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-foreground">₹{(item.price * item.quantity).toLocaleString()}</p>
                      {item.originalPrice > item.price && (
                        <p className="text-xs text-muted-foreground line-through">₹{item.originalPrice.toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-4 pt-4 border-t border-border space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{order.items.reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-[hsl(var(--toast-success))]">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-foreground text-base pt-1 border-t border-border">
                  <span>Total</span>
                  <span>₹{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

          </div>

          {/* ── RIGHT ────────────────────────────────────────────────────── */}
          <div className="space-y-4">

            {/* Order info card */}
            <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
              <h2 className="text-base font-semibold text-foreground">Order Info</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="font-mono font-semibold text-foreground text-right break-all">{order.id}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground">Placed On</span>
                  <span className="text-foreground">{placedDate}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground">Payment</span>
                  <span className="text-foreground">
                    {order.paymentMethod === "cod" ? "💵 Cash on Delivery" : "💳 Online"}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground">Status</span>
                  <span className={`font-semibold ${statusMeta.color}`}>{statusMeta.label}</span>
                </div>
              </div>
            </div>

            {/* Delivery address */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-coral" /> Deliver To
              </h2>
              <p className="text-sm font-semibold text-foreground">{order.address.fullName}</p>
              <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{addressParts.join(", ")}</p>
              <p className="text-sm text-muted-foreground mt-1">📞 {order.address.phone}</p>
              <p className="text-sm text-muted-foreground">✉️ {order.address.email}</p>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              {order.status === "delivered" && (
                <button className="w-full flex items-center justify-center gap-2 text-sm text-coral border-2 border-coral/30 rounded-full py-3 hover:bg-coral/5 transition-colors font-medium">
                  <Star className="h-4 w-4" /> Rate This Order
                </button>
              )}
              <Link to="/purses" className="block">
                <button className="w-full bg-coral text-white font-medium py-3 rounded-full hover:bg-coral/90 transition-colors text-sm">
                  Continue Shopping
                </button>
              </Link>
              <Link to="/orders" className="block">
                <button className="w-full border border-border text-foreground font-medium py-3 rounded-full hover:bg-secondary/50 transition-colors text-sm">
                  All Orders
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderDetail;
