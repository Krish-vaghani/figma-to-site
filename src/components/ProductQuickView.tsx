import { Heart, Star, ShoppingCart, Minus, Plus, X } from "lucide-react";
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
      <DialogContent 
        className="max-w-4xl w-[95vw] p-0 overflow-hidden bg-background border-none rounded-2xl"
        hideCloseButton
      >
        <VisuallyHidden>
          <DialogTitle>{product.name}</DialogTitle>
        </VisuallyHidden>
        
        {/* Custom Close Button - Outside the image area */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 sm:top-3 sm:right-3 z-50 bg-white/90 hover:bg-coral text-foreground hover:text-white rounded-full p-2 shadow-lg transition-all duration-300"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="relative h-40 sm:h-56 md:h-auto md:aspect-square bg-secondary/30 overflow-hidden">
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
              <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-coral text-white text-[9px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full">
                -{discount}% OFF
              </span>
            )}

            {/* Wishlist Button */}
            <motion.button
              className={`absolute top-2 right-2 sm:top-4 sm:right-4 rounded-full p-1.5 sm:p-2.5 transition-all duration-300 shadow-lg ${
                isWishlisted
                  ? "bg-coral text-white"
                  : "bg-white/90 hover:bg-coral text-muted-foreground hover:text-white"
              }`}
              onClick={() => toggleWishlist(product.id, product.name)}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className={`h-3.5 w-3.5 sm:h-5 sm:w-5 ${isWishlisted ? "fill-current" : ""}`} />
            </motion.button>
          </div>

          {/* Product Details */}
          <div className="p-3 sm:p-5 md:p-8 flex flex-col justify-start md:justify-center space-y-2 sm:space-y-4">
            {/* Title & Rating */}
            <div className="space-y-1">
              <h2 className="text-base sm:text-xl md:text-3xl font-bold text-foreground leading-tight">
                {product.name}
              </h2>
              {product.rating && (
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 sm:h-4 sm:w-4 ${
                          i < Math.floor(product.rating!)
                            ? "fill-coral text-coral"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] sm:text-sm text-muted-foreground">
                    {product.rating} ({product.reviews || "0 Reviews"})
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-3">
              <span className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground">
                ${product.price.toLocaleString()}.00
              </span>
              <span className="text-xs sm:text-base text-muted-foreground line-through">
                ${product.originalPrice.toLocaleString()}.00
              </span>
              {discount > 0 && (
                <span className="text-[10px] sm:text-sm font-medium text-coral">
                  Save ${(product.originalPrice - product.price).toLocaleString()}
                </span>
              )}
            </div>

            {/* Color & Quantity Row - Combined for mobile */}
            <div className="flex items-center justify-between gap-4">
              {/* Color Selection */}
              <div className="space-y-1">
                <p className="text-[10px] sm:text-sm font-medium text-foreground">Color</p>
                <div className="flex gap-1.5">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-200 ${
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
              <div className="space-y-1">
                <p className="text-[10px] sm:text-sm font-medium text-foreground">Qty</p>
                <div className="flex items-center border border-border rounded-full overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-1.5 sm:p-2.5 hover:bg-secondary/50 transition-colors"
                  >
                    <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                  <span className="w-6 sm:w-10 text-center font-medium text-xs sm:text-base">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-1.5 sm:p-2.5 hover:bg-secondary/50 transition-colors"
                  >
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3 pt-1">
              <motion.button
                className="flex-1 bg-foreground text-background font-medium px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-full flex items-center justify-center gap-1.5 text-xs sm:text-base hover:bg-coral transition-colors duration-300"
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
                <ShoppingCart className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                Add to Cart
              </motion.button>
              <motion.button
                className="flex-1 border-2 border-foreground text-foreground font-medium px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-base hover:bg-foreground hover:text-background transition-colors duration-300"
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

            {/* Additional Info - Hidden on mobile */}
            <div className="hidden sm:block pt-3 border-t border-border space-y-1.5 text-xs sm:text-sm text-muted-foreground">
              <p>✓ Free shipping on orders over $50</p>
              <p>✓ 30-day return policy</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;
