import { Heart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlist } from "@/contexts/WishlistContext";
import type { Product } from "@/data/products";

interface ShopProductCardProps {
  product: Product;
  onClick: () => void;
}

const ShopProductCard = ({ product, onClick }: ShopProductCardProps) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  return (
    <div
      className="group cursor-pointer bg-card rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-secondary/30 aspect-square rounded-t-2xl">
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
            <span className="text-muted-foreground line-through text-sm">
              ${product.originalPrice.toLocaleString()}.00
            </span>
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
