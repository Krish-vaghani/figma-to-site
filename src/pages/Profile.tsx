import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  MapPin,
  Heart,
  LogOut,
  ChevronRight,
  Phone,
  Package,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders, Order } from "@/contexts/OrderContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAddresses, SavedAddress } from "@/contexts/AddressContext";
import { products } from "@/data/products";
import { useSeo } from "@/hooks/useSeo";
import { shopBackground } from "@/lib/assetUrls";
import { showToast } from "@/lib/toast";
import { format } from "date-fns";

// ─── Sub-components ────────────────────────────────────────────────────────

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-3">
    {children}
  </h3>
);

/* ── Recent Orders (last 3) ─────────────────────────────────────────────── */
const RecentOrders = ({ orders }: { orders: Order[] }) => {
  const recent = orders.slice(0, 3);

  if (recent.length === 0)
    return (
      <div className="text-center py-6 text-muted-foreground text-sm">
        No orders yet.{" "}
        <Link to="/purses" className="text-coral hover:underline">
          Start shopping
        </Link>
      </div>
    );

  const statusColor: Record<string, string> = {
    placed: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    out_for_delivery: "bg-orange-100 text-orange-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <ul className="space-y-2">
      {recent.map((order) => (
        <li key={order.id}>
          <Link
            to={`/orders/${order.id}`}
            className="flex items-center gap-4 px-3 py-3 rounded-2xl hover:bg-secondary transition-colors group"
          >
            <span className="h-10 w-10 rounded-xl bg-coral/10 flex items-center justify-center shrink-0">
              <Package className="h-5 w-5 text-coral" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {order.id}
              </p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(order.placedAt), "dd MMM yyyy")} · ₹{order.total.toLocaleString("en-IN")}
              </p>
            </div>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${statusColor[order.status] ?? "bg-secondary text-foreground"}`}
            >
              {order.status.replace(/_/g, " ")}
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
          </Link>
        </li>
      ))}
      {orders.length > 3 && (
        <li className="text-center pt-1">
          <Link to="/orders" className="text-sm text-coral hover:underline font-medium">
            View all orders →
          </Link>
        </li>
      )}
    </ul>
  );
};

/* ── Wishlisted Products (show all) ─────────────────────────────────────── */
const WishlistedProducts = ({
  wishlist,
  removeFromWishlist,
}: {
  wishlist: (string | number)[];
  removeFromWishlist: (id: string | number) => void;
}) => {
  const items = products.filter((p) => wishlist.includes(p.id));

  if (items.length === 0)
    return (
      <div className="text-center py-6 text-muted-foreground text-sm">
        Your wishlist is empty.{" "}
        <Link to="/purses" className="text-coral hover:underline">
          Browse products
        </Link>
      </div>
    );

  return (
    <ul className="space-y-2">
      {items.map((p) => (
        <li key={p.id} className="flex items-center gap-4 px-3 py-3 rounded-2xl hover:bg-secondary transition-colors group">
          <Link to={`/product/${p.slug ?? p.id}`} className="flex items-center gap-4 flex-1 min-w-0">
            <img
              src={p.image}
              alt={p.name}
              className="h-12 w-12 rounded-xl object-cover shrink-0 border border-border"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
              <p className="text-xs text-muted-foreground">
                ₹{p.price.toLocaleString("en-IN")}{" "}
                {p.originalPrice > p.price && (
                  <span className="line-through ml-1">₹{p.originalPrice.toLocaleString("en-IN")}</span>
                )}
              </p>
            </div>
          </Link>
          <button
            onClick={() => removeFromWishlist(p.id)}
            className="p-2 rounded-full hover:bg-destructive/10 transition-colors shrink-0"
            title="Remove from wishlist"
          >
            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
          </button>
        </li>
      ))}
    </ul>
  );
};

/* ── Saved Addresses ────────────────────────────────────────────────────── */
const SavedAddressesList = ({ addresses }: { addresses: SavedAddress[] }) => {
  if (addresses.length === 0)
    return (
      <div className="text-center py-6 text-muted-foreground text-sm">
        No saved addresses.{" "}
        <Link to="/addresses" className="text-coral hover:underline">
          Add one
        </Link>
      </div>
    );

  return (
    <ul className="space-y-2">
      {addresses.map((addr) => (
        <li key={addr.id} className="flex items-start gap-4 px-3 py-3 rounded-2xl hover:bg-secondary transition-colors">
          <span className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
            <MapPin className="h-5 w-5 text-blue-500" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground">{addr.label}</p>
              {addr.isDefault && (
                <span className="text-[10px] font-semibold bg-coral/10 text-coral px-2 py-0.5 rounded-full">
                  Default
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
              {addr.addressLine1}, {addr.city}, {addr.state} – {addr.pincode}
            </p>
          </div>
        </li>
      ))}
      <li className="text-center pt-1">
        <Link to="/addresses" className="text-sm text-coral hover:underline font-medium">
          Manage addresses →
        </Link>
      </li>
    </ul>
  );
};

// ─── Main Profile Page ──────────────────────────────────────────────────────

const Profile = () => {
  useSeo("My Profile", "Manage your account, orders and addresses.");
  const { user, logout } = useAuth();
  const { orders } = useOrders();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addresses } = useAddresses();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast.success({ title: "Logged out", description: "See you soon!" });
    navigate("/", { replace: true });
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const quickLinks = [
    { icon: ShoppingBag, label: "My Orders", description: `${orders.length} order${orders.length !== 1 ? "s" : ""}`, href: "/orders", color: "text-coral", bg: "bg-coral/10" },
    { icon: MapPin, label: "My Addresses", description: `${addresses.length} saved`, href: "/addresses", color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: Heart, label: "My Wishlist", description: `${wishlist.length} item${wishlist.length !== 1 ? "s" : ""}`, href: "/wishlist", color: "text-pink-500", bg: "bg-pink-500/10" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />

      {/* Header */}
      <div
        className="relative bg-cover bg-right sm:bg-top"
        style={{ backgroundImage: `url(${shopBackground})` }}
      >
        <div className="absolute inset-0 bg-background/50" aria-hidden="true" />
        <div className="relative z-10">
          <Navbar />
          <div className="py-12 sm:py-20 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-3">
              My Profile
            </h1>
            <nav className="text-muted-foreground text-sm">
              <Link to="/" className="hover:text-coral transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Profile</span>
            </nav>
          </div>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 -mt-4 sm:-mt-8 pb-20 space-y-6">
        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-border bg-background shadow-md overflow-hidden"
        >
          <div className="bg-gradient-to-br from-coral/10 via-background to-background px-6 pt-8 pb-6 flex items-center gap-5">
            <div className="h-16 w-16 rounded-full bg-coral flex items-center justify-center text-white text-2xl font-bold shadow-md shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-foreground truncate">{user?.name ?? "User"}</h2>
              <div className="flex items-center gap-1.5 mt-1 text-muted-foreground text-sm">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <span>{user?.phone ?? "—"}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="px-4 pb-4">
            <SectionTitle>Quick Links</SectionTitle>
            <ul className="space-y-1">
              {quickLinks.map(({ icon: Icon, label, description, href, color, bg }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="flex items-center gap-4 px-3 py-3.5 rounded-2xl hover:bg-secondary transition-colors group"
                  >
                    <span className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
                      <Icon className={`h-5 w-5 ${color}`} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-3xl border border-border bg-background shadow-md p-5"
        >
          <SectionTitle>Recent Orders</SectionTitle>
          <RecentOrders orders={orders} />
        </motion.div>

        {/* Wishlisted Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-3xl border border-border bg-background shadow-md p-5"
        >
          <SectionTitle>Wishlisted Products</SectionTitle>
          <WishlistedProducts wishlist={wishlist} removeFromWishlist={removeFromWishlist} />
        </motion.div>

        {/* Saved Addresses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-3xl border border-border bg-background shadow-md p-5"
        >
          <SectionTitle>Saved Addresses</SectionTitle>
          <SavedAddressesList addresses={addresses} />
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="px-2"
        >
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-2xl h-12 px-3"
            onClick={handleLogout}
          >
            <span className="h-10 w-10 rounded-xl flex items-center justify-center bg-destructive/10 shrink-0">
              <LogOut className="h-5 w-5" />
            </span>
            <span className="font-semibold">Logout</span>
          </Button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
