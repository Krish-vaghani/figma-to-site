import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Star, Crown, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Star,
    title: "Earn Points",
    description: "Get 1 point for every ₹100 spent on all purchases",
  },
  {
    icon: Gift,
    title: "Redeem Rewards",
    description: "Use points for discounts, free shipping & exclusive items",
  },
  {
    icon: Crown,
    title: "Exclusive Access",
    description: "Early access to new collections & members-only sales",
  },
];

const LoyaltyBanner = () => {
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem("loyaltyBannerDismissed") === "true";
  });

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("loyaltyBannerDismissed", "true");
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto relative rounded-3xl overflow-hidden bg-foreground text-background p-8 sm:p-12"
      >
        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-background/10 hover:bg-background/20 transition-colors"
          aria-label="Dismiss loyalty banner"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-coral text-sm font-semibold tracking-widest uppercase mb-3"
          >
            Rewards Program
          </motion.p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
            Earn Points on Every Purchase
          </h2>
          <p className="text-background/70 max-w-lg mx-auto text-sm sm:text-base">
            Join our loyalty program and start earning rewards with every order you place.
          </p>
        </div>

        {/* Benefit cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-coral/20 flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="h-5 w-5 text-coral" />
              </div>
              <h3 className="font-semibold text-lg mb-2 font-sans">{benefit.title}</h3>
              <p className="text-background/60 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button className="rounded-full bg-coral hover:bg-coral/90 text-white px-8 py-3 text-sm font-semibold">
            Join Now — It's Free
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default LoyaltyBanner;
