import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("access_token");
  const userIsAdmin = localStorage.getItem("is_admin") === "true";

  console.log("Verificando ProtectedRoute:");
  console.log("Token:", token);
  console.log("userIsAdmin:", userIsAdmin);
  console.log("adminOnly:", adminOnly);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !userIsAdmin) {
    return <Navigate to="/landing" replace />;
  }

  if (!adminOnly && userIsAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  adminOnly: PropTypes.bool,
};

export default ProtectedRoute;
