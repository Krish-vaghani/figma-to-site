import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ProductImageGallery from "@/components/product-detail/ProductImageGallery";
import ProductInfo from "@/components/product-detail/ProductInfo";
import RatingBreakdown from "@/components/product-detail/RatingBreakdown";
import ReviewsSection from "@/components/product-detail/ReviewsSection";
import RelatedProducts from "@/components/product-detail/RelatedProducts";
import { products } from "@/data/products";
import { heroBackground } from "@/lib/assetUrls";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    navigate("/purses");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />

      {/* Header with background */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "auto 100%",
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Navbar className="bg-transparent" />
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Product Section */}
        <section className="py-6 sm:py-10 lg:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Left: Image Gallery */}
            <ProductImageGallery
              images={[product.image]}
              productName={product.name}
            />

            {/* Right: Product Info */}
            <ProductInfo product={product} />
          </div>
        </section>

        {/* Rating Breakdown */}
        <div className="border-t border-border">
          <RatingBreakdown rating={product.rating} totalReviews={78} />
        </div>

        {/* Reviews */}
        <div className="border-t border-border">
          <ReviewsSection />
        </div>

        {/* Related Products */}
        <div className="border-t border-border">
          <RelatedProducts currentProductId={product.id} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
