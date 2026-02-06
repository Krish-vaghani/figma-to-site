import { useState, useMemo } from "react";
import { Menu, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ShopHeader from "@/components/shop/ShopHeader";
import ShopFilters from "@/components/shop/ShopFilters";
import ActiveFilters from "@/components/shop/ActiveFilters";
import ShopProductCard from "@/components/shop/ShopProductCard";
import ShopPagination from "@/components/shop/ShopPagination";
import SortDropdown from "@/components/shop/SortDropdown";
import ProductQuickView from "@/components/ProductQuickView";
import { products, type Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { shopBackground } from "@/lib/assetUrls";


const PRODUCTS_PER_PAGE = 12;

const Purses = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
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

  // For demo purposes, we'll repeat the products to show pagination
  const allProducts = useMemo(() => {
    const repeated = [];
    for (let i = 0; i < 5; i++) {
      repeated.push(...products.map((p) => ({ ...p, id: p.id + i * 100 })));
    }
    return repeated;
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Apply price filter
    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Apply rating filter
    if (filters.ratings.length > 0) {
      result = result.filter((p) =>
        filters.ratings.some((r) => Math.floor(p.rating) >= r)
      );
    }

    // Sort
    switch (sortBy) {
      case "newest":
        result = result.reverse();
        break;
      case "price-low":
        result = result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [allProducts, filters, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

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
            {/* Toolbar: Filters, Sort & Product Count */}
            <div className="mb-6 bg-muted/30 rounded-2xl p-4 border border-border/40">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Left side: Filter button + Sort */}
                <div className="flex items-center gap-3">
                  {/* Mobile/Tablet Filter Button */}
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
                    <SheetContent side="left" className="w-80 overflow-y-auto bg-background">
                      <div className="pt-6">{FiltersContent}</div>
                    </SheetContent>
                  </Sheet>

                  <SortDropdown value={sortBy} onChange={setSortBy} />
                </div>

                {/* Right side: Product count */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Showing</span>
                  <span className="bg-coral/10 text-coral font-semibold px-3 py-1 rounded-full">
                    {filteredProducts.length}
                  </span>
                  <span className="text-muted-foreground">Products</span>
                </div>
              </div>
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
              {paginatedProducts.map((product) => (
                <ShopProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
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
