import { useState, useMemo } from "react";
import { Search, X, SlidersHorizontal, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { product1, product2, product3, product4 } from "@/lib/assetUrls";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  colors: string[];
  badge?: string;
}

const allProducts: Product[] = [
  {
    id: 1,
    name: "Aurora Mini Purse",
    description: "Structured Crossbody With Top Handle",
    price: 500,
    originalPrice: 800,
    image: product1,
    category: "Crossbody",
    colors: ["#374151", "#F5D0C5", "#F3C677"],
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Velora Crossbody",
    description: "Modern Structured Handheld Bag",
    price: 3299,
    originalPrice: 4025,
    image: product2,
    category: "Crossbody",
    colors: ["#374151", "#F5D0C5", "#F3C677"],
    badge: "Trending",
  },
  {
    id: 3,
    name: "Bloom Mini Tote",
    description: "Compact Tote With Spacious Interior",
    price: 2199,
    originalPrice: 3250,
    image: product3,
    category: "Tote",
    colors: ["#374151", "#E8B4B8", "#D4A574"],
    badge: "New",
  },
  {
    id: 4,
    name: "Nova Chain Purse",
    description: "Premium Quilted Evening Bag",
    price: 2799,
    originalPrice: 3500,
    image: product4,
    category: "Clutch",
    colors: ["#D4A574", "#F3C677", "#E8B4B8"],
    badge: "Hot",
  },
  {
    id: 5,
    name: "Luna Sling Bag",
    description: "Elegant Everyday Sling",
    price: 1599,
    originalPrice: 2000,
    image: product1,
    category: "Sling",
    colors: ["#374151", "#F5D0C5"],
  },
  {
    id: 6,
    name: "Stella Evening Clutch",
    description: "Glamorous Party Essential",
    price: 899,
    originalPrice: 1200,
    image: product2,
    category: "Clutch",
    colors: ["#F3C677", "#E8B4B8"],
  },
  {
    id: 7,
    name: "Aria Shoulder Bag",
    description: "Classic Leather Shoulder Bag",
    price: 2499,
    originalPrice: 3000,
    image: product3,
    category: "Tote",
    colors: ["#374151", "#D4A574"],
  },
  {
    id: 8,
    name: "Mira Mini Satchel",
    description: "Compact Yet Stylish Satchel",
    price: 1899,
    originalPrice: 2400,
    image: product4,
    category: "Sling",
    colors: ["#F5D0C5", "#374151", "#F3C677"],
  },
];

const categories = ["All", "Crossbody", "Tote", "Clutch", "Sling"];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $1,000", min: 0, max: 1000 },
  { label: "$1,000 - $2,000", min: 1000, max: 2000 },
  { label: "$2,000 - $3,000", min: 2000, max: 3000 },
  { label: "Over $3,000", min: 3000, max: Infinity },
];

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart, setIsCartOpen } = useCart();

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Search filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      // Price filter
      const priceRange = priceRanges[selectedPriceRange];
      const matchesPrice =
        product.price >= priceRange.min && product.price < priceRange.max;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, selectedPriceRange]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      color: product.colors[0],
    });
    onClose();
    setIsCartOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden bg-background">
        <VisuallyHidden>
          <DialogTitle>Search Products</DialogTitle>
        </VisuallyHidden>

        <div className="flex flex-col h-full max-h-[90vh]">
          {/* Search Header */}
          <div className="p-4 sm:p-6 border-b border-border space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for purses, bags, clutches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-secondary/50 rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 transition-all"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded-full transition-colors"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  showFilters
                    ? "bg-coral text-white"
                    : "bg-secondary/50 text-foreground hover:bg-secondary"
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
              </span>
            </div>

            {/* Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 space-y-4">
                    {/* Categories */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Category</p>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                              selectedCategory === category
                                ? "bg-foreground text-background"
                                : "bg-secondary/50 text-foreground hover:bg-secondary"
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Price Range</p>
                      <div className="flex flex-wrap gap-2">
                        {priceRanges.map((range, index) => (
                          <button
                            key={range.label}
                            onClick={() => setSelectedPriceRange(index)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                              selectedPriceRange === index
                                ? "bg-foreground text-background"
                                : "bg-secondary/50 text-foreground hover:bg-secondary"
                            }`}
                          >
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search Results */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-foreground font-medium mb-2">No products found</p>
                <p className="text-muted-foreground text-sm">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="group cursor-pointer"
                    >
                      {/* Image */}
                      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary/30 mb-3">
                        {product.badge && (
                          <span className="absolute top-2 left-2 z-10 bg-coral text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                            {product.badge}
                          </span>
                        )}
                        <motion.button
                          className={`absolute top-2 right-2 z-10 rounded-full p-1.5 transition-all ${
                            isInWishlist(product.id)
                              ? "bg-coral text-white"
                              : "bg-white/80 text-muted-foreground hover:bg-coral hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id, product.name);
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart
                            className={`h-3.5 w-3.5 ${
                              isInWishlist(product.id) ? "fill-current" : ""
                            }`}
                          />
                        </motion.button>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        {/* Quick Add */}
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-all flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="bg-white text-foreground text-xs font-medium px-4 py-2 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-all hover:bg-coral hover:text-white"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="space-y-1">
                        <h4 className="font-medium text-foreground text-sm truncate group-hover:text-coral transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-xs text-muted-foreground truncate">
                          {product.description}
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="font-bold text-foreground">
                            ${product.price.toLocaleString()}
                          </span>
                          <span className="text-xs text-muted-foreground line-through">
                            ${product.originalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
