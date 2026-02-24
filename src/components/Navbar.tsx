import { useState, useEffect } from "react";
import { Search, ShoppingCart, Heart, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchModal from "./SearchModal";
import WishlistShareDialog from "./WishlistShareDialog";
import { logo } from "@/lib/assetUrls";
import { showToast } from "@/lib/toast";

type NavbarProps = {
  className?: string;
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/purses" },
  { label: "About Us", href: "/about" },
  { label: "My Orders", href: "/orders" },
  { label: "Contact Us", href: "#" },
];

const Navbar = ({ className }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();
  const { isLoggedIn, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu on scroll
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleScroll = () => setIsMenuOpen(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  const isActiveLink = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    showToast.success({ title: "Logged out", description: "See you soon!" });
    navigate("/");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <nav className={["sticky top-0 z-50 py-3 px-4 sm:px-6 lg:px-8", className ?? "bg-background"].join(" ")}>
      {/* Rounded pill container */}
      <div className="max-w-7xl mx-auto bg-background border border-border rounded-full px-4 sm:px-6 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 rounded">
            <img src={logo} alt="Welcome" className="h-6 sm:h-8" />
          </Link>

          {/* Navigation Links - Desktop */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => {
              const isActive = isActiveLink(link.href);
              const isExternal = link.href === "#";
              const linkClasses = `px-3 xl:px-4 py-2 text-sm font-medium transition-all duration-300 relative ${
                isActive
                  ? "text-foreground after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-coral after:rounded-full"
                  : "text-muted-foreground hover:text-coral"
              }`;
              return (
                <li key={link.label} className="flex items-center">
                  {isExternal ? (
                    <a href={link.href} className={linkClasses}>{link.label}</a>
                  ) : (
                    <Link to={link.href} className={linkClasses}>{link.label}</Link>
                  )}
                  {index < navLinks.length - 1 && <span className="text-border">|</span>}
                </li>
              );
            })}
          </ul>

          {/* Right Side Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex rounded-full border border-border h-9 w-9 transition-all duration-300 hover:border-coral hover:text-coral"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Cart Button */}
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full border border-border h-9 w-9 transition-all duration-300 hover:border-coral hover:text-coral"
              >
                <ShoppingCart className="h-4 w-4" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-coral text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-md"
                    >
                      {cartCount > 9 ? "9+" : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </Link>

            {/* Profile Icon (when logged in) or Login Button */}
            {isLoggedIn ? (
              <Link to="/profile">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full border border-border h-9 w-9 transition-all duration-300 hover:border-coral hover:text-coral p-0 overflow-hidden"
                  title={user?.name ?? "Profile"}
                >
                  <span className="h-full w-full rounded-full bg-coral flex items-center justify-center text-white text-[11px] font-bold">
                    {initials}
                  </span>
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button className="hidden sm:flex rounded-full bg-foreground text-background hover:bg-coral px-4 sm:px-6 text-sm transition-all duration-300">
                  Login
                </Button>
              </Link>
            )}

            {/* Wishlist Button */}
            <Link to="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex relative rounded-full border border-border h-9 w-9 transition-all duration-300 hover:border-coral hover:text-coral"
              >
                <Heart className="h-4 w-4" />
                <AnimatePresence>
                  {wishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-coral text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-md"
                    >
                      {wishlistCount > 9 ? "9+" : wishlistCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full border border-border h-9 w-9"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mt-3 mx-auto max-w-7xl bg-background border border-border rounded-3xl shadow-lg overflow-hidden"
          >
            {/* User info (mobile, when logged in) */}
            {isLoggedIn && (
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 pt-4 pb-2 flex items-center gap-3 border-b border-border hover:bg-secondary/50 transition-colors"
              >
                <span className="h-8 w-8 rounded-full bg-coral flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {initials}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.phone}</p>
                </div>
              </Link>
            )}

            <ul className="py-4 px-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                const isExternal = link.href === "#";
                const linkClasses = `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "text-foreground bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`;
                return (
                  <li key={link.label}>
                    {isExternal ? (
                      <a href={link.href} className={linkClasses} onClick={() => setIsMenuOpen(false)}>{link.label}</a>
                    ) : (
                      <Link to={link.href} className={linkClasses} onClick={() => setIsMenuOpen(false)}>{link.label}</Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="px-4 pb-4 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden rounded-full border border-border h-9 w-9"
                onClick={() => { setIsSearchOpen(true); setIsMenuOpen(false); }}
              >
                <Search className="h-4 w-4" />
              </Button>
              <Link to="/wishlist" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="sm:hidden relative rounded-full border border-border h-9 w-9"
                >
                  <Heart className="h-4 w-4" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-coral text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center">
                      {wishlistCount > 9 ? "9+" : wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>
              <span className="sm:hidden">
                {wishlistCount > 0 && <WishlistShareDialog />}
              </span>

              {isLoggedIn ? (
                <Button
                  className="sm:hidden flex-1 w-full rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 text-sm"
                  variant="ghost"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </Button>
              ) : (
                <Link to="/login" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                  <Button className="sm:hidden w-full rounded-full bg-foreground text-background hover:bg-foreground/90 text-sm">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
};

export default Navbar;
