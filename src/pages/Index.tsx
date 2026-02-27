import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AnnouncementBar from "@/components/AnnouncementBar";
import ErrorBoundary from "@/components/ErrorBoundary";
const heroBgImage =
  "https://vedify-backend-dev.s3.eu-north-1.amazonaws.com/uploads/uploads/1770632691901_Frame_2147225909.png";
import SectionSkeleton from "@/components/SectionSkeleton";

// Lazy load below-the-fold sections for faster initial paint
const CollectionsSection = lazy(() => import("@/components/CollectionsSection"));
const CategoriesSection = lazy(() => import("@/components/CategoriesSection"));
const ElevateSection = lazy(() => import("@/components/ElevateSection"));
const NewArrivalsSection = lazy(() => import("@/components/NewArrivalsSection"));
const BundleDealsSection = lazy(() => import("@/components/BundleDealsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const LoyaltyBanner = lazy(() => import("@/components/LoyaltyBanner"));


import { useGetLandingPageDataQuery } from "@/store/services/landingApi";

// Minimal loading placeholder for non-product sections
const SectionLoader = () => (
  <div className="py-16 px-4">
    <div className="max-w-7xl mx-auto space-y-4">
      <Skeleton className="h-8 w-48 mx-auto" />
      <Skeleton className="h-4 w-72 mx-auto" />
      <div className="flex gap-4 mt-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-40 flex-1 rounded-2xl" />
        ))}
      </div>
    </div>
  </div>
);

const Index = () => {
  const { data: landingData } = useGetLandingPageDataQuery();

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-background">
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <AnnouncementBar />

      {/* Header area with shared hero background (Navbar + HeroSection) */}
      <div
        className="hero-header-bg relative overflow-hidden min-h-[50vh]"
        style={{ backgroundImage: `url(${heroBgImage})` }}
      >
        <div className="absolute inset-0 bg-background/40 pointer-events-none z-0" aria-hidden />
        <div className="relative z-10">
          <Navbar className="bg-transparent" />

          <ErrorBoundary section="Hero">
            <HeroSection data={landingData?.hero} />
          </ErrorBoundary>
        </div>
      </div>

      <main id="main-content">
        <Suspense fallback={<SectionSkeleton variant="carousel" count={4} />}>
          <ErrorBoundary section="Collections">
            <CollectionsSection landingData={landingData} />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ErrorBoundary section="Categories">
            <CategoriesSection data={landingData?.find_perfect_purse} />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ErrorBoundary section="Elevate">
            <ElevateSection data={landingData?.elevate_look} />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<SectionSkeleton variant="carousel" count={5} />}>
          <ErrorBoundary section="New Arrivals">
            <NewArrivalsSection landingData={landingData} />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ErrorBoundary section="Bundle Deals">
            <BundleDealsSection />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<SectionSkeleton variant="testimonials" />}>
          <ErrorBoundary section="Testimonials">
            <TestimonialsSection data={landingData?.testimonials} />
          </ErrorBoundary>
        </Suspense>
      </main>

      {/* <Suspense fallback={null}>
        <LoyaltyBanner />
      </Suspense> */}

      <Footer />
      <ScrollToTop />

    </div>
  );
};

export default Index;
