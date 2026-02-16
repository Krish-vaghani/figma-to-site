import { useState } from "react";
import { Search, ShoppingCart, Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import SearchModal from "./SearchModal";
import WishlistShareDialog from "./WishlistShareDialog";
import { logo } from "@/lib/assetUrls";

type NavbarProps = {
  className?: string;
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/purses" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "#" },
];

const Navbar = ({ className }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { wishlistCount } = useWishlist();
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();

  const isActiveLink = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <nav className={["sticky top-0 z-50 py-3 px-4 sm:px-6 lg:px-8", className ?? "bg-background"].join(" ")}>
      {/* Rounded pill container */}
      <div className="max-w-7xl mx-auto bg-background border border-border rounded-full px-4 sm:px-6 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Logo - click to home */}
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
                    <a href={link.href} className={linkClasses}>
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.href} className={linkClasses}>
                      {link.label}
                    </Link>
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
            {/* Cart Button with Badge */}
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

            {/* Wishlist Button with Badge */}
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

            {/* Share Wishlist - desktop only */}
            <span className="hidden sm:inline-flex">
              {wishlistCount > 0 && <WishlistShareDialog />}
            </span>

            <Link to="/login">
              <Button className="hidden sm:flex ml-2 rounded-full bg-foreground text-background hover:bg-coral px-4 sm:px-6 text-sm transition-all duration-300">
                Login
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
                      <a href={link.href} className={linkClasses} onClick={() => setIsMenuOpen(false)}>
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.href} className={linkClasses} onClick={() => setIsMenuOpen(false)}>
                        {link.label}
                      </Link>
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
                onClick={() => {
                  setIsSearchOpen(true);
                  setIsMenuOpen(false);
                }}
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
              {/* Share Wishlist - mobile */}
              <span className="sm:hidden">
                {wishlistCount > 0 && <WishlistShareDialog />}
              </span>
              <Link to="/login" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                <Button className="sm:hidden w-full rounded-full bg-foreground text-background hover:bg-foreground/90 text-sm">
                  Login
                </Button>
              </Link>
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
