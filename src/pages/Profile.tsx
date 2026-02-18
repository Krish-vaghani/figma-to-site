import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  MapPin,
  Heart,
  LogOut,
  ChevronRight,
  User,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useAuth } from "@/contexts/AuthContext";
import { useSeo } from "@/hooks/useSeo";
import { shopBackground } from "@/lib/assetUrls";
import { showToast } from "@/lib/toast";

const menuItems = [
  {
    icon: ShoppingBag,
    label: "My Orders",
    description: "Track and manage your orders",
    href: "/orders",
    color: "text-coral",
    bg: "bg-coral/10",
  },
  {
    icon: MapPin,
    label: "My Addresses",
    description: "Saved delivery addresses",
    href: "/addresses",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Heart,
    label: "My Wishlist",
    description: "Products you've saved",
    href: "/wishlist",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
];

const Profile = () => {
  useSeo("My Profile", "Manage your account, orders and addresses.");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast.success({ title: "Logged out", description: "See you soon!" });
    navigate("/", { replace: true });
  };

  // Get initials for avatar
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />

      {/* Header */}
      <div
        className="relative overflow-hidden bg-cover bg-right sm:bg-top"
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
              <Link to="/" className="hover:text-coral transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Profile</span>
            </nav>
          </div>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 -mt-8 pb-20">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-border bg-background shadow-md overflow-hidden"
        >
          {/* Avatar section */}
          <div className="bg-gradient-to-br from-coral/10 via-background to-background px-6 pt-8 pb-6 flex items-center gap-5">
            <div className="h-16 w-16 rounded-full bg-coral flex items-center justify-center text-white text-2xl font-bold shadow-md shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-foreground truncate">
                {user?.name ?? "User"}
              </h2>
              <div className="flex items-center gap-1.5 mt-1 text-muted-foreground text-sm">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <span>{user?.phone ?? "—"}</span>
              </div>
            </div>
          </div>

          <div className="px-4 pb-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-3">
              Account
            </p>

            {/* Menu items */}
            <ul className="space-y-1">
              {menuItems.map(({ icon: Icon, label, description, href, color, bg }) => (
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

            <div className="mt-4 px-2">
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
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
