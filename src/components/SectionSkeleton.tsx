import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface SectionSkeletonProps {
  variant?: "carousel" | "grid" | "testimonials";
  count?: number;
}

const SectionSkeleton = ({ variant = "carousel", count = 4 }: SectionSkeletonProps) => {
  if (variant === "testimonials") {
    return (
      <div className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="text-center mb-8 sm:mb-12 px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-96 max-w-full mx-auto" />
        </div>
        <div className="space-y-4 px-4">
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[320px] sm:w-[400px]">
                <Skeleton className="h-48 rounded-3xl" />
              </div>
            ))}
          </div>
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[320px] sm:w-[400px]">
                <Skeleton className="h-48 rounded-3xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="text-center mb-8 sm:mb-12 px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-96 max-w-full mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
          {Array.from({ length: count }).map((_, i) => (
            <ProductCardSkeleton key={i} variant="collection" />
          ))}
        </div>
      </div>
    );
  }

  // Carousel variant (default)
  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-background overflow-hidden">
      <div className="text-center mb-8 sm:mb-12 px-4">
        <Skeleton className="h-10 w-64 mx-auto mb-4" />
        <Skeleton className="h-5 w-96 max-w-full mx-auto" />
      </div>
      <div className="flex gap-4 sm:gap-6 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto overflow-hidden">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex-shrink-0 w-[240px] sm:w-[280px]">
            <ProductCardSkeleton variant="collection" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionSkeleton;
