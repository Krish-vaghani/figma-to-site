import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBackground from "@/assets/hero-background.png";
import heroProduct from "@/assets/hero-product.jpg";
import avatar from "@/assets/avatar.jpg";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 0.8]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-[600px] lg:min-h-[700px]">
      {/* Background Pattern - Full image with parallax */}
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
          y: backgroundY,
          scale: backgroundScale,
        }}
      />

      {/* Subtle gradient overlay for better text readability */}
      <motion.div 
        className="absolute inset-0 z-[1] bg-gradient-to-r from-background/50 via-background/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ opacity: overlayOpacity }}
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
                <Button className="bg-foreground text-background hover:bg-coral rounded-full px-8 sm:px-10 py-6 sm:py-7 text-base font-medium gap-3 group w-full sm:w-auto transition-all duration-300 shadow-xl hover:shadow-2xl">
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
                  className="rounded-full px-8 sm:px-10 py-6 sm:py-7 text-base font-medium gap-3 group border-2 border-foreground/20 hover:border-coral hover:bg-coral hover:text-background w-full sm:w-auto transition-all duration-300 backdrop-blur-sm"
                >
                  Explore More
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust indicators - Enhanced */}
            <motion.div 
              className="flex flex-wrap items-center gap-6 pt-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
            >
              {/* Happy Customers */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      className="w-9 h-9 rounded-full bg-muted border-2 border-background overflow-hidden shadow-md"
                      initial={{ opacity: 0, scale: 0.5, x: -10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ delay: 0.9 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                    >
                      <img src={avatar} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </motion.div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-foreground font-semibold text-sm">2,500+</span>
                  <span className="text-muted-foreground text-xs">Happy Customers</span>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-10 bg-border" />

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1 + i * 0.05, duration: 0.3, type: "spring" }}
                    >
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-foreground font-semibold text-sm">4.9/5</span>
                  <span className="text-muted-foreground text-xs">Based on 1.2k reviews</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Product Image */}
          <motion.div 
            className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Decorative elements */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] rounded-full bg-gradient-to-br from-coral/15 via-coral/5 to-transparent blur-3xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            />

            {/* Floating decorative ring */}
            <motion.div
              className="absolute top-8 right-8 w-20 h-20 rounded-full border-2 border-coral/20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            />
            <motion.div
              className="absolute bottom-16 left-4 w-12 h-12 rounded-full border-2 border-foreground/10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            />

            {/* Floating dots decoration */}
            <motion.div
              className="absolute top-20 left-8 flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-coral/40"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ 
                    delay: 1.4 + i * 0.15, 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              ))}
            </motion.div>

            {/* Main Product Image with premium frame */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Outer glow frame */}
              <div className="absolute -inset-1 bg-gradient-to-br from-coral/30 via-transparent to-coral/20 rounded-[2rem] blur-sm" />
              
              {/* Image container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group bg-gradient-to-br from-coral/5 to-transparent p-1">
                <div className="rounded-[1.4rem] overflow-hidden">
                  <motion.img
                    src={heroProduct}
                    alt="Elegant silver clutch purse"
                    className="w-full h-[380px] sm:h-[480px] md:h-[520px] lg:h-[560px] xl:h-[600px] object-cover"
                    loading="eager"
                    decoding="async"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                  />
                  
                  {/* Premium overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Corner accent */}
                  <motion.div 
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Bestseller</span>
                  </motion.div>
                </div>
              </div>

              {/* Bottom floating badge */}
              <motion.div 
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-foreground text-background px-6 py-3 rounded-full shadow-xl flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <span className="text-sm font-medium">Starting at</span>
                <span className="text-lg font-bold">$89</span>
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
