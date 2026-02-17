import { Heart, ArrowRight, Flame, TrendingUp, Award, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import ProductCarousel from "./ProductCarousel";
import StockBadge from "./StockBadge";
import { useWishlist } from "@/contexts/WishlistContext";
import { products, type Product, type BadgeType } from "@/data/products";

const BadgeComponent = ({ type }: { type: BadgeType }) => {
  const badgeStyles = {
    bestseller: {
      bg: "bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600",
      glow: "before:bg-amber-400/30",
      icon: Award,
      text: "Best Seller",
      iconColor: "text-amber-100",
    },
    trending: {
      bg: "bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600",
      glow: "before:bg-emerald-400/30",
      icon: TrendingUp,
      text: "Trending",
      iconColor: "text-emerald-100",
    },
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
    limited: {
      bg: "bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600",
      glow: "before:bg-purple-400/30",
      icon: Sparkles,
      text: "Limited",
      iconColor: "text-violet-100",
    },
  };

  const style = badgeStyles[type];
  const Icon = style.icon;

  return (
    <span
      className={`absolute top-3 sm:top-4 left-3 sm:left-4 z-10 ${style.bg} text-white text-[10px] sm:text-xs font-semibold tracking-wide uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2 transition-all duration-500 group-hover:scale-105 shadow-lg backdrop-blur-sm before:absolute before:inset-0 before:rounded-full ${style.glow} before:blur-xl before:-z-10 before:animate-pulse border border-white/20 overflow-hidden`}
    >
      {/* Shimmer effect */}
      <span className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full pointer-events-none">
        <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
      </span>
      <Icon className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${style.iconColor} drop-shadow-sm relative z-10`} />
      <span className="drop-shadow-sm relative z-10">{style.text}</span>
    </span>
  );
};

const ProductCard = ({ product, onClick }: { product: Product; onClick: () => void }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  return (
    <div
      className="w-[240px] sm:w-[280px] h-full group cursor-pointer bg-card rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_4px_20px_-4px_hsl(var(--foreground)/0.08)] transition-all duration-300 flex flex-col"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-[200px] sm:h-[240px] overflow-hidden flex-shrink-0">
        {/* Dynamic Badge */}
        {product.badge && <BadgeComponent type={product.badge} />}

        {/* Wishlist Button - Transparent with blue tint */}
        <motion.button
          className={`absolute top-3 sm:top-4 right-3 sm:right-4 z-10 rounded-full p-2 sm:p-2.5 transition-all duration-300 backdrop-blur-sm ${isWishlisted
              ? "bg-coral text-white"
              : "bg-blue-500/20 text-white border border-white/30"
            }`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id, product.name);
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isWishlisted ? "fill-current" : ""}`} />
        </motion.button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={`${product.name} - Designer handbag`}
          className="w-full h-full object-cover pointer-events-none will-change-transform"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 space-y-3 flex-grow flex flex-col">
        {/* Name & Colors */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-foreground text-sm sm:text-base">
            {product.name}
          </h3>
          <div className="flex gap-1">
            {product.colors.map((color, index) => (
              <span
                key={index}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-border cursor-pointer"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Price & Stock Badge together */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-xl font-bold text-foreground">
              ₹{product.price.toLocaleString()}
            </span>
            <span className="text-muted-foreground line-through text-xs">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          </div>
          <StockBadge stock={product.stock} variant="text" showIcon={false} />
        </div>

        {/* CTA Link */}
        <a
          href={`/product/${product.id}`}
          className="inline-flex items-center gap-1.5 text-coral font-medium text-sm group/link hover:gap-3 transition-all duration-300 mt-auto"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Let's Check It Out
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
        </a>
      </div>
    </div>
  );
};

import { LandingSection } from "@/types/landing";

interface CollectionsSectionProps {
  data?: LandingSection;
}

const CollectionsSection = ({ data }: CollectionsSectionProps) => {
  const navigate = useNavigate();
  // Only show first 4 products for collections
  const collectionProducts = products.slice(0, 4);

  return (
    <section className="pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20 bg-background overflow-hidden">
      {/* Section Header */}
      <ScrollReveal>
        <div className="text-center mb-8 sm:mb-12 px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Our Best <span className="text-coral">Collections</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto">
            Discover Our Most Loved Purse Collections, Designed To Match Every Mood,
            Outfit, And Occasion.
          </p>
        </div>
      </ScrollReveal>

      {/* Products Carousel */}
      <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
        <ProductCarousel autoplayDelay={4000}>
          {collectionProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => navigate(`/product/${product.slug ?? product.id}`)}
            />
          ))}
        </ProductCarousel>
      </div>

    </section>
  );
};

export default CollectionsSection;
