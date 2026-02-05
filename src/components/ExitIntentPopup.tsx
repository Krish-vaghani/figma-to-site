import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [hasShown, setHasShown] = useState(false);

  // Lock body scroll when popup is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isVisible]);

  useEffect(() => {
    // Check if popup was already shown in this session
    const alreadyShown = sessionStorage.getItem("exitPopupShown");
    if (alreadyShown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Detect when mouse leaves at the top of the viewport
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem("exitPopupShown", "true");
      }
    };

    // Also show on mobile when user scrolls up quickly (indicating intent to leave)
    let lastScrollY = window.scrollY;
    let scrollUpCount = 0;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY && currentScrollY < 100) {
        scrollUpCount++;
        if (scrollUpCount > 3 && !hasShown) {
          setIsVisible(true);
          setHasShown(true);
          sessionStorage.setItem("exitPopupShown", "true");
        }
      } else {
        scrollUpCount = 0;
      }
      lastScrollY = currentScrollY;
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Welcome! Your 15% discount code: SAVE15", {
        description: "Check your email for more exclusive offers!",
        duration: 5000,
      });
      setIsVisible(false);
      setEmail("");
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-[100]"
            onClick={() => setIsVisible(false)}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 overflow-hidden"
            onClick={() => setIsVisible(false)}
          >
            <div 
              className="w-full max-w-md max-h-[90vh] bg-background rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl relative flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors z-10"
                aria-label="Close popup"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </button>

              {/* Decorative Header */}
              <div className="bg-gradient-to-br from-coral via-coral/80 to-coral/60 p-5 sm:p-8 text-center">
                <motion.div
                  initial={{ rotate: -10 }}
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="inline-flex items-center justify-center w-12 h-12 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full mb-3 sm:mb-4"
                >
                  <Gift className="h-6 w-6 sm:h-10 sm:w-10 text-white" />
                </motion.div>
                <h3 className="text-xl sm:text-3xl font-bold text-white font-serif">
                  Wait! Don't Leave Yet
                </h3>
                <p className="text-white/90 mt-1 sm:mt-2 text-xs sm:text-base">
                  We have a special offer just for you
                </p>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-8">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="inline-flex items-center gap-2 bg-secondary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4">
                    <span className="text-3xl sm:text-5xl font-bold text-coral">15%</span>
                    <span className="text-foreground font-medium text-sm sm:text-base">OFF</span>
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-base">
                    Subscribe to our newsletter and get an exclusive discount on your first order!
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 sm:pl-12 h-10 sm:h-12 text-sm sm:text-base rounded-full border-border focus:border-coral"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-10 sm:h-12 rounded-full bg-foreground text-background hover:bg-coral transition-colors font-medium text-sm sm:text-base"
                  >
                    Get My Discount
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                  </Button>
                </form>

                <p className="text-center text-muted-foreground text-[10px] sm:text-xs mt-3 sm:mt-4">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
