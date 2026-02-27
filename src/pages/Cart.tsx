import { Link } from "react-router-dom";
import { X, Minus, Plus, Star, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { shopBackground } from "@/lib/assetUrls";
import { normalizeRating } from "@/lib/utils";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  const getProduct = (id: number | string) => products.find((p) => p.id === id || String(p.id) === String(id));

  return (
    <div className="min-h-screen bg-background">
      {/* Header area with background from top (Navbar + title) */}
      <div
        className="relative w-full overflow-hidden bg-cover bg-left-top sm:bg-center"
        style={{
          backgroundImage: `url(${shopBackground})`,
        }}
      >
        <div className="absolute inset-0 bg-background/60" aria-hidden="true" />
        <div className="relative z-10">
          <Navbar className="bg-transparent" />
          <div className="w-full py-8 md:py-10 flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-playfair text-foreground">My Cart</h1>
            <p className="text-muted-foreground">
              <Link to="/" className="hover:text-coral transition-colors">Home</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-center">Your cart is empty.</p>
            <Link to="/purses">
              <button className="bg-foreground text-background px-6 py-3 rounded-full font-medium hover:bg-coral transition-colors">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">
                {cart.length} Items In Cart
              </h2>
            </div>

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
              {cart.map((item) => {
                const product = getProduct(item.id);
                const displayRating = product ? normalizeRating(product.rating) : null;
                return (
                  <div key={`${item.id}-${item.color}`}>
                    {/* Desktop Row */}
                    <div className="hidden md:grid py-5 grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-24 rounded-xl overflow-hidden bg-secondary/30 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0 flex flex-col gap-0.5 [&_h3]:m-0 [&_p]:m-0">
                          <h3 className="font-semibold text-foreground leading-tight">{item.name}</h3>
                          {product && <p className="text-xs text-muted-foreground leading-tight">{product.description}</p>}
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">Color :</span>
                            <span className="w-3.5 h-3.5 rounded-full border border-border" style={{ backgroundColor: item.color }} />
                          </div>
                          {product && (
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-muted-foreground">Review :</span>
                              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                              <span className="text-xs text-muted-foreground">
                                {displayRating != null ? displayRating.toFixed(1) : product.rating}
                                ({product.reviews})
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="flex items-center border border-border rounded-lg overflow-hidden">
                          <button onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)} className="px-3 py-2 hover:bg-secondary/50 transition-colors text-muted-foreground"><Minus className="h-3 w-3" /></button>
                          <span className="w-10 text-center text-sm font-medium">{String(item.quantity).padStart(2, "0")}</span>
                          <button onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)} className="px-3 py-2 hover:bg-secondary/50 transition-colors text-muted-foreground"><Plus className="h-3 w-3" /></button>
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="font-semibold text-foreground">₹{item.price.toLocaleString()}</span>{" "}
                        <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice.toLocaleString()}</span>
                      </div>
                      <div className="text-center font-semibold text-foreground">₹{(item.price * item.quantity).toLocaleString()}</div>
                      <div className="flex justify-center">
                        <button onClick={() => removeFromCart(item.id, item.color)} className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:border-coral hover:text-coral transition-colors text-muted-foreground">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Mobile Card */}
                    <div className="md:hidden py-4 flex gap-3">
                      <div className="w-[72px] h-[72px] rounded-xl overflow-hidden bg-secondary/30 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col gap-0.5 [&_h3]:m-0 [&_p]:m-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-foreground text-sm leading-tight m-0">{item.name}</h3>
                          <button onClick={() => removeFromCart(item.id, item.color)} className="flex-shrink-0 w-7 h-7 rounded-md border border-border flex items-center justify-center text-muted-foreground">
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                        {product && <p className="text-[11px] text-muted-foreground leading-tight m-0">{product.description}</p>}
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                            Colour : <span className="w-3 h-3 rounded-full border border-border" style={{ backgroundColor: item.color }} />
                          </span>
                          {product && (
                            <span className="text-[11px] text-muted-foreground flex items-center gap-0.5">
                              Review : <Star className="h-2.5 w-2.5 text-yellow-400 fill-yellow-400" />{" "}
                              {displayRating != null ? displayRating.toFixed(1) : product.rating}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-0.5">
                          <div className="flex items-center border border-border rounded-md overflow-hidden">
                            <button onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)} className="px-2 py-1 text-muted-foreground"><Minus className="h-3 w-3" /></button>
                            <span className="w-7 text-center text-xs font-medium">{String(item.quantity).padStart(2, "0")}</span>
                            <button onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)} className="px-2 py-1 text-muted-foreground"><Plus className="h-3 w-3" /></button>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-foreground text-sm">₹{(item.price * item.quantity).toLocaleString()}</span>
                            <span className="ml-1 text-[11px] text-muted-foreground line-through">₹{item.originalPrice.toLocaleString()}</span>
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
                Sub Total : ₹{cartTotal.toLocaleString()}
              </h3>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <Link to="/purses" className="flex-1 sm:flex-initial min-w-0">
                  <button className="w-full sm:w-auto border border-border text-foreground font-medium text-sm sm:text-base px-4 py-2.5 sm:px-6 sm:py-3 rounded-full hover:bg-secondary/50 transition-colors">
                    Back To Shop
                  </button>
                </Link>
                <Link to="/checkout" className="flex-1 sm:flex-initial min-w-0">
                  <button className="w-full sm:w-auto bg-coral text-white font-medium text-sm sm:text-base px-4 py-2.5 sm:px-8 sm:py-3 rounded-full hover:bg-coral/90 transition-colors">
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
