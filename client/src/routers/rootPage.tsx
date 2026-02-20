import Landing from "../pages/Landing";
import { ProtectedRoute } from "./authRoute/protuctedRoute";
import Dashboard from "../pages/product/Dashboard";
import { useAuthStore } from "../store/useAuthStore";

export const RootPage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  ) : (
    <Landing />
  );
};
