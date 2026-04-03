import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollRestoration = () => {
  const { pathname } = useLocation();

  // Disable browser's native scroll restoration
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // "instant" is not in the widely supported ScrollBehavior subset; Safari can mis-handle it.
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollRestoration;
