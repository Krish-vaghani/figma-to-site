import { ArrowRight, Mail, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { logo, footerBackground } from "@/lib/assetUrls";
import ScrollReveal from "./ScrollReveal";

const footerNavLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/purses" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "#" },
];

const Footer = () => {
  const location = useLocation();

  const isActiveLink = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href === "#") return false;
    return location.pathname.startsWith(href);
  };

  const exploreLinks = footerNavLinks;

  const categoryLinks = [
    { name: "Handbags", href: "#" },
    { name: "Tote Bags", href: "#" },
    { name: "Wallets", href: "#" },
    { name: "Sling Bags", href: "#" },
    { name: "Clutches", href: "#" },
    { name: "Gift Sets", href: "#" },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundImage: `url(${footerBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Decorative Dots - Hidden on mobile for cleaner look */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        <div className="absolute top-1/4 left-[15%] w-2 h-2 bg-coral rounded-full" />
        <div className="absolute top-[60%] left-[8%] w-2 h-2 bg-coral rounded-full" />
        <div className="absolute top-1/3 right-[15%] w-2 h-2 bg-coral rounded-full" />
        <div className="absolute top-[65%] right-[5%] w-2 h-2 bg-coral rounded-full" />
        {/* Decorative lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" y1="30%" x2="25%" y2="50%" stroke="hsl(var(--coral))" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="75%" y1="25%" x2="90%" y2="45%" stroke="hsl(var(--coral))" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="85%" y1="55%" x2="95%" y2="70%" stroke="hsl(var(--coral))" strokeWidth="1" strokeOpacity="0.3" />
        </svg>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-12 sm:pt-16 lg:pt-24 pb-10 sm:pb-12 lg:pb-16 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-3 sm:mb-4">
              Crafted With <span className="text-coral">Elegance & Care</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed">
              Thoughtfully Designed Purses That Blend Style, Quality, And Everyday Comfort —Crafted To Elevate Your Look
              With Confidence.
            </p>

            {/* CTA Buttons - Subscribe & Save / Join Our List commented out, not in use */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {/* Subscribe & Save / Join Our List - not in use for now
              <Button
                variant="outline"
                className="w-full sm:w-auto rounded-full px-5 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300 font-medium text-xs sm:text-sm lg:text-base"
              >
                Subscribe & Save / Join Our List
              </Button>
              */}
              <Button asChild className="w-full sm:w-auto rounded-full px-5 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 bg-foreground text-background hover:bg-coral transition-all duration-300 font-medium text-xs sm:text-sm lg:text-base gap-2 group">
                <Link to="/purses" className="inline-flex items-center gap-2">
                  Shop Now
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Links Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-8 sm:pb-10 lg:pb-12 relative z-10">
        <div className="grid grid-cols-1 gap-8 sm:gap-6 lg:grid-cols-3 lg:gap-12">
          {/* Explore Column */}
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div>
              <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground mb-3 sm:mb-4 lg:mb-6">
                Explore
              </h4>
              <div className="grid grid-cols-3 gap-x-3 sm:gap-x-4 gap-y-2 sm:gap-y-3">
                {exploreLinks.map((link) => {
                  const isActive = isActiveLink(link.href);
                  const linkClass = `transition-colors text-xs sm:text-sm lg:text-base ${
                    isActive ? "text-coral font-medium" : "text-muted-foreground hover:text-coral"
                  }`;
                  return link.href === "#" ? (
                    <a key={link.name} href={link.href} className={linkClass}>
                      {link.name}
                    </a>
                  ) : (
                    <Link key={link.name} to={link.href} className={linkClass}>
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Categories Column */}
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div>
              <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground mb-3 sm:mb-4 lg:mb-6">
                Categories / Collections
              </h4>
              <div className="grid grid-cols-3 gap-x-3 sm:gap-x-4 gap-y-2 sm:gap-y-3">
                {categoryLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-muted-foreground hover:text-coral transition-colors text-xs sm:text-sm lg:text-base"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Card */}
          <ScrollReveal variant="fadeUp" delay={0.3}>
            <div className="relative overflow-hidden bg-background rounded-2xl p-4 sm:p-5 lg:p-4 lg:py-5 shadow-lg">
              {/* Animated border - single line */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div
                  className="absolute -inset-[100%] contact-border-spin"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, hsl(var(--coral)) 30deg, hsl(var(--coral)) 60deg, transparent 90deg)",
                  }}
                />
                <div className="absolute inset-[2px] bg-background rounded-[14px]" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 sm:mb-3 lg:mb-2">
                  <span className="text-lg sm:text-xl">🇮🇳</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">India</span>
                </div>
                <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground mb-3 sm:mb-4 lg:mb-3">
                  Contact Us
                </h4>
                {/* Stacked layout: Email on top, Phone below */}
                <div className="flex flex-col gap-3 lg:gap-2">
                  <a
                    href="mailto:Support@Yourbrand.Com"
                    className="flex items-center gap-2 text-muted-foreground hover:text-coral transition-colors text-xs sm:text-sm"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-coral" />
                    </div>
                    <span className="break-all">Support@Yourbrand.Com</span>
                  </a>
                  <a
                    href="tel:+919XXXXXXXXX"
                    className="flex items-center gap-2 text-muted-foreground hover:text-coral transition-colors text-xs sm:text-sm"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-coral" />
                    </div>
                    <span>+91 9XXXXXXXXX</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50 bg-background/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4 sm:py-5 lg:py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Logo & Compliance */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:gap-6">
              <Link to="/" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 rounded">
                <img src={logo} alt="Welcome Logo" className="h-7 sm:h-8 lg:h-10" />
              </Link>
              <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] sm:text-xs lg:text-sm text-muted-foreground">
                <span className="font-medium">Privacy & Compliance :</span>
                <span>Secure Payments</span>
                <span>•</span>
                <span>Easy Returns</span>
                <span>•</span>
                <span>Customer-First Support</span>
              </div>
            </div>

            {/* Copyright & Legal Links */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 lg:gap-6 text-[10px] sm:text-xs lg:text-sm text-muted-foreground">
              <span>© 2026 Your Brand Name. All Rights Reserved.</span>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <a href="#" className="hover:text-coral transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-coral transition-colors">
                  Terms & Conditions
                </a>
                <a href="#" className="hover:text-coral transition-colors">
                  Return Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;