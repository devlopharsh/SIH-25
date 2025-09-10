import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./styles/App.css";
import Navbar from "./components/government/Navbar";
import Footer from "./components/government/Footer";
import { Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// Pages
import LandingPage from "./pages/Landing-page";
import SignupPage from "./pages/company/SignupPage";

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
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/project" element={<Project />} />
        <Route path="/contact" element={<Contact />} /> */}
        <Route path="/company/Signup" element={<SignupPage />} />
        {/* <Route path="/company/Signin" element={<SigninPage />} /> */}

        {/* protected Routes */}
        <Route path="/dashboard" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
