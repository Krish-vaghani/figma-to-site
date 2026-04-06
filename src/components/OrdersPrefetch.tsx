import { useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { prefetchOrdersList } from "@/store/services/orderApi";

/**
 * Starts loading orders in the background while the user browses (logged-in only).
 * Pairs with eager-loaded Orders route + 5s GET timeout so My Orders stays responsive.
 */
const OrdersPrefetch = () => {
  const { isLoggedIn } = useAuth();
  const ranForSession = useRef(false);

  useEffect(() => {
    if (!isLoggedIn) {
      ranForSession.current = false;
      return;
    }
    if (ranForSession.current) return;
    ranForSession.current = true;

    const run = () => prefetchOrdersList(1, 10);

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      window.requestIdleCallback(() => run(), { timeout: 600 });
    } else {
      window.setTimeout(run, 0);
    }
  }, [isLoggedIn]);

  return null;
};

export default OrdersPrefetch;
