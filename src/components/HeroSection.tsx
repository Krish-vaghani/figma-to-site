import { ArrowRight, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroBackground from "@/assets/hero-background.png";
import heroProduct from "@/assets/hero-product.jpg";
import avatar from "@/assets/avatar.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden min-h-[600px] lg:min-h-[700px]">
      {/* Background Pattern - Full image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "auto 100%",
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Subtle gradient overlay for better text readability */}
      <motion.div 
        className="absolute inset-0 z-[1] bg-gradient-to-r from-background/40 via-transparent to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <motion.div 
            className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-coral/10 text-coral px-4 py-2 rounded-full text-sm font-medium border border-coral/20"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="h-4 w-4" />
              </motion.div>
              <span>New Collection 2024</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h2 
                className="text-lg sm:text-xl md:text-2xl font-light italic text-foreground/70 tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              >
                Elevate Your Everyday Style
              </motion.h2>
              
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-foreground leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
              >
                Discover Your{" "}
                <span className="block mt-2">
                  Perfect{" "}
                  <span className="text-coral relative inline-block">
                    Elegance
                    <motion.svg 
                      className="absolute -bottom-2 left-0 w-full" 
                      viewBox="0 0 200 12" 
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.8, ease: "easeInOut" }}
                    >
                      <motion.path 
                        d="M2 8C50 2 150 2 198 8" 
                        stroke="hsl(var(--coral))" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        className="opacity-60"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 1.2, duration: 0.8, ease: "easeInOut" }}
                      />
                    </motion.svg>
                  </span>
                </span>
              </motion.h1>
            </div>

            <motion.p 
              className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            >
              Discover thoughtfully crafted purses that blend timeless design with
              modern elegance — perfect for work, casual days, and special moments.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 sm:px-10 py-6 sm:py-7 text-base font-medium gap-3 group w-full sm:w-auto transition-all duration-300 shadow-xl hover:shadow-2xl">
                  Shop Collection
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="rounded-full px-8 sm:px-10 py-6 sm:py-7 text-base font-medium gap-3 group border-2 border-foreground/20 hover:border-foreground hover:bg-foreground hover:text-background w-full sm:w-auto transition-all duration-300 backdrop-blur-sm"
                >
                  Explore More
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              className="flex items-center gap-6 pt-4 justify-center lg:justify-start text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      className="w-8 h-8 rounded-full bg-muted border-2 border-background overflow-hidden"
                      initial={{ opacity: 0, scale: 0.5, x: -10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ delay: 0.9 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                    >
                      <img src={avatar} alt="" className="w-full h-full object-cover" />
                    </motion.div>
                  ))}
                </div>
                <motion.span 
                  className="font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3, duration: 0.4 }}
                >
                  2,500+ Happy Customers
                </motion.span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Product Image with Floating Cards */}
          <motion.div 
            className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Decorative circle behind image */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full bg-gradient-to-br from-coral/10 to-coral/5 blur-3xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            />

            {/* Floating Card - Top */}
            <motion.div 
              className="absolute top-4 sm:top-8 left-0 sm:left-4 lg:-left-4 xl:left-0 z-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 max-w-[220px] sm:max-w-[260px] transition-shadow duration-500 cursor-pointer border border-white/50 group"
              initial={{ opacity: 0, y: -30, x: -30, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                y: [0, -8, 0], 
                x: 0, 
                scale: 1,
              }}
              transition={{ 
                delay: 0.8, 
                duration: 0.6, 
                ease: "easeOut",
                y: { delay: 1.4, duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.02, y: -12 }}
            >
              <div className="relative">
                <img
                  src={avatar}
                  alt="Customer"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-coral/30 ring-offset-2"
                />
                <motion.div 
                  className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.3, type: "spring", stiffness: 500 }}
                >
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm sm:text-base group-hover:text-coral transition-colors">
                  Premium Quality
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm">Handcrafted Excellence</p>
              </div>
            </motion.div>

            {/* Main Product Image */}
            <motion.div 
              className="relative rounded-3xl overflow-hidden ml-6 sm:ml-10 lg:ml-12 mt-16 sm:mt-20 shadow-2xl group"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.img
                src={heroProduct}
                alt="Elegant silver clutch purse"
                className="w-full h-[380px] sm:h-[480px] md:h-[520px] lg:h-[560px] xl:h-[600px] object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>

            {/* Floating Card - Bottom */}
            <motion.div 
              className="absolute bottom-6 sm:bottom-10 lg:bottom-16 -left-2 sm:left-0 lg:-left-8 z-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl p-5 sm:p-6 max-w-[200px] sm:max-w-[240px] transition-shadow duration-500 cursor-pointer border border-white/50 group"
              initial={{ opacity: 0, y: 30, x: -30, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                y: [0, 8, 0], 
                x: 0, 
                scale: 1,
              }}
              transition={{ 
                delay: 1, 
                duration: 0.6, 
                ease: "easeOut",
                y: { delay: 1.6, duration: 3.5, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.02, y: -12 }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-muted-foreground text-xs uppercase tracking-wider font-medium">
                  Featured
                </p>
                <motion.span 
                  className="bg-coral/10 text-coral text-xs px-2 py-0.5 rounded-full font-medium"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.3, type: "spring", stiffness: 400 }}
                >
                  New
                </motion.span>
              </div>
              <h3 className="font-semibold text-foreground text-lg sm:text-xl group-hover:text-coral transition-colors">
                Luxe Clutch
              </h3>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + i * 0.08, duration: 0.3, type: "spring" }}
                    >
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </div>
                <span className="text-muted-foreground text-sm">(250)</span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <motion.p 
                  className="text-2xl sm:text-3xl font-bold text-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.4 }}
                >
                  $125
                </motion.p>
                <motion.button 
                  className="bg-foreground text-background p-2.5 rounded-full hover:bg-coral transition-colors group/btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
