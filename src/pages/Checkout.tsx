import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, User, Home, Landmark, CheckCircle2, ShoppingBag, Truck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useOrders, DeliveryAddress } from "@/contexts/OrderContext";
import { shopBackground } from "@/lib/assetUrls";
import { showToast } from "@/lib/toast";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry",
];

const addressSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().trim().email("Enter a valid email address").max(255),
  addressLine1: z.string().trim().min(5, "Address must be at least 5 characters").max(200),
  addressLine2: z.string().trim().max(200).optional().transform((v) => v ?? ""),
  city: z.string().trim().min(2, "Enter a valid city").max(100),
  state: z.string().trim().min(2, "Select a state"),
  pincode: z.string().trim().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  landmark: z.string().trim().max(100).optional().transform((v) => v ?? ""),
});

type AddressFormData = z.infer<typeof addressSchema>;

const PAYMENT_METHODS = [
  { value: "cod", label: "Cash on Delivery", icon: Truck },
  { value: "online", label: "Pay Online (UPI / Card)", icon: CheckCircle2 },
] as const;

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");
  const [placing, setPlacing] = useState(false);

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: "", phone: "", email: "", addressLine1: "",
      addressLine2: "", city: "", state: "", pincode: "", landmark: "",
    },
  });

  const shippingFee = cartTotal >= 999 ? 0 : 79;
  const grandTotal = cartTotal + shippingFee;

  const onSubmit = async (data: AddressFormData) => {
    if (cart.length === 0) {
      showToast.error({ title: "Cart is empty", description: "Please add items before checkout." });
      return;
    }
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 900));
    const order = placeOrder(cart, data as DeliveryAddress, paymentMethod, grandTotal);
    clearCart();
    setPlacing(false);
    navigate(`/order-success/${order.id}`);
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

            {/* LEFT: Delivery Address */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-coral" /> Delivery Address
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Priya Sharma" className="pl-9" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* Phone */}
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="9876543210" maxLength={10} className="pl-9" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* Email */}
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="priya@example.com" type="email" className="pl-9" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* Address Line 1 */}
                  <FormField control={form.control} name="addressLine1" render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Address Line 1 *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="House No., Street, Area" className="pl-9" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* Address Line 2 */}
                  <FormField control={form.control} name="addressLine2" render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Address Line 2 <span className="text-muted-foreground font-normal">(Optional)</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Apartment, Floor, Building" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* Pincode */}
                  <FormField control={form.control} name="pincode" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pincode *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="400001" maxLength={6} className="pl-9" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* City */}
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                      <FormLabel>City *</FormLabel>
                      <FormControl>
                        <Input placeholder="Mumbai" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* State */}
                  <FormField control={form.control} name="state" render={({ field }) => (
                    <FormItem>
                      <FormLabel>State *</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-foreground"
                        >
                          <option value="">Select State</option>
                          {INDIAN_STATES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* Landmark */}
                  <FormField control={form.control} name="landmark" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Landmark <span className="text-muted-foreground font-normal">(Optional)</span></FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Near metro station" className="pl-9" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </div>

              {/* Payment Method */}
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
            <div className="space-y-4">
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

                <button
                  type="submit"
                  disabled={placing}
                  className="mt-5 w-full bg-coral text-white font-semibold py-3.5 rounded-full hover:bg-coral/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {placing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Placing Order…
                    </span>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Place Order · ₹{grandTotal.toLocaleString()}
                    </>
                  )}
                </button>

                <p className="text-xs text-muted-foreground text-center mt-3">
                  By placing this order you agree to our Terms & Conditions.
                </p>
              </div>
            </div>
          </form>
        </Form>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
