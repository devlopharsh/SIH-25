// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedGovernmentRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // or session, context, etc.

  // If no token, redirect to login/signup
  if (!token) {
    return <Navigate to="/government/Signin" replace />;
  }

  // Otherwise, render the protected page
  return children;
};

export default ProtectedGovernmentRoute;
