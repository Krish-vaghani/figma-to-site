import { motion } from "framer-motion";
import { ShoppingCart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import ScrollReveal from "./ScrollReveal";

const bundles = [
  { ids: [1, 3], label: "Day Essentials" },
  { ids: [2, 4], label: "Evening Glam" },
  { ids: [3, 6], label: "Tote & Crossbody" },
];

const BundleDealsSection = () => {
  const { addToCart } = useCart();

  const handleAddBundle = (productIds: number[]) => {
    const bundleProducts = productIds.map((id) => products.find((p) => p.id === id)!).filter(Boolean);
    if (bundleProducts.length < 2) return;

    // Sort by price, apply 20% discount to the cheaper item
    const sorted = [...bundleProducts].sort((a, b) => a.price - b.price);

    sorted.forEach((product, index) => {
      const price = index === 0 ? Math.round(product.price * 0.8) : product.price;
      addToCart({
        id: product.id,
        name: product.name,
        price,
        originalPrice: product.originalPrice,
        image: product.image,
        color: product.colors[0],
      });
    });
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 bg-coral/10 text-coral px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Limited Offer
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Bundle & Save
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Buy 2 and get <span className="text-coral font-semibold">20% off</span> the second item
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {bundles.map((bundle, index) => {
            const bundleProducts = bundle.ids.map((id) => products.find((p) => p.id === id)!).filter(Boolean);
            if (bundleProducts.length < 2) return null;

            const sorted = [...bundleProducts].sort((a, b) => a.price - b.price);
            const originalTotal = sorted.reduce((s, p) => s + p.price, 0);
            const discountedTotal = sorted.reduce(
              (s, p, i) => s + (i === 0 ? Math.round(p.price * 0.8) : p.price),
              0
            );
            const savings = originalTotal - discountedTotal;

            return (
              <motion.div
                key={bundle.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="border border-border rounded-2xl overflow-hidden bg-card"
              >
                {/* Product images side by side */}
                <div className="flex">
                  {bundleProducts.map((product) => (
                    <div key={product.id} className="w-1/2 aspect-square bg-secondary/50 relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                {/* Info */}
                <div className="p-4 sm:p-5">
                  <p className="text-xs text-coral font-semibold uppercase tracking-wide mb-1">
                    {bundle.label}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    {bundleProducts.map((p) => p.name).join(" + ")}
                  </p>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-lg font-bold text-foreground">₹{discountedTotal.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground line-through">₹{originalTotal.toLocaleString()}</span>
                    <span className="text-xs font-semibold text-coral">Save ₹{savings.toLocaleString()}</span>
                  </div>

                  <Button
                    onClick={() => handleAddBundle(bundle.ids)}
                    className="w-full rounded-full bg-foreground text-background hover:bg-coral transition-all duration-300 text-sm"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1.5" />
                    Add Bundle to Cart
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BundleDealsSection;
