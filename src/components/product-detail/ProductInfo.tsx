import { useState } from "react";
import { Star, Minus, Plus, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import type { Product } from "@/data/products";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(5);
  const [selectedColor, setSelectedColor] = useState(0);
  const { addToCart, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const savings = product.originalPrice - product.price;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        color: product.colors[selectedColor],
      },
      quantity
    );
    setIsCartOpen(true);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Product Title */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight font-serif">
          Ladies Hand Bag Classic Leather
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">{product.description}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 sm:h-5 sm:w-5 ${
                i < Math.floor(product.rating)
                  ? "fill-coral text-coral"
                  : "text-muted-foreground/30"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">48 Reviews</span>
      </div>

      {/* Price */}
      <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
        <span className="text-2xl sm:text-3xl font-bold text-foreground">
          ${product.price.toLocaleString()}
        </span>
        <span className="text-base sm:text-lg text-muted-foreground line-through">
          ${product.originalPrice.toLocaleString()}
        </span>
        {savings > 0 && (
          <span className="text-sm font-medium text-coral">
            (You Save ${savings.toLocaleString()})
          </span>
        )}
      </div>

      {/* Quantity & Color */}
      <div className="flex flex-wrap items-end gap-6 sm:gap-8">
        {/* Quantity */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Select Quantity :</p>
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="p-2.5 sm:p-3 hover:bg-secondary/50 transition-colors"
            >
              <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
            <span className="w-10 sm:w-12 text-center font-medium text-sm sm:text-base">
              {String(quantity).padStart(2, "0")}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="p-2.5 sm:p-3 hover:bg-secondary/50 transition-colors"
            >
              <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>

        {/* Color */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Color :</p>
          <div className="flex gap-2">
            {product.colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(index)}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === index
                    ? "border-coral scale-110 shadow-md"
                    : "border-border hover:scale-105"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Size & Fit */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Size & Fit :</p>
        <div className="flex flex-wrap items-center gap-3 sm:gap-0 text-sm sm:text-base text-foreground">
          <span>Height : 18 Cm</span>
          <span className="hidden sm:inline w-[2px] h-4 bg-coral mx-4 rounded-full" />
          <span>Width : 22 Cm</span>
          <span className="hidden sm:inline w-[2px] h-4 bg-coral mx-4 rounded-full" />
          <span>Depth : 10 Cm</span>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h3 className="text-base sm:text-lg font-semibold text-foreground">
          Designed For Everyday Elegance :
        </h3>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          The Bloom Mini Tote Is Crafted For Women Who Love Minimal Style With Maximum Utility.
          Compact From Outside Yet Thoughtfully Spacious Inside, It's Perfect For Daily Outings,
          Brunches, Shopping, Or Casual Workdays. Soft Textures, Subtle Detailing, And A Timeless
          Silhouette Make This Tote An Effortless Style Upgrade.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 sm:gap-4 pt-2">
        <motion.button
          className="flex-1 bg-foreground text-background font-medium px-4 sm:px-6 py-3 sm:py-3.5 rounded-full text-sm sm:text-base hover:bg-coral transition-colors duration-300"
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
        >
          Add To Cart
        </motion.button>
        <motion.button
          className={`flex-1 border-2 font-medium px-4 sm:px-6 py-3 sm:py-3.5 rounded-full text-sm sm:text-base transition-colors duration-300 flex items-center justify-center gap-2 ${
            isWishlisted
              ? "border-coral bg-coral/10 text-coral"
              : "border-foreground text-foreground hover:bg-foreground hover:text-background"
          }`}
          whileTap={{ scale: 0.98 }}
          onClick={() => toggleWishlist(product.id, product.name)}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
          Add To Wishlist
        </motion.button>
      </div>
    </div>
  );
};

export default ProductInfo;
