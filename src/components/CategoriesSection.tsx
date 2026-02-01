import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import categoryTote from "@/assets/category-tote.png";
import categorySling from "@/assets/category-sling.png";
import categoryClutches from "@/assets/category-clutches.png";
import categoryMini from "@/assets/category-mini.png";
import ScrollReveal from "./ScrollReveal";
import StaggerReveal from "./StaggerReveal";

interface Category {
  id: number;
  name: string;
  image: string;
  itemCount: number;
  gradient: string;
}

const categories: Category[] = [
  { id: 1, name: "Tote Bags", image: categoryTote, itemCount: 24, gradient: "from-amber-100 to-orange-50" },
  { id: 2, name: "Shoulder Bags", image: categoryTote, itemCount: 18, gradient: "from-rose-100 to-pink-50" },
  { id: 3, name: "Sling Bags", image: categorySling, itemCount: 32, gradient: "from-violet-100 to-purple-50" },
  { id: 4, name: "Clutches", image: categoryClutches, itemCount: 15, gradient: "from-emerald-100 to-teal-50" },
  { id: 5, name: "Mini Bags", image: categoryMini, itemCount: 28, gradient: "from-sky-100 to-blue-50" },
  { id: 6, name: "Office Bags", image: categoryTote, itemCount: 12, gradient: "from-coral/20 to-rose-50" },
];

const CategoryCard = ({ category, index }: { category: Category; index: number }) => {
  return (
    <motion.div 
      className="group cursor-pointer"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Card Container */}
      <div className={`relative rounded-3xl bg-gradient-to-br ${category.gradient} p-6 sm:p-8 overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-coral/10`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-coral/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Item Count Badge */}
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-xs font-semibold text-foreground">{category.itemCount} Items</span>
        </div>

        {/* Image Container */}
        <div className="relative w-full aspect-square flex items-center justify-center mb-4">
          <motion.img
            src={category.image}
            alt={category.name}
            className="w-4/5 h-4/5 object-contain drop-shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.4 }}
          />
        </div>
        
        {/* Category Info */}
        <div className="relative z-10">
          <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-coral transition-colors duration-300">
            {category.name}
          </h3>
          
          {/* Explore Link */}
          <div className="flex items-center gap-2 mt-2 text-muted-foreground group-hover:text-coral transition-colors duration-300">
            <span className="text-sm font-medium">Explore</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-coral/30 transition-colors duration-300" />
      </div>
    </motion.div>
  );
};

const CategoriesSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-coral/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-coral/10 text-coral px-5 py-2.5 rounded-full text-sm font-medium mb-6 border border-coral/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="h-4 w-4" />
              <span>Browse Categories</span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
              Find Your{" "}
              <span className="text-coral relative inline-block">
                Perfect Purse
                <motion.svg 
                  className="absolute -bottom-2 left-0 w-full" 
                  viewBox="0 0 200 12" 
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
                >
                  <motion.path 
                    d="M2 8C50 2 150 2 198 8" 
                    stroke="hsl(var(--coral))" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    className="opacity-60"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                  />
                </motion.svg>
              </span>
            </h2>
            <p className="text-muted-foreground text-lg sm:text-xl mt-4 sm:mt-6 max-w-2xl mx-auto leading-relaxed">
              Whether it's daily use, office wear, or a special occasion — we have the
              perfect purse crafted just for you.
            </p>
          </div>
        </ScrollReveal>

        {/* Categories Grid */}
        <StaggerReveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6" staggerDelay={0.1}>
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </StaggerReveal>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.4}>
          <div className="flex justify-center mt-12 sm:mt-16">
            <motion.button 
              className="group flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full font-medium text-base hover:bg-coral transition-colors duration-300 shadow-xl hover:shadow-2xl"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Categories
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CategoriesSection;
