import { useMemo } from "react";
import { Heart, Star, Award, TrendingUp, Sparkles, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useWishlist } from "@/contexts/WishlistContext";
import ScrollReveal from "@/components/ScrollReveal";
import { normalizeRating } from "@/lib/utils";
import { useGetProductListQuery } from "@/store/services/productApi";
import { mapApiProductToProduct } from "@/types/product";
import { products, type Product, type BadgeType } from "@/data/products";

const BadgeComponent = ({ type }: { type: BadgeType }) => {
  const badgeStyles = {
    bestseller: {
      bg: "bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600",
      icon: Award,
      text: "Best Seller",
      iconColor: "text-amber-100",
    },
    trending: {
      bg: "bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600",
      icon: TrendingUp,
      text: "Trending",
      iconColor: "text-emerald-100",
    },
    new: {
      bg: "bg-gradient-to-br from-coral via-rose-500 to-pink-600",
      icon: Sparkles,
      text: "New",
      iconColor: "text-rose-100",
    },
    hot: {
      bg: "bg-gradient-to-br from-red-400 via-red-500 to-rose-600",
      icon: Flame,
      text: "Hot",
      iconColor: "text-red-100",
    },
    limited: {
      bg: "bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600",
      icon: Sparkles,
      text: "Limited",
      iconColor: "text-violet-100",
    },
  };

  const style = badgeStyles[type];
  const Icon = style.icon;

  return (
    <span
      className={`absolute top-2 sm:top-3 left-2 sm:left-3 z-10 ${style.bg} text-white text-[9px] sm:text-[10px] font-semibold uppercase px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1 shadow-lg border border-white/20 overflow-hidden`}
    >
      <span className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full pointer-events-none">
        <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
      </span>
      <Icon className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${style.iconColor} relative z-10`} />
      <span className="relative z-10">{style.text}</span>
    </span>
  );
};

const RelatedProductCard = ({ product, onClick }: { product: Product; onClick: () => void }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const displayRating = normalizeRating(product.rating);

  return (
    <div
      className="group cursor-pointer bg-card rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_hsl(var(--foreground)/0.08)] transition-all duration-300"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square">
        {product.badge && <BadgeComponent type={product.badge} />}
        <motion.button
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-10 rounded-full p-1.5 sm:p-2 transition-all duration-300 backdrop-blur-sm ${
            isWishlisted
              ? "bg-coral text-white"
              : "bg-blue-500/20 text-white border border-white/30"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id, product.name);
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isWishlisted ? "fill-current" : ""}`} />
        </motion.button>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4 space-y-1.5">
        <div className="flex items-center justify-between gap-1">
          <h3 className="font-semibold text-foreground text-xs sm:text-sm truncate">{product.name}</h3>
          <div className="flex gap-1 flex-shrink-0">
            {(product.colors ?? []).slice(0, 2).map((color, index) => (
              <span
                key={index}
                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-border"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        <p className="text-muted-foreground text-[10px] sm:text-xs truncate">{product.description}</p>
        <div className="flex flex-col gap-0.5 pt-1 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-bold text-foreground">
              ₹{product.price.toLocaleString()}
            </span>
            <span className="text-muted-foreground line-through text-[10px] sm:text-xs">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            <Star className="h-3 w-3 fill-coral text-coral flex-shrink-0" />
            <span className="text-muted-foreground text-[10px] sm:text-xs">
              {displayRating.toFixed(1)}({product.reviews})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface RelatedProductsProps {
  /** Current product id (backend _id or number) to exclude from list */
  currentProductId: number | string;
}

const RelatedProducts = ({ currentProductId }: RelatedProductsProps) => {
  const navigate = useNavigate();
  const { data: listResponse, isLoading, isError } = useGetProductListQuery({
    page: 1,
    limit: 50,
    category: "purse",
  });

  const relatedProducts = useMemo(() => {
    const fromApi = (listResponse?.data ?? [])
      .filter((p) => String(p._id) !== String(currentProductId))
      .sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0))
      .slice(0, 4)
      .map(mapApiProductToProduct);
    if (fromApi.length > 0) return fromApi;
    return products
      .filter((p) => String(p.id) !== String(currentProductId))
      .slice(0, 4);
  }, [listResponse?.data, currentProductId]);

  return (
    <section className="py-10 sm:py-16">
      <ScrollReveal>
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground font-serif">
            Explore <span className="text-coral">Related Products</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-2 sm:mt-3 max-w-lg mx-auto">
            Discover Similar Styles You'll Love — Thoughtfully Designed To Match Your Everyday Elegance.
          </p>
        </div>
      </ScrollReveal>

      {isError && (
        <p className="text-center text-sm text-muted-foreground">
          Unable to load related products right now.
        </p>
      )}

      {!isError && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {(isLoading && relatedProducts.length === 0) && (
            <p className="col-span-2 lg:col-span-4 text-center text-sm text-muted-foreground">
              Loading related products…
            </p>
          )}
          {relatedProducts.map((product) => (
            <RelatedProductCard
              key={product.id}
              product={product}
              onClick={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default RelatedProducts;
