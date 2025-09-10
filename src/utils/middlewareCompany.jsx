// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedCompanyRoute = ({ children }) => {
  const token = localStorage.getItem("CompanyToken"); // or session, context, etc.

  // If no token, redirect to login/signup
  if (!token) {
    return <Navigate to="/company/Signin" replace />;
  }

  // Otherwise, render the protected page
  return children;
};

export default ProtectedCompanyRoute;
