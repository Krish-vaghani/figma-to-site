import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/lib/toast";

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [hasShown, setHasShown] = useState(() => sessionStorage.getItem("exitPopupShown") === "true");

  const canShow = () => !hasShown;

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && canShow()) {
        setIsVisible(true);
      }
    };

    let lastScrollY = window.scrollY;
    let scrollUpCount = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY && currentScrollY < 100) {
        scrollUpCount++;
        if (scrollUpCount > 3 && canShow()) {
          setIsVisible(true);
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

  const handleClose = () => {
    setIsVisible(false);
    setHasShown(true);
    sessionStorage.setItem("exitPopupShown", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.discount.codeReceived("SAVE15");
      handleClose();
      setEmail("");
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop - click to dismiss */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-[2px] z-[100]"
            onClick={handleClose}
            aria-hidden
          />

          {/* Centered popup - flex wrapper for reliable viewport center on all screens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
            role="dialog"
            aria-labelledby="exit-popup-title"
            aria-describedby="exit-popup-desc"
          >
            <div
              className="pointer-events-auto w-full max-w-[420px] sm:max-w-[440px] md:max-w-[480px] flex flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Orange header section */}
              <div className="relative flex shrink-0 flex-col items-center bg-[#FF7B4F] px-4 pb-6 pt-8 sm:px-6 sm:pb-8 sm:pt-10">
                <button
                  onClick={handleClose}
                  className="absolute right-3 top-3 rounded-full p-2 text-white/90 transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 sm:right-4 sm:top-4"
                  aria-label="Close offer"
                >
                  <X className="h-5 w-5 sm:h-5 sm:w-5" />
                </button>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 sm:h-12 sm:w-12">
                  <Gift className="h-5 w-5 text-white sm:h-6 sm:w-6" aria-hidden />
                </div>
                <h2 id="exit-popup-title" className="mt-3 text-center text-lg font-bold text-white sm:text-xl">
                  Wait! Don&apos;t Leave Yet
                </h2>
                <p id="exit-popup-desc" className="mt-1 text-center text-sm text-white/95 sm:text-base">
                  We have a special offer just for you.
                </p>
              </div>

              {/* White content section - no scroll */}
              <div className="flex flex-col p-4 sm:p-6">
                <div className="flex items-baseline justify-center gap-1.5 pt-2 sm:gap-2 sm:pt-4">
                  <span className="text-4xl font-bold text-[#FF7B4F] sm:text-5xl">15%</span>
                  <span className="text-lg font-semibold text-foreground sm:text-xl">OFF</span>
                </div>
                <p className="mt-3 text-center text-sm text-muted-foreground sm:mt-4 sm:text-base">
                  Subscribe to our newsletter and get an exclusive discount on your first order!
                </p>
                <form onSubmit={handleSubmit} className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none sm:left-4 sm:h-[18px] sm:w-[18px]" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 rounded-xl border-border pl-9 text-sm focus-visible:ring-[#FF7B4F] sm:h-12 sm:pl-10 sm:text-base"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="h-11 w-full rounded-xl bg-foreground text-background hover:bg-[#FF7B4F] text-sm font-medium sm:h-12 sm:text-base"
                  >
                    Get My Discount
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                <p className="mt-3 text-center text-xs text-muted-foreground sm:mt-4">
                  No spam. Unsubscribe anytime.
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
