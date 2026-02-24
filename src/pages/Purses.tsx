import { useState, useMemo, useRef, useEffect } from "react";
import { Menu } from "lucide-react";
import { toast } from "@/lib/toast";
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

import { useGetProductListQuery } from "@/store/services/productApi";
import { mapApiProductToProduct } from "@/types/product";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { shopBackground } from "@/lib/assetUrls";

const PRODUCTS_PER_PAGE = 12;
const PURSE_CATEGORY = "purse";
/** Fetch enough for frontend filtering (all filters applied client-side) */
const FETCH_LIMIT = 500;

const Purses = () => {
  useSeo("Shop Purses & Handbags", "Shop premium designer handbags, totes, clutches and crossbody bags. Free shipping on orders over ₹1,000.");
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");
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
    page: 1,
    limit: FETCH_LIMIT,
    category: PURSE_CATEGORY,
  });

  const allMappedProducts = useMemo(
    () => (listResponse?.data ?? []).map(mapApiProductToProduct),
    [listResponse?.data]
  );

  const filteredProducts = useMemo(() => {
    let result = [...allMappedProducts];

    if (filters.categories.length > 0) {
      result = result.filter((p) => p.category && filters.categories.includes(p.category));
    }
    if (filters.materials.length > 0) {
      result = result.filter((p) => p.material && filters.materials.includes(p.material));
    }
    if (filters.occasions.length > 0) {
      result = result.filter((p) => p.occasion && filters.occasions.includes(p.occasion));
    }
    if (filters.collections.length > 0) {
      result = result.filter(
        (p) => p.collections?.some((c) => filters.collections.includes(c))
      );
    }
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );
    if (filters.ratings.length > 0) {
      result = result.filter((p) =>
        filters.ratings.some((r) => Math.floor(p.rating) >= r)
      );
    }

    switch (sortBy) {
      case "newest":
        return [...result].reverse();
      case "price-low":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...result].sort((a, b) => b.price - a.price);
      case "rating":
        return [...result].sort((a, b) => b.rating - a.rating);
      default:
        return result;
    }
  }, [allMappedProducts, filters, sortBy]);

  const totalFiltered = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / PRODUCTS_PER_PAGE));
  const paginatedProducts = useMemo(
    () =>
      filteredProducts.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
      ),
    [filteredProducts, currentPage]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages >= 1) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (isError) {
      toast.product.loadError();
    }
  }, [isError]);

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
    if (type === "priceRange") {
      setFilters((prev) => ({ ...prev, priceRange: [0, 10000] }));
      return;
    }
    if (type === "ratings") {
      const num = Number(value);
      if (!Number.isNaN(num)) {
        setFilters((prev) => ({
          ...prev,
          ratings: prev.ratings.filter((r) => r !== num),
        }));
      }
      return;
    }
    setFilters((prev) => ({
      ...prev,
      [type]: (prev[type as keyof typeof prev] as string[]).filter(
        (v) => String(v) !== value
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

                {/* Right side: Product count + Bags Found (extra spacing between them) */}
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Showing</span>
                    <span className="bg-coral/10 text-coral font-semibold px-3 py-1 rounded-full">
                      {paginatedProducts.length}
                    </span>
                    <span className="text-muted-foreground">of {totalFiltered} Products</span>
                  </div>
                  <p className="text-sm text-muted-foreground text-right leading-tight">
                    <span className="block">
                      <span className="font-semibold text-foreground">
                        {totalFiltered}
                      </span>{" "}
                      Bags Found
                    </span>
                  </p>
                </div>
              </div>

              {/* Mobile: count below */}
              <p className="mt-3 sm:hidden text-sm text-muted-foreground leading-tight">
                <span className="block">Showing {paginatedProducts.length} of {totalFiltered}</span>
                <span className="block mt-2">
                  <span className="font-semibold text-foreground">
                    {totalFiltered}
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

    </div>
  );
};

export default Purses;
	