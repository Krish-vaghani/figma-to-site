import { Heart, Star, ShoppingCart, Flame, TrendingUp, Award, Sparkles } from "lucide-react";
import product1 from "@/assets/product-1.png";
import product2 from "@/assets/product-2.png";
import product3 from "@/assets/product-3.png";
import product4 from "@/assets/product-4.png";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  reviews: string;
  rating: number;
  image: string;
  badge?: "bestseller" | "trending" | "new" | "hot";
  colors: string[];
}

const BadgeComponent = ({ type }: { type: "bestseller" | "trending" | "new" | "hot" }) => {
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

const products: Product[] = [
  {
    id: 1,
    name: "Aurora Mini Purse",
    description: "Structured Crossbody With Top Handle",
    price: 500,
    originalPrice: 800,
    reviews: "125k Reviews",
    rating: 4.0,
    image: product1,
    badge: "bestseller",
    colors: ["#374151", "#F5D0C5", "#F3C677"],
  },
  {
    id: 2,
    name: "Velora Crossbody",
    description: "Modern Structured Handheld Bag",
    price: 3299,
    originalPrice: 4025,
    reviews: "125k Reviews",
    rating: 4.0,
    image: product2,
    badge: "trending",
    colors: ["#374151", "#F5D0C5", "#F3C677"],
  },
  {
    id: 3,
    name: "Bloom Mini Tote",
    description: "Compact Tote With Spacious Interior",
    price: 2199,
    originalPrice: 3250,
    reviews: "125k Reviews",
    rating: 4.0,
    image: product3,
    badge: "new",
    colors: ["#374151", "#E8B4B8", "#D4A574"],
  },
  {
    id: 4,
    name: "Nova Chain Purse",
    description: "Premium Quilted Evening Bag",
    price: 2799,
    originalPrice: 29999,
    reviews: "125k Reviews",
    rating: 4.0,
    image: product4,
    badge: "hot",
    colors: ["#D4A574", "#F3C677", "#E8B4B8"],
  },
];

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group cursor-pointer">
      {/* Image Container */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-secondary/30 aspect-[4/5]">
        {/* Badge */}
        {product.badge && <BadgeComponent type={product.badge} />}

        {/* Wishlist Button */}
        <button className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 bg-foreground/60 hover:bg-coral text-white rounded-full p-2 sm:p-2.5 transition-all duration-300 hover:scale-110">
          <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover Overlay with Add to Cart */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-all duration-300 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
          <button className="bg-white text-foreground font-medium px-6 py-3 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-coral hover:text-white shadow-lg">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-3">
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

        <p className="text-muted-foreground text-sm">{product.description}</p>

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

const CollectionsSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Our Best <span className="text-coral">Collections</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto">
            Discover Our Most Loved Purse Collections, Designed To Match Every Mood,
            Outfit, And Occasion.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
