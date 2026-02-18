import { Link } from "react-router-dom";
import { Package, MapPin, ShoppingBag, ChevronRight, Clock, CheckCircle2, Truck, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useOrders, Order } from "@/contexts/OrderContext";
import { shopBackground } from "@/lib/assetUrls";

const STATUS_CONFIG: Record<Order["status"], { label: string; color: string; icon: React.ElementType }> = {
  placed:    { label: "Order Placed",  color: "text-foreground bg-secondary",    icon: Clock },
  confirmed: { label: "Confirmed",     color: "text-foreground bg-secondary",    icon: CheckCircle2 },
  shipped:   { label: "Shipped",       color: "text-foreground bg-secondary",    icon: Truck },
  delivered: { label: "Delivered",     color: "text-[hsl(var(--toast-success))] bg-secondary", icon: CheckCircle2 },
  cancelled: { label: "Cancelled",     color: "text-destructive bg-destructive/10", icon: Clock },
};

const Orders = () => {
  const { orders } = useOrders();

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <Navbar />

      {/* Header */}
      <div
        className="relative w-full py-8 md:py-10 flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: `url(${shopBackground})`, backgroundSize: "cover", backgroundPosition: "top left" }}
      >
        <div className="absolute inset-0 bg-background/60" />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold font-playfair text-foreground">My Orders</h1>
          <p className="text-muted-foreground text-sm mt-1">
            <Link to="/" className="hover:text-coral transition-colors">Home</Link>
            {" / "}
            <span className="text-foreground">Orders</span>
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <p className="text-foreground font-semibold text-lg">No orders yet</p>
            <p className="text-muted-foreground text-sm max-w-xs">
              Looks like you haven't placed any orders. Start shopping to see your orders here.
            </p>
            <Link to="/purses">
              <button className="bg-coral text-white px-6 py-3 rounded-full font-medium hover:bg-coral/90 transition-colors mt-2">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            <p className="text-muted-foreground text-sm">{orders.length} order{orders.length > 1 ? "s" : ""} found</p>
            {orders.map((order) => {
              const status = STATUS_CONFIG[order.status];
              const StatusIcon = status.icon;
              const placedDate = new Date(order.placedAt).toLocaleDateString("en-IN", {
                day: "numeric", month: "short", year: "numeric",
              });

              return (
                <div key={order.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                  {/* Order header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-border bg-secondary/20">
                    <div className="flex flex-col gap-0.5">
                      <p className="font-mono text-sm font-semibold text-foreground">{order.id}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Placed on {placedDate}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${status.color}`}>
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </span>
                      <span className="text-sm font-bold text-foreground">₹{order.total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Items preview */}
                  <div className="px-5 py-4">
                    <div className="flex items-center gap-3 flex-wrap">
                      {order.items.slice(0, 3).map((item) => (
                        <div key={`${item.id}-${item.color}`} className="flex items-center gap-2">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary/30 flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground leading-tight line-clamp-1 max-w-[140px]">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity} · ₹{(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <span className="text-xs text-muted-foreground">+{order.items.length - 3} more</span>
                      )}
                    </div>

                    {/* Delivery to */}
                    <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">
                        {[order.address.city, order.address.state, order.address.pincode].filter(Boolean).join(", ")}
                      </span>
                    </div>

                    {/* Actions row */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground capitalize">
                          {order.paymentMethod === "cod" ? "💵 Cash on Delivery" : "💳 Online Payment"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {order.status === "delivered" && (
                          <button className="flex items-center gap-1 text-xs text-coral border border-coral/30 rounded-full px-3 py-1.5 hover:bg-coral/5 transition-colors">
                            <Star className="h-3 w-3" /> Rate Order
                          </button>
                        )}
                        <Link to={`/order-success/${order.id}`}>
                          <button className="flex items-center gap-1 text-xs text-foreground border border-border rounded-full px-3 py-1.5 hover:bg-secondary/50 transition-colors">
                            View Details <ChevronRight className="h-3 w-3" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Orders;
