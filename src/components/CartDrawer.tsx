import { ShoppingBag, X, Minus, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { ScrollArea } from "@/components/ui/scroll-area";

const CartDrawer = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart
            {cartCount > 0 && (
              <span className="bg-coral text-white text-xs font-medium px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
            <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-center">
              Your cart is empty.<br />
              Start shopping to add items!
            </p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="bg-foreground text-background px-6 py-3 rounded-full font-medium hover:bg-coral transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.color}`}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 py-4 border-b border-border last:border-0"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-24 rounded-xl overflow-hidden bg-secondary/30 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h4 className="font-semibold text-foreground truncate">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="w-4 h-4 rounded-full border border-border"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm text-muted-foreground">
                            ₹{item.price.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-border rounded-full">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.color, item.quantity - 1)
                            }
                            className="p-1.5 hover:bg-secondary/50 rounded-l-full transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.color, item.quantity + 1)
                            }
                            className="p-1.5 hover:bg-secondary/50 rounded-r-full transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.color)}
                          className="p-2 text-muted-foreground hover:text-coral transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <span className="font-bold text-foreground">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </ScrollArea>

            {/* Cart Footer */}
            <div className="border-t border-border p-6 space-y-4 bg-background">
              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-xl font-bold text-foreground">
                  ₹{cartTotal.toLocaleString()}
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <a href="/login" className="block w-full">
                  <button className="w-full bg-foreground text-background font-medium py-3.5 rounded-full hover:bg-coral transition-colors">
                    Checkout
                  </button>
                </a>
                <button
                  onClick={clearCart}
                  className="w-full border border-border text-foreground font-medium py-3 rounded-full hover:bg-secondary/50 transition-colors"
                >
                  Clear Cart
                </button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Shipping & taxes calculated at checkout
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
