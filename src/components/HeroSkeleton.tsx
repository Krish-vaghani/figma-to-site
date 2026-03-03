import { Skeleton } from "@/components/ui/skeleton";

/**
 * Matches hero section layout height so the second section doesn’t jump when hero loads.
 */
const HeroSkeleton = () => {
  return (
    <section className="relative overflow-hidden" aria-label="Hero loading">
      {/* Mobile: same vertical rhythm as HeroSection */}
      <div className="relative z-10 lg:hidden">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <Skeleton className="h-4 w-32 mx-auto" />
            <Skeleton className="h-9 w-64 mx-auto" />
            <Skeleton className="h-4 w-72 max-w-full mx-auto" />
            <div className="flex justify-center gap-3 pt-2">
              <Skeleton className="h-10 w-24 rounded-full" />
              <Skeleton className="h-10 w-24 rounded-full" />
            </div>
          </div>
          <div className="mt-6 relative pb-16">
            <Skeleton className="w-full aspect-[4/5] rounded-3xl" />
            <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-10 px-4">
              <Skeleton className="h-24 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: min-h-[700px] + pb-20 to match HeroSection */}
      <div className="relative z-10 hidden lg:block min-h-[700px] pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20 items-center max-w-7xl mx-auto">
            <div className="space-y-6">
              <Skeleton className="h-10 w-40 rounded-full" />
              <Skeleton className="h-8 w-72" />
              <Skeleton className="h-16 w-96 max-w-full" />
              <Skeleton className="h-6 w-full max-w-xl" />
              <div className="flex gap-4 pt-4">
                <Skeleton className="h-14 w-44 rounded-full" />
                <Skeleton className="h-14 w-36 rounded-full" />
              </div>
            </div>
            <div className="relative flex justify-end">
              <Skeleton className="w-full max-w-lg h-[560px] xl:h-[600px] rounded-3xl" />
              <Skeleton className="absolute -bottom-16 left-4 right-4 h-24 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
