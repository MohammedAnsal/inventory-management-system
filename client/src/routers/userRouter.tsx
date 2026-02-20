import type { RouteObject } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyEmail from "../pages/auth/VerifyEmail";
import Dashboard from "../pages/product/Dashboard";
import { PublicRoute } from "../routers/authRoute/publicRoute";
import { ProtectedRoute } from "./authRoute/protuctedRoute";

export const UserRouter: RouteObject[] = [
  {
    path: "/",
    element: <Landing />,
  },

  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: "verify-email",
        element: (
          <PublicRoute>
            <VerifyEmail />
          </PublicRoute>
        ),
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
];
