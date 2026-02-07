import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AnnouncementBar from "@/components/AnnouncementBar";
import ErrorBoundary from "@/components/ErrorBoundary";
import { heroBackground } from "@/lib/assetUrls";
import SectionSkeleton from "@/components/SectionSkeleton";

// Lazy load below-the-fold sections for faster initial paint
const CollectionsSection = lazy(() => import("@/components/CollectionsSection"));
const CategoriesSection = lazy(() => import("@/components/CategoriesSection"));
const ElevateSection = lazy(() => import("@/components/ElevateSection"));
const NewArrivalsSection = lazy(() => import("@/components/NewArrivalsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const ExitIntentPopup = lazy(() => import("@/components/ExitIntentPopup"));

import { useGetLandingPageDataQuery } from "@/store/services/landingApi";

// Minimal loading placeholder for non-product sections
const SectionLoader = () => (
  <div className="py-16 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-coral border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  const { data: response } = useGetLandingPageDataQuery();
  const landingData = response?.data;

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <AnnouncementBar />

      {/* Header area with shared hero background (Navbar + HeroSection) */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "auto 100%",
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Navbar className="bg-transparent" />

        <ErrorBoundary section="Hero">
          <HeroSection data={landingData?.hero} />
        </ErrorBoundary>
      </div>

      <main id="main-content">
        <Suspense fallback={<SectionSkeleton variant="carousel" count={4} />}>
          <ErrorBoundary section="Collections">
            <CollectionsSection data={landingData?.best_collections} />
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
            <NewArrivalsSection data={landingData?.fresh_styles} />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<SectionSkeleton variant="testimonials" />}>
          <ErrorBoundary section="Testimonials">
            <TestimonialsSection data={landingData?.testimonials} />
          </ErrorBoundary>
        </Suspense>
      </main>

      <Footer />
      <ScrollToTop />

      <Suspense fallback={null}>
        <ExitIntentPopup />
      </Suspense>
    </div>
  );
};

export default Index;
