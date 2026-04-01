import { useEffect, useMemo, useState } from "react";
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
import type { Product } from "@/data/products";
import { useSeo } from "@/hooks/useSeo";
import { useGetProductDetailQuery, useGetProductListQuery } from "@/store/services/productApi";
import { mapApiProductToProduct } from "@/types/product";
import type { ReviewsSectionProps } from "@/components/product-detail/ReviewsSection";
import { Skeleton } from "@/components/ui/skeleton";

/** MongoDB ObjectId is 24 hex characters; otherwise treat as slug */
function isMongoId(value: string): boolean {
  return /^[a-f0-9]{24}$/i.test(value);
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const fromLocal = useMemo(
    () =>
      id
        ? products.find(
            (p) => p.id === id || String(p.id) === id || p.slug === id
          )
        : undefined,
    [id]
  );

  const productIdFromUrl = id ?? "";
  const isSlug = !!productIdFromUrl && !isMongoId(productIdFromUrl);

  const { data: listResponse, isLoading: isLoadingList } = useGetProductListQuery(
    { page: 1, limit: 500, category: "purse" },
    { skip: !isSlug || !!fromLocal || !id }
  );

  const resolvedProductId = useMemo(() => {
    if (!isSlug || !id) return productIdFromUrl;
    const found = listResponse?.data?.find((p) => p.slug === id || p._id === id);
    return found?._id ?? "";
  }, [isSlug, id, productIdFromUrl, listResponse?.data]);

  const shouldFetchDetail = !!resolvedProductId && !fromLocal;
  const slugResolvedButNotFound = isSlug && listResponse != null && !resolvedProductId;

  const {
    data: detailResponse,
    isLoading: isLoadingDetail,
    isError: isDetailError,
    isSuccess: isDetailSuccess,
  } = useGetProductDetailQuery(
    { id: resolvedProductId, reviewPage: 1, reviewLimit: 10 },
    { skip: !shouldFetchDetail }
  );

  const fromApi = useMemo(() => {
    if (!detailResponse?.data) return null;
    return mapApiProductToProduct(detailResponse.data);
  }, [detailResponse?.data]);

  const product: Product | undefined = fromLocal ?? fromApi ?? undefined;

  useSeo(
    product ? product.name : "Product",
    product
      ? `${product.description} Shop ${product.name} at Purse.`
      : undefined
  );

  useEffect(() => {
    if (!id || id.trim() === "") {
      navigate("/purses", { replace: true });
      return;
    }
    if (fromLocal) return;
    if (slugResolvedButNotFound) {
      navigate("/purses", { replace: true });
      return;
    }
    if (isSlug && isLoadingList) return;
    if (isLoadingDetail) return;
    if (isDetailError) {
      navigate("/purses", { replace: true });
      return;
    }
    if (isDetailSuccess && !detailResponse?.data) {
      navigate("/purses", { replace: true });
      return;
    }
  }, [id, fromLocal, slugResolvedButNotFound, isSlug, isLoadingList, isLoadingDetail, isDetailSuccess, detailResponse, isDetailError, navigate]);

  // Selected color index is always defined so hooks order stays stable.
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  // Reset selected color when product identity changes.
  // Prefer the variant that has default: true, else index 0.
  useEffect(() => {
    const variants = detailResponse?.data?.colorVariants ?? [];
    if (variants.length === 0) {
      setSelectedColorIndex(0);
      return;
    }
    const defaultIndex = variants.findIndex((v: any) => v?.default === true);
    setSelectedColorIndex(defaultIndex >= 0 ? defaultIndex : 0);
  }, [resolvedProductId, detailResponse?.data?.colorVariants]);

  // When a product has multiple colors, preload other color images in the background
  // so switching colors feels instant (images are already cached).
  useEffect(() => {
    const variants = detailResponse?.data?.colorVariants ?? [];
    if (variants.length <= 1) return;
    variants.forEach((variant) => {
      (variant.images ?? []).forEach((src) => {
        if (!src) return;
        const img = new Image();
        img.src = src;
      });
    });
  }, [detailResponse?.data?.colorVariants]);

  const isLoading = (isSlug && isLoadingList) || isLoadingDetail;

  if (!product) {
    if (id && !fromLocal && isLoading) {
      return (
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="container mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row gap-8">
              <Skeleton className="h-[400px] md:h-[500px] flex-1 rounded-2xl" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-8 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-1/2 rounded-md" />
                <Skeleton className="h-10 w-32 rounded-full mt-6" />
                <div className="flex gap-2 mt-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </div>
            </div>
          </main>
        </div>
      );
    }
    return null;
  }

  const variants = detailResponse?.data?.colorVariants ?? [];
  const currentVariant =
    variants.length > 0
      ? variants[selectedColorIndex] ?? variants[0]
      : undefined;

  // Show only the current color's images when variants exist.
  // Fallback: product-level images or product.image.
  const galleryImages =
    (currentVariant?.images && currentVariant.images.length > 0
      ? currentVariant.images
      : detailResponse?.data?.images && detailResponse.data.images.length > 0
        ? detailResponse.data.images
        : [product.image]);

  const selectedImageUrl = galleryImages[0] ?? product.image;

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />

      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Product Section */}
        <section className="py-6 sm:py-10 lg:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Left: Image Gallery */}
            <ProductImageGallery images={galleryImages} productName={product.name} />

            {/* Right: Product Info */}
            <ProductInfo
              product={product}
              selectedColorIndex={selectedColorIndex}
              onSelectedColorIndexChange={setSelectedColorIndex}
              selectedImageUrl={selectedImageUrl}
              fullDescription={detailResponse?.data?.description}
            />
          </div>
        </section>

        {/* Rating & Reviews: only show when there are real reviews */}
        {(detailResponse?.data?.numberOfReviews ?? 0) > 0 && (
          <>
            <div className="border-t border-border">
              <RatingBreakdown
                rating={product.rating}
                totalReviews={detailResponse?.data?.numberOfReviews ?? 0}
                starBreakdown={detailResponse?.data?.starBreakdown}
              />
            </div>
            <div className="border-t border-border">
              <ReviewsSection apiReviews={(detailResponse?.reviews ?? undefined) as ReviewsSectionProps["apiReviews"]} />
            </div>
          </>
        )}

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
