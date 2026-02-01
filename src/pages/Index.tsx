import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CollectionsSection from "@/components/CollectionsSection";
import CategoriesSection from "@/components/CategoriesSection";
import ElevateSection from "@/components/ElevateSection";
import NewArrivalsSection from "@/components/NewArrivalsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AnnouncementBar from "@/components/AnnouncementBar";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import ErrorBoundary from "@/components/ErrorBoundary";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      <ErrorBoundary section="Hero">
        <HeroSection />
      </ErrorBoundary>
      <ErrorBoundary section="Collections">
        <CollectionsSection />
      </ErrorBoundary>
      <ErrorBoundary section="Categories">
        <CategoriesSection />
      </ErrorBoundary>
      <ErrorBoundary section="Elevate">
        <ElevateSection />
      </ErrorBoundary>
      <ErrorBoundary section="New Arrivals">
        <NewArrivalsSection />
      </ErrorBoundary>
      <ErrorBoundary section="Testimonials">
        <TestimonialsSection />
      </ErrorBoundary>
      <Footer />
      <ScrollToTop />
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
