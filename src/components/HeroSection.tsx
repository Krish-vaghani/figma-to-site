import { ArrowRight, Sparkles, Star, Award, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroProduct from "@/assets/hero-product.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large decorative circles */}
        <motion.div 
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-coral/10 to-transparent blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-coral/8 to-transparent blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <motion.div 
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-coral/10 text-coral px-5 py-2.5 rounded-full text-sm font-medium border border-coral/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="h-4 w-4" />
              </motion.div>
              <span>New Collection 2024</span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.p 
                className="text-lg sm:text-xl font-light italic text-foreground/60 tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Elevate Your Everyday Style
              </motion.p>
              
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                Discover Your
                <span className="block mt-2">
                  Perfect{" "}
                  <span className="text-coral relative inline-block">
                    Elegance
                    <motion.svg 
                      className="absolute -bottom-2 left-0 w-full h-3" 
                      viewBox="0 0 200 12" 
                      fill="none"
                    >
                      <motion.path 
                        d="M2 8C50 2 150 2 198 8" 
                        stroke="hsl(var(--coral))" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        className="opacity-50"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 1.2, duration: 0.8, ease: "easeInOut" }}
                      />
                    </motion.svg>
                  </span>
                </span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p 
              className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Thoughtfully crafted purses that blend timeless design with modern elegance — perfect for every occasion.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-foreground text-background hover:bg-coral rounded-full px-10 py-7 text-base font-medium gap-3 group w-full sm:w-auto transition-all duration-300 shadow-xl hover:shadow-2xl">
                  Shop Collection
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="rounded-full px-10 py-7 text-base font-medium gap-3 group border-2 border-foreground/20 hover:border-coral hover:bg-coral hover:text-background w-full sm:w-auto transition-all duration-300"
                >
                  View Lookbook
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats Row */}
            <motion.div 
              className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-8 border-t border-border/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="text-center lg:text-left">
                <motion.p 
                  className="text-3xl sm:text-4xl font-bold text-foreground"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.4, type: "spring" }}
                >
                  15K+
                </motion.p>
                <p className="text-muted-foreground text-sm mt-1">Happy Customers</p>
              </div>
              <div className="w-px h-12 bg-border hidden sm:block" />
              <div className="text-center lg:text-left">
                <motion.p 
                  className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-1 justify-center lg:justify-start"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1, duration: 0.4, type: "spring" }}
                >
                  4.9
                  <Star className="h-6 w-6 fill-coral text-coral" />
                </motion.p>
                <p className="text-muted-foreground text-sm mt-1">Average Rating</p>
              </div>
              <div className="w-px h-12 bg-border hidden sm:block" />
              <div className="text-center lg:text-left">
                <motion.p 
                  className="text-3xl sm:text-4xl font-bold text-foreground"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.4, type: "spring" }}
                >
                  200+
                </motion.p>
                <p className="text-muted-foreground text-sm mt-1">Unique Designs</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image (Hidden on mobile) */}
          <motion.div 
            className="relative hidden lg:flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {/* Decorative frame */}
            <motion.div 
              className="absolute -inset-4 bg-gradient-to-br from-coral/20 via-coral/5 to-transparent rounded-[3rem] blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
            
            {/* Main image container */}
            <div className="relative">
              {/* Floating decorative elements */}
              <motion.div 
                className="absolute -top-6 -left-6 w-24 h-24 border-2 border-coral/30 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              />
              <motion.div 
                className="absolute -bottom-4 -right-4 w-16 h-16 border-2 border-foreground/10 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              />
              
              {/* Image */}
              <motion.div 
                className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-gradient-to-br from-coral/10 to-transparent p-1"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <div className="rounded-[1.8rem] overflow-hidden">
                  <motion.img
                    src={heroProduct}
                    alt="Elegant luxury purse"
                    className="w-full h-[500px] xl:h-[580px] object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Price tag */}
              <motion.div 
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-full px-8 py-4 flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Starting from</p>
                  <p className="text-2xl font-bold text-foreground">$89</p>
                </div>
                <motion.button 
                  className="bg-foreground text-background p-3 rounded-full hover:bg-coral transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom trust bar */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 bg-foreground/5 backdrop-blur-sm border-t border-border/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-coral" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-coral" />
              <span>2 Year Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-coral" />
              <span>Premium Quality</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
