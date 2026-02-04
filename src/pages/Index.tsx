import { Suspense, lazy, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AnnouncementBar from "@/components/AnnouncementBar";
import ErrorBoundary from "@/components/ErrorBoundary";
import heroBackground from "@/assets/hero-background.png";
import { useGetLandingPageDataQuery } from "@/store/api";

// Lazy load below-the-fold sections for faster initial paint
const CollectionsSection = lazy(() => import("@/components/CollectionsSection"));
const CategoriesSection = lazy(() => import("@/components/CategoriesSection"));
const ElevateSection = lazy(() => import("@/components/ElevateSection"));
const NewArrivalsSection = lazy(() => import("@/components/NewArrivalsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const ExitIntentPopup = lazy(() => import("@/components/ExitIntentPopup"));

// Minimal loading placeholder
const SectionLoader = () => (
  <div className="py-16 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-coral border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  // Fetch landing page data from API
  const { data, isLoading, error } = useGetLandingPageDataQuery();

  // Log data for debugging (remove in production)
  useEffect(() => {
    if (data) {
      console.log("Landing page data loaded:", data);
    }
    if (error) {
      console.error("Failed to load landing page data:", error);
    }
  }, [data, error]);

  // Extract section data
  const landingData = data?.data;

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
          <HeroSection data={landingData?.hero} isLoading={isLoading} />
        </ErrorBoundary>
      </div>

      <main id="main-content">
        <Suspense fallback={<SectionLoader />}>
          <ErrorBoundary section="Collections">
            <CollectionsSection data={landingData?.best_collections} isLoading={isLoading} />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ErrorBoundary section="Categories">
            <CategoriesSection data={landingData?.find_perfect_purse} isLoading={isLoading} />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ErrorBoundary section="Elevate">
            <ElevateSection data={landingData?.elevate_look} isLoading={isLoading} />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ErrorBoundary section="New Arrivals">
            <NewArrivalsSection data={landingData?.fresh_styles} isLoading={isLoading} />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ErrorBoundary section="Testimonials">
            <TestimonialsSection data={landingData?.testimonials} isLoading={isLoading} />
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

