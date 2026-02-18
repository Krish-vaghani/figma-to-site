import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { CartProvider } from "@/contexts/CartContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { AddressProvider } from "@/contexts/AddressContext";
import { AnimatePresence } from "framer-motion";
import CartDrawer from "@/components/CartDrawer";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";
import Purses from "./pages/Purses";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";
import OrderDetail from "./pages/OrderDetail";
import Addresses from "./pages/Addresses";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/purses" element={<PageTransition><Purses /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutUs /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/wishlist" element={<PageTransition><Wishlist /></PageTransition>} />
        <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
        <Route path="/orders" element={<PageTransition><Orders /></PageTransition>} />
        <Route path="/order-success/:id" element={<PageTransition><OrderSuccess /></PageTransition>} />
        <Route path="/order/:id" element={<PageTransition><OrderDetail /></PageTransition>} />
        <Route path="/addresses" element={<PageTransition><Addresses /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <WishlistProvider>
    <CartProvider>
      <OrderProvider>
        <AddressProvider>
          <TooltipProvider>
            <Toaster />
            <CartDrawer />
            <BrowserRouter>
              <AnimatedRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </AddressProvider>
      </OrderProvider>
    </CartProvider>
  </WishlistProvider>
);

export default App;

