import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { CheckCircle2, Package, MapPin, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useOrders } from "@/contexts/OrderContext";

const OrderSuccess = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getOrder } = useOrders();
  const order = id ? getOrder(id) : undefined;

  useEffect(() => {
    if (!order) navigate("/orders");
  }, [order, navigate]);

  if (!order) return null;

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

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 text-center">
        {/* Success icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-[hsl(var(--toast-success))]" strokeWidth={1.5} />
          </div>
        </div>
        <h1 className="text-3xl font-bold font-playfair text-foreground mb-2">Order Placed! 🎉</h1>
        <p className="text-muted-foreground mb-1">Thank you, <strong className="text-foreground">{order.address.fullName}</strong>!</p>
        <p className="text-muted-foreground text-sm mb-8">
          Your order <span className="font-mono font-semibold text-foreground">{order.id}</span> has been confirmed and will be shipped shortly.
        </p>

        {/* Order detail card */}
        <div className="bg-card border border-border rounded-2xl p-6 text-left space-y-5 mb-8">
          {/* Items */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-1.5">
              <Package className="h-4 w-4" /> Items Ordered
            </h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={`${item.id}-${item.color}`} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary/30 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-1">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-foreground">₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery address */}
          <div className="border-t border-border pt-4">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> Deliver To
            </h3>
            <p className="text-sm text-foreground font-medium">{order.address.fullName}</p>
            <p className="text-sm text-muted-foreground">{addressParts.join(", ")}</p>
            <p className="text-sm text-muted-foreground">📞 {order.address.phone}</p>
          </div>

          {/* Total & Payment */}
          <div className="border-t border-border pt-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-muted-foreground">Payment</p>
              <p className="text-sm font-medium text-foreground capitalize">
                {order.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total Paid</p>
              <p className="text-xl font-bold text-foreground">₹{order.total.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/orders">
            <button className="border border-border text-foreground font-medium px-6 py-3 rounded-full hover:bg-secondary/50 transition-colors flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" /> My Orders
            </button>
          </Link>
          <Link to="/purses">
            <button className="bg-coral text-white font-medium px-8 py-3 rounded-full hover:bg-coral/90 transition-colors">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderSuccess;
