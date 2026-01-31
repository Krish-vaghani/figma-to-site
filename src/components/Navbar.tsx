import { useState } from "react";
import { Search, ShoppingCart, Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", href: "#", active: true },
  { label: "Purses", href: "#" },
  { label: "Jewellery", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Sale", href: "#" },
  { label: "Contact Us", href: "#" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Welcome" className="h-6 sm:h-8" />
        </div>

        {/* Navigation Links - Desktop */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, index) => (
            <li key={link.label} className="flex items-center">
              <a
                href={link.href}
                className={`px-3 xl:px-4 py-2 text-sm font-medium transition-all duration-300 relative ${
                  link.active
                    ? "text-foreground after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-foreground after:rounded-full"
                    : "text-muted-foreground hover:text-coral hover:scale-105"
                }`}
              >
                {link.label}
              </a>
              {index < navLinks.length - 1 && (
                <span className="text-border">|</span>
              )}
            </li>
          ))}
        </ul>

        {/* Right Side Icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full border border-border h-9 w-9 transition-all duration-300 hover:border-coral hover:text-coral hover:scale-110">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full border border-border h-9 w-9 transition-all duration-300 hover:border-coral hover:text-coral hover:scale-110">
            <ShoppingCart className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full border border-border h-9 w-9 transition-all duration-300 hover:border-coral hover:text-coral hover:scale-110">
            <Heart className="h-4 w-4" />
          </Button>
          <Button className="hidden sm:flex ml-2 rounded-full bg-foreground text-background hover:bg-coral hover:scale-105 px-4 sm:px-6 text-sm transition-all duration-300">
            Sign In
          </Button>
          
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <ul className="py-4 px-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    link.active
                      ? "text-foreground bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="px-4 pb-4 flex gap-2">
            <Button variant="ghost" size="icon" className="sm:hidden rounded-full border border-border h-9 w-9">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="sm:hidden rounded-full border border-border h-9 w-9">
              <Heart className="h-4 w-4" />
            </Button>
            <Button className="sm:hidden flex-1 rounded-full bg-foreground text-background hover:bg-foreground/90 text-sm">
              Sign In
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
