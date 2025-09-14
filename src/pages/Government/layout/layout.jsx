import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "@/components/government/Navbar";
import Footer from "@/components/government/Footer";

const user = {
  name: "Harsh Kumar",
  email: "harsh237hk@gmail.com",
};


const Layout = ({ children }) => {
  return (
    <>
      <Navbar user={user} />
      
      <div className="min-h-screen  top-10 left-1/8 w-7/8 p-6 z-[-10]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
