import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ProductImageGallery from "@/components/product-detail/ProductImageGallery";
import ProductInfo from "@/components/product-detail/ProductInfo";
import RatingBreakdown from "@/components/product-detail/RatingBreakdown";
import { useSeo } from "@/hooks/useSeo";
import { useGetProductReviewsQuery } from "@/store/services/productApi";
import type { Product } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Product detail (rating graph + all meta)
  const {
    data: detail,
    isLoading,
    isError,
  } = useGetProductReviewsQuery(id ?? "", {
    skip: !id,
  });

  const detailData = detail?.data;

  useSeo(
    detailData?.name ?? "Product",
    detailData
      ? `${detailData.description || detailData.shortDescription || ""} Shop ${
          detailData.name
        } at Purse.`
      : undefined
  );

  useEffect(() => {
    // Scroll to top when product changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (isLoading && !detailData) {
    return (
      <div className="min-h-screen bg-background">
        <ScrollToTop />
        <Navbar />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10">
          <p className="text-muted-foreground">Loading product…</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !detailData) {
    return (
      <div className="min-h-screen bg-background">
        <ScrollToTop />
        <Navbar />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10">
          <p className="text-muted-foreground">Product not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const primaryImage =
    (detailData.images && detailData.images[0]) || detailData.image;

  const product: Product = {
    id: detailData._id,
    name: detailData.name,
    description: detailData.shortDescription || detailData.description,
    price:
      detailData.currentPrice ?? detailData.salePrice ?? detailData.price ?? 0,
    originalPrice: detailData.originalPrice ?? detailData.price ?? 0,
    reviews: `${
      detailData.totalReviews ?? detailData.numberOfReviews ?? 0
    } Reviews`,
    rating: detailData.averageRating ?? 0,
    image: primaryImage,
    colors: detailData.colorVariants?.map((c) => c.colorCode) ?? [],
    stock: 0,
    slug: detailData.slug,
  };

  const productId = String(detailData._id);

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />

      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Product Section */}
        <section className="py-6 sm:py-10 lg:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Left: Image Gallery */}
            <ProductImageGallery
              images={detailData.images && detailData.images.length > 0 ? detailData.images : [primaryImage]}
              productName={product.name}
            />

            {/* Right: Product Info */}
            <ProductInfo product={product} />
          </div>
        </section>

        {/* Rating Breakdown (real data from product detail API) */}
        <div className="border-t border-border">
          <RatingBreakdown
            rating={detailData.averageRating ?? 0}
            totalReviews={
              detailData.totalReviews ?? detailData.numberOfReviews ?? 0
            }
            starBreakdown={detailData.starBreakdown}
          />
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
