import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { X, Minus, Plus, Star, Heart, SlidersHorizontal } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { shopBackground } from "@/lib/assetUrls";
import { toast } from "@/lib/toast";

type SortOption = "newest" | "price-low" | "price-high";

const sortLabels: Record<SortOption, string> = {
  newest: "Newest First",
  "price-low": "Price: Low To High",
  "price-high": "Price: High To Low",
};

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [activeSort, setActiveSort] = useState<SortOption | null>(null);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const wishlistProducts = useMemo(() => {
    let items = products.filter((p) => wishlist.includes(p.id) || wishlist.includes(String(p.id)));
    if (activeSort === "price-low") items = [...items].sort((a, b) => a.price - b.price);
    if (activeSort === "price-high") items = [...items].sort((a, b) => b.price - a.price);
    return items;
  }, [wishlist, activeSort]);

  const getQty = (id: number | string) => quantities[String(id)] || 1;
  const setQty = (id: number | string, q: number) =>
    setQuantities((prev) => ({ ...prev, [String(id)]: Math.max(1, q) }));

  const subtotal = wishlistProducts.reduce((sum, p) => sum + p.price * getQty(p.id), 0);

  const selectSort = (s: SortOption) => {
    setActiveSort((prev) => (prev === s ? null : s));
    setSortDropdownOpen(false);
  };

  const handleAddToCart = (product: (typeof products)[0]) => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        color: product.colors[0] || "#000",
      },
      getQty(product.id)
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div
        className="relative w-full py-8 md:py-10 flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: `url(${shopBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "top left",
        }}
      >
        <div className="absolute inset-0 bg-background/60" />
        <div className="relative z-10 flex flex-col gap-0.5">
          <h1 className="text-3xl md:text-4xl font-bold font-playfair text-foreground">My Wishlist</h1>
          <p className="text-muted-foreground">
            <Link to="/" className="hover:text-coral transition-colors">Home</Link>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-center">Your wishlist is empty.</p>
            <Link to="/purses">
              <button className="bg-foreground text-background px-6 py-3 rounded-full font-medium hover:bg-coral transition-colors">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-foreground">
                {wishlistProducts.length} Items Saved
              </h2>
              <div className="relative flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Sort By :</span>
                <button
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                  className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 text-sm"
                >
                  {activeSort ? sortLabels[activeSort] : "Featured"}
                  <SlidersHorizontal className="h-4 w-4" />
                </button>
                {sortDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-background border border-border rounded-lg shadow-lg z-10 py-1 min-w-[180px]">
                    {(Object.keys(sortLabels) as SortOption[]).map((s) => (
                      <button
                        key={s}
                        onClick={() => selectSort(s)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary/50 transition-colors ${activeSort === s ? "bg-secondary/50 font-medium" : ""}`}
                      >
                        {sortLabels[s]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Active Filter (single) */}
            {activeSort && (
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-sm font-medium text-foreground">Active Filter</span>
                <button
                  onClick={() => setActiveSort(null)}
                  className="flex items-center gap-2 bg-coral text-white px-4 py-1.5 rounded-full text-sm font-medium"
                >
                  {sortLabels[activeSort]} <X className="h-3 w-3" />
                </button>
                <button onClick={() => setActiveSort(null)} className="text-coral text-sm font-medium hover:underline">
                  Clear
                </button>
              </div>
            )}

            {/* Table Header - Desktop */}
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center border-b border-border pb-3 mb-2 text-sm font-medium text-muted-foreground">
              <span>Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-center">Price</span>
              <span className="text-center">Total</span>
              <span className="w-10 text-center">Delete</span>
            </div>

            {/* Product Rows */}
            <div className="divide-y divide-border">
              {wishlistProducts.map((product) => {
                const qty = getQty(product.id);
                return (
                  <div key={product.id}>
                    {/* Desktop Row */}
                    <div className="hidden md:grid py-5 grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center">
                      <div className="flex items-center gap-4">
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-secondary/30 flex-shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          <div className="absolute top-1 left-1 w-6 h-6 rounded-full bg-coral/80 flex items-center justify-center">
                            <Heart className="h-3 w-3 text-white fill-white" />
                          </div>
                        </div>
                        <div className="min-w-0 flex flex-col gap-0.5 [&_h3]:m-0 [&_p]:m-0">
                          <h3 className="font-semibold text-foreground leading-tight">{product.name}</h3>
                          <p className="text-xs text-muted-foreground leading-tight">{product.description}</p>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">Color :</span>
                            {product.colors.map((c) => (
                              <span key={c} className="w-3.5 h-3.5 rounded-full border border-border" style={{ backgroundColor: c }} />
                            ))}
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">Review :</span>
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs text-muted-foreground">{product.rating}({product.reviews})</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="flex items-center border border-border rounded-lg overflow-hidden">
                          <button onClick={() => setQty(product.id, qty - 1)} className="px-3 py-2 hover:bg-secondary/50 transition-colors text-muted-foreground"><Minus className="h-3 w-3" /></button>
                          <span className="w-10 text-center text-sm font-medium">{String(qty).padStart(2, "0")}</span>
                          <button onClick={() => setQty(product.id, qty + 1)} className="px-3 py-2 hover:bg-secondary/50 transition-colors text-muted-foreground"><Plus className="h-3 w-3" /></button>
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="font-semibold text-foreground">₹{product.price.toLocaleString()}</span>{" "}
                        <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                      </div>
                      <div className="text-center font-semibold text-foreground">₹{(product.price * qty).toLocaleString()}</div>
                      <div className="flex justify-center">
                        <button onClick={() => removeFromWishlist(product.id)} className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:border-coral hover:text-coral transition-colors text-muted-foreground">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Mobile Card */}
                    <div className="md:hidden py-4 flex gap-3">
                      <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden bg-secondary/30 flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-coral/80 flex items-center justify-center">
                          <Heart className="h-2.5 w-2.5 text-white fill-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col gap-0.5 [&_h3]:m-0 [&_p]:m-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-foreground text-sm leading-tight m-0">{product.name}</h3>
                          <button onClick={() => removeFromWishlist(product.id)} className="flex-shrink-0 w-7 h-7 rounded-md border border-border flex items-center justify-center text-muted-foreground">
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-tight m-0">{product.description}</p>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                            Colour : {product.colors.map((c) => (
                              <span key={c} className="w-3 h-3 rounded-full border border-border" style={{ backgroundColor: c }} />
                            ))}
                          </span>
                          <span className="text-[11px] text-muted-foreground flex items-center gap-0.5">
                            Review : <Star className="h-2.5 w-2.5 text-yellow-400 fill-yellow-400" /> {product.rating}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-0.5">
                          <div className="flex items-center border border-border rounded-md overflow-hidden">
                            <button onClick={() => setQty(product.id, qty - 1)} className="px-2 py-1 text-muted-foreground"><Minus className="h-3 w-3" /></button>
                            <span className="w-7 text-center text-xs font-medium">{String(qty).padStart(2, "0")}</span>
                            <button onClick={() => setQty(product.id, qty + 1)} className="px-2 py-1 text-muted-foreground"><Plus className="h-3 w-3" /></button>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-foreground text-sm">₹{(product.price * qty).toLocaleString()}</span>
                            {product.originalPrice > product.price && (
                              <span className="ml-1 text-[11px] text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8 pt-6 border-t border-border">
              <h3 className="text-xl font-bold text-foreground">
                Sub Total : ₹{subtotal.toLocaleString()}
              </h3>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <Link to="/purses" className="flex-1 sm:flex-initial min-w-0">
                  <button className="w-full sm:w-auto border border-border text-foreground font-medium text-sm sm:text-base px-4 py-2.5 sm:px-6 sm:py-3 rounded-full hover:bg-secondary/50 transition-colors">
                    Back To Shop
                  </button>
                </Link>
                <button
                  onClick={() => {
                    wishlistProducts.forEach((p) => handleAddToCart(p));
                    toast.cart.added("All wishlist items");
                  }}
                  className="flex-1 sm:flex-initial min-w-0 w-full sm:w-auto bg-coral text-white font-medium text-sm sm:text-base px-4 py-2.5 sm:px-8 sm:py-3 rounded-full hover:bg-coral/90 transition-colors"
                >
                  Add All To Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
