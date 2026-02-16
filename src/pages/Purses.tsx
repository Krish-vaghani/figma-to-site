import { useState, useMemo, useRef, useEffect } from "react";
import { Menu } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useSeo } from "@/hooks/useSeo";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ShopHeader from "@/components/shop/ShopHeader";
import ShopFilters from "@/components/shop/ShopFilters";
import ActiveFilters from "@/components/shop/ActiveFilters";
import ShopProductCard from "@/components/shop/ShopProductCard";
import ShopPagination from "@/components/shop/ShopPagination";
import SortDropdown from "@/components/shop/SortDropdown";
import ProductQuickView from "@/components/ProductQuickView";
import { useGetProductListQuery } from "@/store/services/productApi";
import { mapApiProductToProduct } from "@/types/product";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { shopBackground } from "@/lib/assetUrls";

const PRODUCTS_PER_PAGE = 12;
const PURSE_CATEGORY = "purse";

const Purses = () => {
  useSeo("Shop Purses & Handbags", "Shop premium designer handbags, totes, clutches and crossbody bags. Free shipping on orders over $100.");
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");
  const [selectedTag] = useState<string | undefined>(undefined);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    materials: [] as string[],
    occasions: [] as string[],
    priceRange: [0, 10000] as [number, number],
    ratings: [] as number[],
    collections: [] as string[],
  });

  const { data: listResponse, isLoading, isError } = useGetProductListQuery({
    page: currentPage,
    limit: PRODUCTS_PER_PAGE,
    category: PURSE_CATEGORY,
    tag: selectedTag,
  });

  const apiProducts = listResponse?.data ?? [];
  const totalFromApi = listResponse?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalFromApi / PRODUCTS_PER_PAGE));

  const mappedProducts = useMemo(
    () => apiProducts.map(mapApiProductToProduct),
    [apiProducts]
  );

  useEffect(() => {
    if (isError) {
      toast.error("Could not load products", {
        description: "Please try again later.",
      });
    }
  }, [isError]);

  const paginatedProducts = useMemo(() => {
    const result = [...mappedProducts];
    switch (sortBy) {
      case "newest":
        return result.reverse();
      case "price-low":
        return result.sort((a, b) => a.price - b.price);
      case "price-high":
        return result.sort((a, b) => b.price - a.price);
      case "rating":
        return result.sort((a, b) => b.rating - a.rating);
      default:
        return result;
    }
  }, [mappedProducts, sortBy]);

  const touchStartXRef = useRef<number | null>(null);
  const touchCurrentXRef = useRef<number | null>(null);

  const handleSheetTouchStart = (event: React.TouchEvent) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
    touchCurrentXRef.current = touchStartXRef.current;
  };

  const handleSheetTouchMove = (event: React.TouchEvent) => {
    touchCurrentXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleSheetTouchEnd = () => {
    if (
      touchStartXRef.current != null &&
      touchCurrentXRef.current != null
    ) {
      const deltaX = touchCurrentXRef.current - touchStartXRef.current;

      // For a left-side sheet, a swipe from left to right (positive delta)
      // will close the sheet on mobile.
      if (deltaX > 80) {
        setMobileFiltersOpen(false);
      }
    }

    touchStartXRef.current = null;
    touchCurrentXRef.current = null;
  };

  const handleRemoveFilter = (type: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: (prev[type as keyof typeof prev] as string[]).filter(
        (v) => v !== value
      ),
    }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      categories: [],
      materials: [],
      occasions: [],
      priceRange: [0, 10000],
      ratings: [],
      collections: [],
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const FiltersContent = (
    <ShopFilters filters={filters} onFiltersChange={setFilters} />
  );

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      {/* Header area with shared background image (Navbar + ShopHeader) */}
      <div
        className="relative overflow-hidden bg-cover bg-right sm:bg-top"
        style={{
          backgroundImage: `url(${shopBackground})`,
        }}
      >
        {/* Soft overlay for readability */}
        <div className="absolute inset-0 bg-background/50" aria-hidden="true" />

        <div className="relative z-10">
          <Navbar className="bg-transparent" />
          <ShopHeader />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8 sm:py-12">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block">{FiltersContent}</div>

          {/* Products Area */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Toggle & Header */}
            <div className="mb-6">
              {/* Mobile row: Filter (start) + Sort (end) */}
              <div className="flex items-center justify-between gap-3 sm:hidden">
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <Menu className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="w-80 overflow-y-auto"
                    onTouchStart={handleSheetTouchStart}
                    onTouchMove={handleSheetTouchMove}
                    onTouchEnd={handleSheetTouchEnd}
                  >
                    <div className="pt-6">{FiltersContent}</div>
                  </SheetContent>
                </Sheet>

                <SortDropdown value={sortBy} onChange={setSortBy} />
              </div>

              {/* Desktop/tablet row: Sort (left) + count (right) */}
              <div className="hidden sm:flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                    <SheetTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="lg:hidden rounded-full px-4 h-10 border-border/60 hover:border-coral/50 hover:bg-coral/5 transition-colors"
                      >
                        <Menu className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      side="left"
                      className="w-80 overflow-y-auto bg-background"
                      onTouchStart={handleSheetTouchStart}
                      onTouchMove={handleSheetTouchMove}
                      onTouchEnd={handleSheetTouchEnd}
                    >
                      <div className="pt-6">{FiltersContent}</div>
                    </SheetContent>
                  </Sheet>

                  <SortDropdown value={sortBy} onChange={setSortBy} />
                </div>

                {/* Right side: Product count */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Showing</span>
                  <span className="bg-coral/10 text-coral font-semibold px-3 py-1 rounded-full">
                    {paginatedProducts.length}
                  </span>
                  <span className="text-muted-foreground">of {totalFromApi} Products</span>
                </div>
                <p className="text-sm text-muted-foreground text-right leading-tight">
                  <span className="block">
                    <span className="font-semibold text-foreground">
                      {totalFromApi}
                    </span>{" "}
                    Bags Found
                  </span>
                </p>
              </div>

              {/* Mobile: count below */}
              <p className="mt-3 sm:hidden text-sm text-muted-foreground leading-tight">
                <span className="block">Showing {paginatedProducts.length} of {totalFromApi}</span>
                <span className="block">
                  <span className="font-semibold text-foreground">
                    {totalFromApi}
                  </span>{" "}
                  Bags Found
                </span>
              </p>
            </div>

            {/* Active Filters */}
            <div className="mb-6">
              <ActiveFilters
                filters={filters}
                onRemove={handleRemoveFilter}
                onClearAll={handleClearAllFilters}
              />
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {isLoading ? (
                <div className="col-span-full py-12 text-center text-muted-foreground">
                  Loading products…
                </div>
              ) : (
                paginatedProducts.length === 0 ? (
                  <div className="col-span-full py-12 text-center text-muted-foreground">
                    No products to show right now.
                  </div>
                ) : (
                paginatedProducts.map((product) => (
                  <ShopProductCard
                    key={product.id}
                    product={product}
                    onClick={() => navigate(`/product/${product.slug ?? product.id}`)}
                  />
                ))
                )
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <ShopPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>

      <Footer />

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Purses;
	