import { ArrowRight, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import ScrollReveal from "./ScrollReveal";
import footerBackground from "@/assets/footer-background.png";

const Footer = () => {
  const exploreLinks = [
    { name: "Home", href: "/" },
    { name: "Purses", href: "/purses" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "#contact" },
  ];

  const categoryLinks = [
    { name: "Handbags", href: "#" },
    { name: "Tote Bags", href: "#" },
    { name: "Sling Bags", href: "#" },
    { name: "Clutches", href: "#" },
    { name: "Wallets", href: "#" },
    { name: "Gift Sets", href: "#" },
  ];

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "YouTube", icon: Youtube, href: "#" },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${footerBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orb */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-64 h-64 bg-coral/5 rounded-full blur-3xl" />

        {/* Decorative dots */}
        <div className="hidden lg:block">
          <div className="absolute top-32 left-[12%] w-2 h-2 bg-coral/40 rounded-full" />
          <div className="absolute top-64 left-[6%] w-1.5 h-1.5 bg-coral/30 rounded-full" />
          <div className="absolute top-48 right-[10%] w-2 h-2 bg-coral/40 rounded-full" />
          <div className="absolute top-[70%] right-[4%] w-1.5 h-1.5 bg-coral/30 rounded-full" />
        </div>
      </div>

      {/* Hero CTA Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-16 sm:pt-20 lg:pt-28 pb-12 sm:pb-16 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              Crafted With{" "}
              <span className="text-coral relative">
                Elegance & Care
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6C50 2 150 2 198 6" stroke="hsl(var(--coral))" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.4" />
                </svg>
              </span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-8 leading-relaxed max-w-xl mx-auto">
              Thoughtfully designed purses that blend style, quality, and everyday comfort — crafted to elevate your look with confidence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="outline"
                className="rounded-full px-8 py-6 border-2 border-foreground/20 hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-medium text-sm group"
              >
                Subscribe & Save
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">✨</span>
              </Button>
              <Button className="rounded-full px-8 py-6 bg-foreground text-background hover:bg-coral hover:scale-105 transition-all duration-300 font-medium text-sm gap-2 group shadow-lg hover:shadow-xl">
                Shop Collection
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Divider with gradient */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">

          {/* Explore Column */}
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
                Explore
              </h4>
              <ul className="space-y-3">
                {exploreLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-coral transition-all duration-300" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Collections Column */}
          <ScrollReveal variant="fadeUp" delay={0.15}>
            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
                Collections
              </h4>
              <ul className="space-y-3">
                {categoryLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-coral transition-all duration-300" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Contact Column */}
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
                Get In Touch
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:support@yourbrand.com"
                    className="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-coral/20 to-coral/5 flex items-center justify-center flex-shrink-0 group-hover:from-coral/30 group-hover:to-coral/10 transition-all">
                      <Mail className="h-4 w-4 text-coral" />
                    </div>
                    <div className="pt-1">
                      <span className="text-sm block leading-tight">support@yourbrand.com</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+919876543210"
                    className="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-coral/20 to-coral/5 flex items-center justify-center flex-shrink-0 group-hover:from-coral/30 group-hover:to-coral/10 transition-all">
                      <Phone className="h-4 w-4 text-coral" />
                    </div>
                    <div className="pt-1">
                      <span className="text-sm block leading-tight">+91 98765 43210</span>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-coral/20 to-coral/5 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-coral" />
                    </div>
                    <div className="pt-1">
                      <span className="text-sm block leading-tight">Mumbai, India 🇮🇳</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Newsletter Column */}
          <ScrollReveal variant="fadeUp" delay={0.25}>
            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
                Newsletter
              </h4>
              <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                Get exclusive offers, new arrivals & styling tips delivered to your inbox.
              </p>

              {/* Newsletter Input */}
              <div className="relative mb-6">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-foreground/[0.03] border border-border/50 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-coral/50 focus:bg-foreground/[0.05] transition-all"
                />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-coral hover:bg-coral/90 flex items-center justify-center transition-colors group">
                  <Send className="h-4 w-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-foreground/[0.03] border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-coral/40 hover:bg-coral/5 transition-all duration-300"
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/30 bg-foreground/[0.015] backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            {/* Left Side - Logo & Trust */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <img src={logo} alt="Welcome" className="h-9" />

              <div className="hidden sm:block h-8 w-px bg-border/40" />

              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Secure Payments
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Easy Returns
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral" />
                  Premium Quality
                </span>
              </div>
            </div>

            {/* Right Side - Copyright & Links */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-muted-foreground">
              <span>© 2026 Your Brand. All rights reserved.</span>
              <div className="hidden sm:block h-4 w-px bg-border/40" />
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                <a href="#" className="hover:text-foreground transition-colors">Refunds</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
