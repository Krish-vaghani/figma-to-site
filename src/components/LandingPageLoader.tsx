import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Full-viewport overlay shown while the home page preloads critical images.
 */
const LandingPageLoader = () => {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-background"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="h-10 w-full border-b border-border/40">
        <Skeleton className="h-full w-full rounded-none opacity-60" />
      </div>

      <div className="relative flex-1 min-h-0 overflow-hidden">
        <div className="absolute inset-0 bg-muted/30" aria-hidden />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[50vh] px-4 py-12">
          <Loader2
            className="h-10 w-10 text-coral animate-spin mb-8"
            aria-hidden
          />
          <div className="w-full max-w-md space-y-4 text-center">
            <Skeleton className="h-4 w-40 mx-auto" />
            <Skeleton className="h-8 w-72 max-w-full mx-auto" />
            <Skeleton className="h-4 w-64 max-w-full mx-auto" />
          </div>
          <div className="w-full max-w-2xl mt-10 space-y-3">
            <div className="flex gap-3 justify-center">
              <Skeleton className="h-10 w-28 rounded-full" />
              <Skeleton className="h-10 w-28 rounded-full" />
            </div>
            <Skeleton className="h-48 sm:h-64 w-full rounded-3xl mt-6" />
          </div>
        </div>
      </div>

      <span className="sr-only">Loading images, please wait</span>
    </div>
  );
};

export default LandingPageLoader;
