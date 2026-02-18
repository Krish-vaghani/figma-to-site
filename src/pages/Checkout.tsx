import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, CheckCircle2, ShoppingBag, Truck, Plus, Home, Briefcase, MoreHorizontal, Star, Pencil } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AddressForm, { AddressFormData } from "@/components/AddressForm";
import { useCart } from "@/contexts/CartContext";
import { useOrders, DeliveryAddress } from "@/contexts/OrderContext";
import { useAddresses, SavedAddress } from "@/contexts/AddressContext";
import { shopBackground } from "@/lib/assetUrls";
import { showToast } from "@/lib/toast";

const LABEL_ICONS: Record<string, React.ElementType> = {
  Home, Office: Briefcase, Other: MoreHorizontal,
};

const PAYMENT_METHODS = [
  { value: "cod", label: "Cash on Delivery", icon: Truck },
  { value: "online", label: "Pay Online (UPI / Card)", icon: CheckCircle2 },
] as const;

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { addresses, addAddress, getDefault } = useAddresses();

  // Address selection: null = "enter new", string = saved address id
  const defaultAddr = getDefault();
  const [selectedAddressId, setSelectedAddressId] = useState<string | "new">(
    defaultAddr ? defaultAddr.id : addresses.length > 0 ? addresses[0].id : "new"
  );
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");
  const [placing, setPlacing] = useState(false);
  const [saveNewAddress, setSaveNewAddress] = useState(true);
  const [newFormData, setNewFormData] = useState<AddressFormData | null>(null);

  const shippingFee = cartTotal >= 999 ? 0 : 79;
  const grandTotal = cartTotal + shippingFee;

  const getSelectedAddress = (): DeliveryAddress | null => {
    if (selectedAddressId === "new") return newFormData as DeliveryAddress | null;
    const found = addresses.find((a) => a.id === selectedAddressId);
    return found ?? null;
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      showToast.error({ title: "Cart is empty" });
      return;
    }
    const address = getSelectedAddress();
    if (!address) {
      showToast.error({ title: "Please fill in a delivery address" });
      return;
    }
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 900));
    if (selectedAddressId === "new" && saveNewAddress && newFormData) {
      const { label, ...rest } = newFormData;
      addAddress(rest as DeliveryAddress, label);
    }
    const order = placeOrder(cart, address, paymentMethod, grandTotal);
    clearCart();
    setPlacing(false);
    navigate(`/order-success/${order.id}`);
  };

  const handleNewFormSubmit = (data: AddressFormData) => {
    setNewFormData(data);
    handlePlaceOrder();
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          <p className="text-muted-foreground text-lg">Your cart is empty.</p>
          <Link to="/purses">
            <button className="bg-foreground text-background px-6 py-3 rounded-full font-medium hover:bg-coral transition-colors">
              Shop Now
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const selectedAddr = selectedAddressId !== "new" ? addresses.find((a) => a.id === selectedAddressId) : null;

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <Navbar />

      {/* Header */}
      <div
        className="relative w-full py-8 md:py-10 flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: `url(${shopBackground})`, backgroundSize: "cover", backgroundPosition: "top left" }}
      >
        <div className="absolute inset-0 bg-background/60" />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold font-playfair text-foreground">Checkout</h1>
          <p className="text-muted-foreground text-sm mt-1">
            <Link to="/" className="hover:text-coral transition-colors">Home</Link>
            {" / "}
            <Link to="/cart" className="hover:text-coral transition-colors">Cart</Link>
            {" / "}
            <span className="text-foreground">Checkout</span>
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

          {/* LEFT */}
          <div className="space-y-6">

            {/* ── Saved Addresses ── */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-coral" /> Delivery Address
                </h2>
                <Link to="/addresses" className="text-xs text-coral hover:underline flex items-center gap-1">
                  <Pencil className="h-3 w-3" /> Manage
                </Link>
              </div>

              {/* Saved address cards */}
              {addresses.length > 0 && (
                <div className="space-y-3 mb-4">
                  {addresses.map((addr) => {
                    const LabelIcon = LABEL_ICONS[addr.label] ?? MapPin;
                    const isSelected = selectedAddressId === addr.id;
                    const parts = [addr.addressLine1, addr.city, addr.state, addr.pincode].filter(Boolean);
                    return (
                      <button
                        key={addr.id}
                        type="button"
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`w-full text-left border-2 rounded-xl p-4 transition-all ${
                          isSelected ? "border-coral bg-coral/5" : "border-border hover:border-coral/40"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Radio dot */}
                          <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                            isSelected ? "border-coral" : "border-muted-foreground"
                          }`}>
                            {isSelected && <div className="w-2 h-2 rounded-full bg-coral" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <LabelIcon className="h-3.5 w-3.5 text-foreground flex-shrink-0" />
                              <span className="text-sm font-semibold text-foreground">{addr.label}</span>
                              {addr.isDefault && (
                                <span className="text-[10px] bg-coral/10 text-coral px-2 py-0.5 rounded-full font-medium flex items-center gap-0.5">
                                  <Star className="h-2.5 w-2.5 fill-coral" /> Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm font-medium text-foreground">{addr.fullName}</p>
                            <p className="text-xs text-muted-foreground truncate">{parts.join(", ")}</p>
                            <p className="text-xs text-muted-foreground">📞 {addr.phone}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Add New toggle */}
              <button
                type="button"
                onClick={() => setSelectedAddressId("new")}
                className={`w-full text-left border-2 rounded-xl p-4 transition-all flex items-center gap-3 ${
                  selectedAddressId === "new" ? "border-coral bg-coral/5" : "border-border hover:border-coral/40 border-dashed"
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                  selectedAddressId === "new" ? "border-coral" : "border-muted-foreground"
                }`}>
                  {selectedAddressId === "new" && <div className="w-2 h-2 rounded-full bg-coral" />}
                </div>
                <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm font-medium text-muted-foreground">Use a new address</span>
              </button>

              {/* New address form (inline) */}
              {selectedAddressId === "new" && (
                <div className="mt-5 pt-5 border-t border-border">
                  <AddressForm
                    onSubmit={(data) => setNewFormData(data)}
                    submitLabel="Use This Address"
                    defaultValues={newFormData ?? undefined}
                  />
                  {newFormData && (
                    <label className="flex items-center gap-2 mt-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={saveNewAddress}
                        onChange={(e) => setSaveNewAddress(e.target.checked)}
                        className="w-4 h-4 accent-coral rounded"
                      />
                      <span className="text-sm text-muted-foreground">Save this address for future orders</span>
                    </label>
                  )}
                </div>
              )}
            </div>

            {/* ── Payment Method ── */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-coral" /> Payment Method
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                {PAYMENT_METHODS.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPaymentMethod(value)}
                    className={`flex-1 flex items-center gap-3 border-2 rounded-xl px-5 py-4 transition-all text-sm font-medium ${
                      paymentMethod === value
                        ? "border-coral bg-coral/5 text-coral"
                        : "border-border text-foreground hover:border-coral/40"
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div>
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-coral" /> Order Summary
              </h2>

              <div className="divide-y divide-border mb-4 max-h-64 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.color}`} className="flex items-center gap-3 py-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-secondary/30 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground leading-tight line-clamp-1">{item.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="w-3 h-3 rounded-full border border-border flex-shrink-0" style={{ backgroundColor: item.color }} />
                        <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-foreground flex-shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Delivery to summary */}
              {selectedAddr && (
                <div className="bg-secondary/30 rounded-xl p-3 mb-4 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground text-sm mb-0.5">📦 Delivering to:</p>
                  <p>{selectedAddr.fullName} · {selectedAddr.city}, {selectedAddr.pincode}</p>
                </div>
              )}

              <div className="space-y-2 border-t border-border pt-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className={shippingFee === 0 ? "text-[hsl(var(--toast-success))] font-medium" : ""}>
                    {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                  </span>
                </div>
                {shippingFee === 0 && (
                  <p className="text-xs text-[hsl(var(--toast-success))]">🎉 You've unlocked free shipping!</p>
                )}
                <div className="flex justify-between font-bold text-foreground text-base pt-2 border-t border-border">
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Place order — for saved address use button directly; for new form, trigger form submit */}
              {selectedAddressId !== "new" ? (
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={placing}
                  className="mt-5 w-full bg-coral text-white font-semibold py-3.5 rounded-full hover:bg-coral/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {placing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Placing Order…
                    </span>
                  ) : (
                    <><CheckCircle2 className="h-4 w-4" /> Place Order · ₹{grandTotal.toLocaleString()}</>
                  )}
                </button>
              ) : (
                <div className="mt-5 space-y-2">
                  {newFormData ? (
                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      disabled={placing}
                      className="w-full bg-coral text-white font-semibold py-3.5 rounded-full hover:bg-coral/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {placing ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Placing Order…
                        </span>
                      ) : (
                        <><CheckCircle2 className="h-4 w-4" /> Place Order · ₹{grandTotal.toLocaleString()}</>
                      )}
                    </button>
                  ) : (
                    <p className="text-center text-sm text-muted-foreground py-3">
                      Fill in the address form above first
                    </p>
                  )}
                </div>
              )}

              <p className="text-xs text-muted-foreground text-center mt-3">
                By placing this order you agree to our Terms & Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
