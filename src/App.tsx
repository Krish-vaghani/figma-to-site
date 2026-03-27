import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, type ReactNode, useEffect } from "react";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { ViewedTodayProvider } from "@/contexts/ViewedTodayContext";
import { CartProvider } from "@/contexts/CartContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { AddressProvider } from "@/contexts/AddressContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AnimatePresence } from "framer-motion";
import CartDrawer from "@/components/CartDrawer";
import PageTransition from "@/components/PageTransition";
import ScrollRestoration from "@/components/ScrollRestoration";
import ProtectedRoute from "@/components/ProtectedRoute";
import { initMetaPixel, trackPageView } from "@/lib/metaPixel";

const MetaPixelTracker = () => {
  const location = useLocation();

  useEffect(() => {
    initMetaPixel();
    trackPageView();
  }, []);

  useEffect(() => {
    trackPageView();
  }, [location.pathname, location.search]);

  return null;
};

// Route-level code splitting: keep initial bundle small for first-time visits
const Index = lazy(() => import("./pages/Index"));
const Purses = lazy(() => import("./pages/Purses"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const ReturnPolicy = lazy(() => import("./pages/ReturnPolicy"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Login = lazy(() => import("./pages/Login"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const OrderDetail = lazy(() => import("./pages/OrderDetail"));
const Addresses = lazy(() => import("./pages/Addresses"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

const RouteFallback = () => (
  <div className="min-h-[40vh] w-full flex items-center justify-center text-sm text-muted-foreground">
    Loading…
  </div>
);

const wrapRoute = (node: ReactNode) => (
  <PageTransition>
    <Suspense fallback={<RouteFallback />}>{node}</Suspense>
  </PageTransition>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={wrapRoute(<Index />)} />
        <Route path="/purses" element={wrapRoute(<Purses />)} />
        <Route path="/about" element={wrapRoute(<AboutUs />)} />
        <Route path="/contact" element={wrapRoute(<ContactUs />)} />
        <Route path="/privacy" element={wrapRoute(<PrivacyPolicy />)} />
        <Route path="/terms" element={wrapRoute(<TermsAndConditions />)} />
        <Route path="/return-policy" element={wrapRoute(<ReturnPolicy />)} />
        <Route path="/product/:id" element={wrapRoute(<ProductDetail />)} />
        <Route path="/login" element={wrapRoute(<Login />)} />
        <Route path="/wishlist" element={wrapRoute(<Wishlist />)} />
        <Route path="/cart" element={wrapRoute(<Cart />)} />
        <Route
          path="/checkout"
          element={wrapRoute(
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/orders"
          element={wrapRoute(
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/order-success/:id"
          element={wrapRoute(
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/order/:id"
          element={wrapRoute(
            <ProtectedRoute>
              <OrderDetail />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/addresses"
          element={wrapRoute(
            <ProtectedRoute>
              <Addresses />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/profile"
          element={wrapRoute(
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          )}
        />
        <Route path="*" element={wrapRoute(<NotFound />)} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <AuthProvider>
    <WishlistProvider>
      <ViewedTodayProvider>
        <CartProvider>
        <OrderProvider>
          <AddressProvider>
            <TooltipProvider>
              <Toaster />
              <BrowserRouter>
                <MetaPixelTracker />
                <ScrollRestoration />
                <CartDrawer />
                <AnimatedRoutes />
              </BrowserRouter>
            </TooltipProvider>
          </AddressProvider>
        </OrderProvider>
        </CartProvider>
      </ViewedTodayProvider>
    </WishlistProvider>
  </AuthProvider>
);

export default App;
