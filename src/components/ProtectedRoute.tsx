import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/** Pass to `/login` when the user intended checkout (same shape as Navigate from ProtectedRoute). Avoids an extra /checkout → login hop that can blank the screen on iOS Safari. */
export const LOGIN_STATE_FOR_CHECKOUT = { from: { pathname: "/checkout" } } as const;

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
