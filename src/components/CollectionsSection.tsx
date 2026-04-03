import { Heart, ArrowRight, Flame, TrendingUp, Award, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import ProductCarousel from "./ProductCarousel";
import TodayViewedBadge from "./TodayViewedBadge";
import { useWishlist } from "@/contexts/WishlistContext";
import { products, type Product, type BadgeType } from "@/data/products";
import { useViewProductMutation } from "@/store/services/productApi";
import { useViewedToday } from "@/contexts/ViewedTodayContext";

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
    sale: {
      bg: "bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600",
      glow: "before:bg-emerald-500/30",
      icon: Sparkles,
      text: "Sale",
      iconColor: "text-emerald-100",
    },
  };

  const style = badgeStyles[type];
  if (!style) return null;
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

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const [viewProduct] = useViewProductMutation();
  const { incrementViewedToday } = useViewedToday();

  const handleCardClick = () => {
    incrementViewedToday(product.id);
    if (typeof product.id === "string") {
      viewProduct(product.id).catch(() => {});
    }
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="w-[280px] sm:w-[320px] h-full group cursor-pointer bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col block"
      onClick={handleCardClick}
    >
      {/* Image Container - rounded top to match card */}
      <div className="relative aspect-square overflow-hidden flex-shrink-0 rounded-t-2xl sm:rounded-t-3xl">
        {/* Dynamic Badge */}
        {product.badge && <BadgeComponent type={product.badge} />}

        {/* Wishlist Button - circular overlay like reference */}
        <motion.button
          type="button"
          className={`absolute top-3 sm:top-4 right-3 sm:right-4 z-10 rounded-full p-2 sm:p-2.5 transition-all duration-300 ${isWishlisted
              ? "bg-coral text-white"
              : "bg-stone-500/60 text-white hover:bg-stone-500/80"
            }`}
          onClick={(e) => {
            e.preventDefault();
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
          loading="eager"
          decoding="async"
          fetchPriority={index < 3 ? "high" : "auto"}
          draggable={false}
        />
      </div>

      {/* Product Info - white card content */}
      <div className="p-4 sm:p-5 space-y-3 flex-grow flex flex-col bg-white">
        {/* Name & Colors - like reference: name left, swatches right */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-neutral-900 text-sm sm:text-base">
            {product.name}
          </h3>
          <div className="flex gap-1.5 flex-shrink-0">
            {product.colors.map((color, index) => (
              <span
                key={index}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-neutral-200"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Price & Review */}
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="text-lg sm:text-xl font-bold text-neutral-900">
              ₹{product.price.toLocaleString()}
            </span>
            <span className="text-neutral-500 line-through text-xs">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1 text-neutral-600 text-xs sm:text-sm shrink-0">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
            <span>({product.reviews})</span>
          </div>
        </div>

        {/* Today's view (left) & Let's Check It Out (right) */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          <TodayViewedBadge productId={product.id} />
          <span className="inline-flex items-center gap-1.5 text-coral font-medium text-sm group/link hover:gap-3 transition-all duration-300">
          View Details
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
};

import { landingItemToProduct, type LandingPageData } from "@/types/landing";

interface CollectionsSectionProps {
  landingData?: LandingPageData | null;
}

const CollectionsSection = ({ landingData }: CollectionsSectionProps) => {
  const items = landingData?.best_collections ?? [];
  const collectionProducts =
    items.length > 0
      ? items.map((item) => landingItemToProduct(item, "Best Collections"))
      : products.slice(0, 4);

  return (
    <section className="pt-6 pb-10 sm:pt-8 sm:pb-12 lg:pt-10 lg:pb-14 bg-background overflow-hidden">
      {/* Section Header */}
      <ScrollReveal>
        <div className="text-center mb-6 sm:mb-8 lg:mb-10 px-4">
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
          {collectionProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </ProductCarousel>
      </div>

    </section>
  );
};

export default CollectionsSection;
