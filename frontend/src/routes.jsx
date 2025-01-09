/* import { Navigate } from "react-router-dom";
import Login from "./components/login/login.jsx";
import AdminDashboard from "./components/admin/admin.jsx";
import LandingPage from "./components/user/landing.jsx";
import ProtectedRoute from "./components/protectedRouted.jsx";

const routes = [
  { path: "/", element: <Navigate to="/login" /> },
  { path: "/login", element: <Login /> },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/landing",
    element: (
      <ProtectedRoute>
        <LandingPage />
      </ProtectedRoute>
    ),
  },
];

export default routes;
 */
// src/routes.js
import { Navigate } from "react-router-dom";
import Login from "./components/login/login.jsx";
import AdminDashboard from "./components/admin/admin.jsx";
import LandingPage from "./components/user/landing.jsx";
import ProtectedRoute from "./components/protectedRouted.jsx";

const routes = [
  { path: "/", element: <Navigate to="/login" /> },
  { path: "/login", element: <Login /> },
  {
    path: "/admin",
    element: (
      <ProtectedRoute adminOnly={true}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/landing",
    element: (
      <ProtectedRoute>
        <LandingPage />
      </ProtectedRoute>
    ),
  },
];

export default routes;
