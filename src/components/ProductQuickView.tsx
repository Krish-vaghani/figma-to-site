import { Heart, Star, ShoppingCart, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ProductQuickViewProps {
  product: {
    id: number;
    name: string;
    description?: string;
    price: number;
    originalPrice: number;
    image: string;
    colors: string[];
    rating?: number;
    reviews?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const ProductQuickView = ({ product, isOpen, onClose }: ProductQuickViewProps) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart, setIsCartOpen } = useCart();
  const isWishlisted = isInWishlist(product.id);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-0 overflow-hidden overflow-y-auto bg-background border-none rounded-2xl">
        <VisuallyHidden>
          <DialogTitle>{product.name}</DialogTitle>
        </VisuallyHidden>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="relative aspect-[4/3] sm:aspect-square bg-secondary/30 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={product.image}
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            {/* Discount Badge */}
            {discount > 0 && (
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-coral text-white text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
                -{discount}% OFF
              </span>
            )}

            {/* Wishlist Button */}
            <motion.button
              className={`absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full p-2 sm:p-2.5 transition-all duration-300 shadow-lg ${
                isWishlisted
                  ? "bg-coral text-white"
                  : "bg-white/90 hover:bg-coral text-muted-foreground hover:text-white"
              }`}
              onClick={() => toggleWishlist(product.id, product.name)}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isWishlisted ? "fill-current" : ""}`} />
            </motion.button>
          </div>

          {/* Product Details */}
          <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-start md:justify-center space-y-4 sm:space-y-5">
            {/* Title & Rating */}
            <div className="space-y-1.5 sm:space-y-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-tight">
                {product.name}
              </h2>
              {product.description && (
                <p className="text-sm sm:text-base text-muted-foreground">{product.description}</p>
              )}
              {product.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                          i < Math.floor(product.rating!)
                            ? "fill-coral text-coral"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {product.rating} ({product.reviews || "0 Reviews"})
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-foreground">
                ${product.price.toLocaleString()}.00
              </span>
              <span className="text-base sm:text-lg text-muted-foreground line-through">
                ${product.originalPrice.toLocaleString()}.00
              </span>
              {discount > 0 && (
                <span className="text-xs sm:text-sm font-medium text-coral">
                  Save ${(product.originalPrice - product.price).toLocaleString()}
                </span>
              )}
            </div>

            {/* Color Selection */}
            <div className="space-y-2 sm:space-y-3">
              <p className="text-xs sm:text-sm font-medium text-foreground">Select Color</p>
              <div className="flex gap-2">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === index
                        ? "border-coral scale-110 shadow-md"
                        : "border-border hover:scale-105"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2 sm:space-y-3">
              <p className="text-xs sm:text-sm font-medium text-foreground">Quantity</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-full overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 sm:p-2.5 hover:bg-secondary/50 transition-colors"
                  >
                    <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                  <span className="w-10 sm:w-12 text-center font-medium text-sm sm:text-base">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 sm:p-2.5 hover:bg-secondary/50 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-1 sm:pt-2">
              <motion.button
                className="flex-1 bg-foreground text-background font-medium px-5 sm:px-6 py-3 sm:py-3.5 rounded-full flex items-center justify-center gap-2 text-sm sm:text-base hover:bg-coral transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    originalPrice: product.originalPrice,
                    image: product.image,
                    color: product.colors[selectedColor],
                  }, quantity);
                  onClose();
                  setIsCartOpen(true);
                }}
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                Add to Cart
              </motion.button>
              <motion.button
                className="flex-1 border-2 border-foreground text-foreground font-medium px-5 sm:px-6 py-3 sm:py-3.5 rounded-full text-sm sm:text-base hover:bg-foreground hover:text-background transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    originalPrice: product.originalPrice,
                    image: product.image,
                    color: product.colors[selectedColor],
                  }, quantity);
                  onClose();
                  setIsCartOpen(true);
                }}
              >
                Buy Now
              </motion.button>
            </div>

            {/* Additional Info */}
            <div className="pt-3 sm:pt-4 border-t border-border space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
              <p>✓ Free shipping on orders over $50</p>
              <p>✓ 30-day return policy</p>
              <p>✓ Secure checkout</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;
