import { Search, ShoppingCart, Heart } from "lucide-react";
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
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-border">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Welcome" className="h-8" />
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center gap-1">
        {navLinks.map((link, index) => (
          <li key={link.label} className="flex items-center">
            <a
              href={link.href}
              className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                link.active
                  ? "text-foreground after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-foreground after:rounded-full"
                  : "text-muted-foreground hover:text-foreground"
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
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full border border-border">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full border border-border">
          <ShoppingCart className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full border border-border">
          <Heart className="h-4 w-4" />
        </Button>
        <Button className="ml-2 rounded-full bg-foreground text-background hover:bg-foreground/90 px-6">
          Sign In
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
