import { ArrowRight, Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import ScrollReveal from "./ScrollReveal";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Thank you for subscribing!");
    setEmail("");
    setIsSubmitting(false);
  };

  const footerLinks = {
    shop: [
      { name: "New Arrivals", href: "#" },
      { name: "Best Sellers", href: "#" },
      { name: "Tote Bags", href: "#" },
      { name: "Clutches", href: "#" },
      { name: "Crossbody Bags", href: "#" },
      { name: "Sale", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Our Story", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Blog", href: "#" },
    ],
    support: [
      { name: "Contact Us", href: "#" },
      { name: "FAQs", href: "#" },
      { name: "Shipping & Returns", href: "#" },
      { name: "Size Guide", href: "#" },
      { name: "Track Order", href: "#" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Youtube", icon: Youtube, href: "#" },
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 sm:py-16">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left max-w-xl">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
                  Join Our <span className="text-coral">Community</span>
                </h3>
                <p className="text-background/70 text-base sm:text-lg">
                  Subscribe to get exclusive offers, early access to new arrivals, and styling tips.
                </p>
              </div>
              
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:min-w-[320px]">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 pr-4 py-6 rounded-full bg-background text-foreground border-0 w-full"
                    maxLength={255}
                  />
                </div>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-coral hover:bg-coral/90 text-white rounded-full px-8 py-6 font-medium gap-2 group transition-all duration-300 hover:scale-[1.02] shadow-lg"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <ScrollReveal variant="fadeUp" delay={0.1} className="lg:col-span-2">
            <div className="space-y-6">
              <img src={logo} alt="Purse Brand Logo" className="h-10 sm:h-12 brightness-0 invert" />
              <p className="text-background/70 text-base leading-relaxed max-w-sm">
                Crafting timeless elegance since 2015. Every purse tells a story of quality craftsmanship and contemporary design.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 pt-2">
                <a href="tel:+1234567890" className="flex items-center gap-3 text-background/70 hover:text-coral transition-colors group">
                  <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>+1 (234) 567-890</span>
                </a>
                <a href="mailto:hello@purse.com" className="flex items-center gap-3 text-background/70 hover:text-coral transition-colors group">
                  <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>hello@purse.com</span>
                </a>
                <div className="flex items-start gap-3 text-background/70">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>123 Fashion Street, New York, NY 10001</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="w-10 h-10 rounded-full bg-background/10 hover:bg-coral flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  >
                    <social.icon className="h-5 w-5 text-background group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Shop Links */}
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div>
              <h4 className="text-lg font-semibold mb-5">Shop</h4>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-background/70 hover:text-coral transition-colors inline-block hover:translate-x-1 transform duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Company Links */}
          <ScrollReveal variant="fadeUp" delay={0.3}>
            <div>
              <h4 className="text-lg font-semibold mb-5">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-background/70 hover:text-coral transition-colors inline-block hover:translate-x-1 transform duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Support Links */}
          <ScrollReveal variant="fadeUp" delay={0.4}>
            <div>
              <h4 className="text-lg font-semibold mb-5">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-background/70 hover:text-coral transition-colors inline-block hover:translate-x-1 transform duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-background/60">
            <p>© 2024 Purse. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="hover:text-coral transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-coral transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-coral transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
