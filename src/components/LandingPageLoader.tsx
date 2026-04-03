import { Skeleton } from "@/components/ui/skeleton";

/**
 * Full-viewport skeleton shimmer shown while the home page preloads critical images.
 */
const LandingPageLoader = () => {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-background overflow-y-auto"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {/* Announcement bar */}
      <div className="h-9 sm:h-10 w-full shrink-0">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      {/* Hero region (matches Navbar + hero block) */}
      <div className="relative min-h-[50vh] lg:min-h-[780px] flex flex-col">
        <div className="h-14 sm:h-16 w-full px-4 flex items-center gap-6">
          <Skeleton className="h-8 w-28 rounded-md" />
          <div className="hidden md:flex gap-4 flex-1 justify-center">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex gap-2 ml-auto">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 px-4 pb-12 lg:px-8 lg:pb-20 max-w-7xl mx-auto w-full">
          <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
            <Skeleton className="h-4 w-32 mx-auto lg:mx-0" />
            <Skeleton className="h-10 sm:h-12 w-full max-w-md mx-auto lg:mx-0" />
            <Skeleton className="h-4 w-full max-w-lg mx-auto lg:mx-0" />
            <Skeleton className="h-4 w-4/5 max-w-md mx-auto lg:mx-0" />
            <div className="flex gap-3 justify-center lg:justify-start pt-2">
              <Skeleton className="h-12 w-40 rounded-full" />
              <Skeleton className="h-12 w-36 rounded-full" />
            </div>
          </div>
          <div className="w-full max-w-lg lg:max-w-xl">
            <Skeleton className="w-full aspect-[4/5] lg:h-[560px] lg:aspect-auto rounded-3xl" />
          </div>
        </div>
      </div>

      {/* Carousel strip */}
      <div className="py-10 px-4 border-t border-border/40">
        <Skeleton className="h-9 w-64 mx-auto mb-8" />
        <div className="flex gap-4 overflow-hidden max-w-7xl mx-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-[380px] w-[280px] sm:w-[320px] shrink-0 rounded-3xl"
            />
          ))}
        </div>
      </div>

      {/* Second section block */}
      <div className="py-10 px-4 bg-muted/20">
        <Skeleton className="h-9 w-56 mx-auto mb-6" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />
          ))}
        </div>
      </div>

      <span className="sr-only">Loading page content</span>
    </div>
  );
};

export default LandingPageLoader;
