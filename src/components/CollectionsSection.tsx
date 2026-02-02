import { Heart, Star, ShoppingCart, Flame, TrendingUp, Award, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import ProductQuickView from "./ProductQuickView";
import StockBadge from "./StockBadge";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { useInfiniteMarquee } from "@/hooks/use-infinite-marquee";
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
      className={`absolute top-3 sm:top-4 left-3 sm:left-4 z-10 ${style.bg} text-white text-[10px] sm:text-xs font-semibold tracking-wide uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2 transition-all duration-500 group-hover:scale-105 shadow-lg backdrop-blur-sm before:absolute before:inset-0 before:rounded-full ${style.glow} before:blur-xl before:-z-10 before:animate-pulse border border-white/20`}
    >
      <Icon className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${style.iconColor} drop-shadow-sm`} />
      <span className="drop-shadow-sm">{style.text}</span>
    </span>
  );
};

const ProductCard = ({ product, onClick }: { product: Product; onClick: () => void }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart, setIsCartOpen } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      color: product.colors[0],
    });
    setIsCartOpen(true);
  };

  return (
    <div 
      className="flex-shrink-0 w-[280px] sm:w-[320px] group cursor-pointer bg-card rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_4px_20px_-4px_hsl(var(--foreground)/0.08)] hover:shadow-[0_20px_50px_-12px_hsl(var(--foreground)/0.2)] transition-all duration-300 select-none" 
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-secondary/30 aspect-[4/5]">
        {/* Badge */}
        {product.badge && <BadgeComponent type={product.badge} />}

        {/* Wishlist Button */}
        <motion.button 
          className={`absolute top-3 sm:top-4 right-3 sm:right-4 z-10 rounded-full p-2 sm:p-2.5 transition-all duration-300 hover:scale-110 ${
            isWishlisted 
              ? "bg-coral text-white" 
              : "bg-foreground/60 hover:bg-coral text-white"
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
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none"
          loading="lazy"
          decoding="async"
          draggable={false}
        />

        {/* Hover Overlay with Add to Cart */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-all duration-300 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
          <button 
            onClick={handleAddToCart}
            className="bg-background text-foreground font-medium px-6 py-3 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-coral hover:text-white shadow-lg"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground text-base sm:text-lg group-hover:text-coral transition-colors duration-300">
            {product.name}
          </h3>
          {/* Color Options */}
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

        <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>

        {/* Stock Urgency Indicator */}
        <StockBadge stock={product.stock} />

        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-foreground">
              ${product.price.toLocaleString()}.00
            </span>
            <span className="text-muted-foreground line-through text-sm">
              ${product.originalPrice.toLocaleString()}.00
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
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

const ProductMarquee = ({ 
  productList, 
  direction = "left",
  speed = 40,
  onProductClick
}: { 
  productList: Product[]; 
  direction?: "left" | "right";
  speed?: number;
  onProductClick: (product: Product) => void;
}) => {
  const { wrapperRef, isDragging, handlers } = useInfiniteMarquee({
    direction,
    speedSeconds: speed,
    sets: 3,
  });

  // Triple the items for seamless infinite scroll
  const items = [...productList, ...productList, ...productList];

  return (
    <div 
      ref={wrapperRef}
      className={
        "relative overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing" +
        (isDragging ? " select-none" : "")
      }
      style={{ scrollBehavior: "auto" }}
      {...handlers}
    >
      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div className="flex gap-4 sm:gap-6 py-2 w-max px-4">
        {items.map((product, index) => (
          <ProductCard 
            key={`${direction}-${product.id}-${index}`} 
            product={product} 
            onClick={() => onProductClick(product)} 
          />
        ))}
      </div>
    </div>
  );
};

const CollectionsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // Only show first 4 products for collections
  const collectionProducts = products.slice(0, 4);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background overflow-hidden">
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

      {/* Products Marquee */}
      <ProductMarquee 
        productList={collectionProducts} 
        direction="left" 
        speed={45}
        onProductClick={setSelectedProduct} 
      />

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default CollectionsSection;
