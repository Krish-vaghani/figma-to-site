import { Heart, ArrowRight, Flame, TrendingUp, Award, Sparkles, Zap } from "lucide-react";
import product1 from "@/assets/product-1.png";
import product2 from "@/assets/product-2.png";
import product3 from "@/assets/product-3.png";
import product4 from "@/assets/product-4.png";

type BadgeType = "new" | "hot" | "trending" | "bestseller" | "limited";

interface NewProduct {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  colors: string[];
  badge: BadgeType;
}

const BadgeComponent = ({ type }: { type: BadgeType }) => {
  const badgeStyles = {
    new: {
      bg: "bg-gradient-to-r from-coral to-rose-500",
      shadow: "shadow-lg shadow-coral/40",
      icon: Sparkles,
      text: "New",
    },
    hot: {
      bg: "bg-gradient-to-r from-red-500 to-pink-500",
      shadow: "shadow-lg shadow-red-500/40",
      icon: Flame,
      text: "Hot",
    },
    trending: {
      bg: "bg-gradient-to-r from-emerald-500 to-teal-500",
      shadow: "shadow-lg shadow-emerald-500/40",
      icon: TrendingUp,
      text: "Trending",
    },
    bestseller: {
      bg: "bg-gradient-to-r from-amber-500 to-orange-500",
      shadow: "shadow-lg shadow-amber-500/40",
      icon: Award,
      text: "Best Seller",
    },
    limited: {
      bg: "bg-gradient-to-r from-purple-500 to-indigo-500",
      shadow: "shadow-lg shadow-purple-500/40",
      icon: Zap,
      text: "Limited",
    },
  };

  const style = badgeStyles[type];
  const Icon = style.icon;

  return (
    <span
      className={`absolute top-3 sm:top-4 left-3 sm:left-4 z-10 ${style.bg} ${style.shadow} text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl animate-pulse`}
    >
      <Icon className="h-3 w-3" />
      {style.text}
    </span>
  );
};

const newProducts: NewProduct[] = [
  {
    id: 1,
    name: "Aurora Mini Purse",
    price: 500,
    originalPrice: 800,
    image: product1,
    colors: ["#374151", "#F5D0C5", "#F3C677"],
    badge: "new",
  },
  {
    id: 2,
    name: "Velora Crossbody",
    price: 3299,
    originalPrice: 4025,
    image: product2,
    colors: ["#374151", "#F5D0C5", "#F3C677"],
    badge: "hot",
  },
  {
    id: 3,
    name: "Bloom Mini Tote",
    price: 2199,
    originalPrice: 3250,
    image: product3,
    colors: ["#374151", "#E8B4B8", "#D4A574"],
    badge: "trending",
  },
  {
    id: 4,
    name: "Nova Chain Purse",
    price: 2799,
    originalPrice: 29999,
    image: product4,
    colors: ["#374151", "#F3C677", "#E8B4B8"],
    badge: "bestseller",
  },
  {
    id: 5,
    name: "Aurora Mini Purse",
    price: 500,
    originalPrice: 800,
    image: product1,
    colors: ["#374151", "#F5D0C5", "#F3C677"],
    badge: "limited",
  },
  {
    id: 6,
    name: "Velora Crossbody",
    price: 3299,
    originalPrice: 4025,
    image: product2,
    colors: ["#374151", "#F5D0C5", "#F3C677"],
    badge: "new",
  },
  {
    id: 7,
    name: "Bloom Mini Tote",
    price: 2199,
    originalPrice: 3250,
    image: product3,
    colors: ["#374151", "#E8B4B8", "#D4A574"],
    badge: "hot",
  },
  {
    id: 8,
    name: "Nova Chain Purse",
    price: 2799,
    originalPrice: 29999,
    image: product4,
    colors: ["#374151", "#F3C677", "#E8B4B8"],
    badge: "trending",
  },
];

const NewProductCard = ({ product }: { product: NewProduct }) => {
  return (
    <div className="group cursor-pointer bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {/* Dynamic Badge */}
        <BadgeComponent type={product.badge} />

        {/* Wishlist Button */}
        <button className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 bg-white/90 hover:bg-coral text-muted-foreground hover:text-white rounded-full p-2 sm:p-2.5 transition-all duration-300 hover:scale-110 shadow-md">
          <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Fresh Styles <span className="text-coral">Just Dropped</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto">
            Whether It's Daily Use, Office Wear, Or A Special Occasion — We Have The
            Perfect Purse For You.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {newProducts.map((product) => (
            <NewProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Explore Button */}
        <div className="flex justify-center mt-10 sm:mt-14">
          <button className="bg-foreground text-background font-medium px-8 py-4 rounded-full flex items-center gap-2 hover:bg-coral transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            Explore All New Arrivals
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsSection;
