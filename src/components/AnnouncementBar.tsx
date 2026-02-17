import { useState, useEffect } from "react";
import { X, Truck, Percent, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const promos = [
  {
    id: 1,
    text: "Free Shipping on Orders Over ₹500",
    icon: Truck,
    highlight: "₹500",
  },
  {
    id: 2,
    text: "20% Off Your First Order - Use Code: WELCOME20",
    icon: Percent,
    highlight: "WELCOME20",
  },
  {
    id: 3,
    text: "Free Gift Wrapping on All Orders",
    icon: Gift,
    highlight: "Free Gift",
  },
];

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentPromo, setCurrentPromo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const promo = promos[currentPromo];
  const Icon = promo.icon;

  return (
    <div className="bg-foreground text-background relative z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-center py-2.5 sm:py-3 relative">
          {/* Promo Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium"
            >
              <Icon className="h-4 w-4 text-coral flex-shrink-0" />
              <span className="text-center">
                {promo.text.split(promo.highlight).map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="text-coral font-semibold">{promo.highlight}</span>
                    )}
                  </span>
                ))}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-0 sm:right-2 p-1.5 hover:bg-background/10 rounded-full transition-colors duration-200"
            aria-label="Close announcement"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Progress Dots */}
          <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-1">
            {promos.map((_, i) => (
              <span
                key={i}
                className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  i === currentPromo ? "bg-coral w-3" : "bg-background/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
