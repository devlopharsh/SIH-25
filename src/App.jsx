import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./styles/App.css";
import Navbar from "./components/government/Navbar";
import Footer from "./components/government/Footer";
import { Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

//utils
import ProtectedCompanyRoute from "./utils/middlewareCompany";
import ProtectedGovernmentRoute from "./utils/middlewareGovernment";

//components
import DashBoard from "./pages/company/Dashboard";
import Projects from "./pages/company/Projects";
import AuditLogs from "./pages/company/Auditlogs";
import GovDashBoard from "./pages/Government/DashBoard";

// Pages
import LandingPage from "./pages/Landing-page";
import SignupPage from "./pages/company/SignupPage";
import SigninPage from "./pages/company/SigninPage";
import Page from "./pages/company/layout";
import Reset_Password from "./pages/Government/Reset_Password";
import SigninGovPage from "./pages/Government/SigninPage";
import Layout from "./pages/Government/layout";

function App() {
  const sampleUser = {
    id: 1,
    name: "Harsh Kumar",
    email: "harsh.kumar@example.com",
    avatar: "https://i.pravatar.cc/150?img=12", // random profile image
    role: "MERN Stack Developer",
    location: "New Delhi, India",
  };

  return (
    <>
      <Toaster />
      <Routes>
        {/* unprotected Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/company/Signup" element={<SignupPage />} />
        <Route path="/company/Signin" element={<SigninPage />} />
        <Route path="/government/Signin" element={<SigninGovPage />} />
        <Route
          path="/government/reset-password/:token"
          element={<Reset_Password />}
        />

        {/* protected Government Routes */}
        <Route
          path="/government"
          element={
            <ProtectedGovernmentRoute>
              <Layout />
            </ProtectedGovernmentRoute>
          }
        >
          <Route index element={<GovDashBoard />} /> 
          <Route path="dashboard" element={<GovDashBoard />} />{" "}
          <Route path="auditUsers" element={<DashBoard />} />{" "}
          {/* /government/dashboard */}
        </Route>

        {/* protected Routes */}
        <Route
          path="/company"
          element={
            <ProtectedCompanyRoute>
              <Page />
            </ProtectedCompanyRoute>
          }
        >
          <Route path="/company/" element={<DashBoard />} />
          <Route path="/company/Audit" element={<AuditLogs />} />
          <Route path="/company/projectstatus" element={<Projects />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
