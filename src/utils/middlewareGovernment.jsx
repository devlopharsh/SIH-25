// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedGovernmentRoute = ({ children }) => {
  const token = localStorage.getItem("governmentToken"); // or session, context, etc.

  // If no token, redirect to login/signup
  if (!token) {
    return <Navigate to="/company/login" replace />;
  }

  // Otherwise, render the protected page
  return children;
};

export default ProtectedGovernmentRoute;
