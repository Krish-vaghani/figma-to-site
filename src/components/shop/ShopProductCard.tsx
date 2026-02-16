import { Heart, Star, Award, TrendingUp, Sparkles, Flame, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlist } from "@/contexts/WishlistContext";
import type { Product, BadgeType } from "@/data/products";

interface ShopProductCardProps {
  product: Product;
  onClick: () => void;
}

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
      bg: "bg-gradient-to-br from-green-400 via-green-500 to-emerald-600",
      glow: "before:bg-green-400/30",
      icon: Tag,
      text: "Sale",
      iconColor: "text-green-100",
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

const ShopProductCard = ({ product, onClick }: ShopProductCardProps) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  return (
    <div
      className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-[30px] bg-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.12),0_4px_16px_0_rgba(0,0,0,0.08),inset_0_0_0_1px_rgba(255,255,255,0.1)]"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-secondary/30 aspect-square rounded-t-2xl">
        {/* Product Badge */}
        {product.badge && <BadgeComponent type={product.badge} />}

        {/* Wishlist Button */}
        <motion.button
          className={`absolute top-3 right-3 z-10 rounded-full p-2.5 transition-all duration-300 ${
            isWishlisted
              ? "bg-coral text-white"
              : "bg-foreground/40 text-white hover:bg-foreground/60"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id, product.name);
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart
            className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`}
          />
        </motion.button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={`${product.name} - Designer handbag`}
          className="w-full h-full object-cover pointer-events-none"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        {/* Name and Colors Row */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-foreground text-base group-hover:text-coral transition-colors duration-300">
            {product.name}
          </h3>
          {/* Color Options */}
          <div className="flex gap-1.5 flex-shrink-0">
            {product.colors.map((color, index) => (
              <span
                key={index}
                className="w-5 h-5 rounded-full border border-border"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm">{product.description}</p>

        {/* Divider */}
        <div className="border-t border-border my-2" />

        {/* Price and Rating Row */}
        <div className="flex items-center justify-between pt-1">
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              ${product.price.toLocaleString()}.00
            </span>
            {product.originalPrice > product.price && (
              <span className="text-muted-foreground line-through text-sm">
                ${product.originalPrice.toLocaleString()}.00
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-coral text-coral" />
            <span className="text-muted-foreground text-sm">
              {product.rating}({product.reviews})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProductCard;
