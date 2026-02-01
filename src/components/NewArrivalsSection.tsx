import { Heart, ArrowRight, Flame, TrendingUp, Award, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import StaggerReveal from "./StaggerReveal";
import ProductQuickView from "./ProductQuickView";
import StockBadge from "./StockBadge";
import { useWishlist } from "@/contexts/WishlistContext";
import { products, type Product, type BadgeType } from "@/data/products";

const BadgeComponent = ({ type }: { type: BadgeType }) => {
  const badgeStyles = {
    new: {
      bg: "bg-gradient-to-br from-coral via-rose-500 to-pink-600",
      glow: "before:bg-coral/30",
      icon: Sparkles,
      text: "New",
      iconColor: "text-rose-100",
    },
    hot: {
      bg: "bg-gradient-to-br from-red-400 via-red-500 to-rose-600",
      glow: "before:bg-red-400/30",
      icon: Flame,
      text: "Hot",
      iconColor: "text-red-100",
    },
    trending: {
      bg: "bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600",
      glow: "before:bg-emerald-400/30",
      icon: TrendingUp,
      text: "Trending",
      iconColor: "text-emerald-100",
    },
    bestseller: {
      bg: "bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600",
      glow: "before:bg-amber-400/30",
      icon: Award,
      text: "Best Seller",
      iconColor: "text-amber-100",
    },
    limited: {
      bg: "bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600",
      glow: "before:bg-purple-400/30",
      icon: Zap,
      text: "Limited",
      iconColor: "text-violet-100",
    },
  };

  const style = badgeStyles[type];
  const Icon = style.icon;

  return (
    <span
      className={`absolute top-3 sm:top-4 left-3 sm:left-4 z-10 ${style.bg} text-white text-[10px] sm:text-xs font-semibold tracking-wide uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2 transition-all duration-500 group-hover:scale-105 shadow-lg backdrop-blur-sm before:absolute before:inset-0 before:rounded-full ${style.glow} before:blur-xl before:-z-10 before:animate-pulse border border-white/20`}
    >
      <Icon className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${style.iconColor} drop-shadow-sm`} />
      <span className="drop-shadow-sm">{style.text}</span>
    </span>
  );
};

const NewProductCard = ({ product, onClick }: { product: Product; onClick: () => void }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id + 100); // Offset to avoid ID collision with collections

  return (
    <div className="group cursor-pointer bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300" onClick={onClick}>
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {/* Dynamic Badge */}
        {product.badge && <BadgeComponent type={product.badge} />}

        {/* Wishlist Button */}
        <motion.button 
          className={`absolute top-3 sm:top-4 right-3 sm:right-4 z-10 rounded-full p-2 sm:p-2.5 transition-all duration-300 hover:scale-110 shadow-md ${
            isWishlisted 
              ? "bg-coral text-white" 
              : "bg-white/90 hover:bg-coral text-muted-foreground hover:text-white"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id + 100, product.name);
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isWishlisted ? "fill-current" : ""}`} />
        </motion.button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 space-y-3">
        {/* Name & Colors */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-foreground text-sm sm:text-base group-hover:text-coral transition-colors duration-300">
            {product.name}
          </h3>
          <div className="flex gap-1">
            {product.colors.map((color, index) => (
              <span
                key={index}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-border hover:scale-125 transition-transform duration-200 cursor-pointer"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Stock Urgency Indicator */}
        <StockBadge stock={product.stock} variant="text" />

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg sm:text-xl font-bold text-foreground">
            ${product.price.toLocaleString()}.00
          </span>
          <span className="text-muted-foreground line-through text-sm">
            ${product.originalPrice.toLocaleString()}.00
          </span>
        </div>

        {/* CTA Link */}
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-coral font-medium text-sm group/link hover:gap-3 transition-all duration-300"
        >
          Let's Check It Out
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
        </a>
      </div>
    </div>
  );
};

const NewArrivalsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Fresh Styles <span className="text-coral">Just Dropped</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto">
              Whether It's Daily Use, Office Wear, Or A Special Occasion — We Have The
              Perfect Purse For You.
            </p>
          </div>
        </ScrollReveal>

        {/* Products Grid */}
        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8" staggerDelay={0.08}>
          {products.map((product) => (
            <NewProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} />
          ))}
        </StaggerReveal>

        {/* Quick View Modal */}
        {selectedProduct && (
          <ProductQuickView
            product={{
              ...selectedProduct,
              id: selectedProduct.id + 100, // Offset for wishlist consistency
            }}
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}

        {/* Explore Button */}
        <ScrollReveal delay={0.3}>
          <div className="flex justify-center mt-10 sm:mt-14">
            <button className="bg-foreground text-background font-medium px-8 py-4 rounded-full flex items-center gap-2 hover:bg-coral transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Explore All New Arrivals
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default NewArrivalsSection;
