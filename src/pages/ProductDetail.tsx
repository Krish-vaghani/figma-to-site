import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ProductImageGallery from "@/components/product-detail/ProductImageGallery";
import ProductInfo from "@/components/product-detail/ProductInfo";
import RatingBreakdown from "@/components/product-detail/RatingBreakdown";
import ReviewsSection from "@/components/product-detail/ReviewsSection";
import RelatedProducts from "@/components/product-detail/RelatedProducts";
import ScrollReveal from "@/components/ScrollReveal";
import { products } from "@/data/products";
import { useSeo } from "@/hooks/useSeo";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  useSeo(
    product ? product.name : "Product",
    product ? `${product.description} Shop ${product.name} at Purse.` : undefined
  );

  useEffect(() => {
    if (!product) navigate("/purses");
  }, [product, navigate]);

  if (!product) return null;

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />

      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Product Section */}
        <section className="py-6 sm:py-10 lg:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <ScrollReveal variant="fadeLeft" duration={0.6}>
              <ProductImageGallery
                images={[product.image]}
                productName={product.name}
              />
            </ScrollReveal>

            <ScrollReveal variant="fadeRight" duration={0.6} delay={0.15}>
              <ProductInfo product={product} />
            </ScrollReveal>
          </div>
        </section>

        {/* Rating Breakdown */}
        <ScrollReveal variant="fadeUp" duration={0.5} delay={0.1}>
          <div className="border-t border-border">
            <RatingBreakdown rating={product.rating} totalReviews={78} />
          </div>
        </ScrollReveal>

        {/* Reviews */}
        <ScrollReveal variant="fadeUp" duration={0.5} delay={0.1}>
          <div className="border-t border-border">
            <ReviewsSection />
          </div>
        </ScrollReveal>

        {/* Related Products */}
        <ScrollReveal variant="fadeUp" duration={0.5} delay={0.1}>
          <div className="border-t border-border">
            <RelatedProducts currentProductId={product.id as number} />
          </div>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
