import React from "react";
import { Outlet } from "react-router-dom";

//components
import Navbar from "@/components/Company/Navbar";
import Footer from "@/components/Company/Footer";

const user = {
  name: "Harsh Kumar",
  email: "harsh237hk@gmail.com",
};

const Page = () => {
  return (
    <>
      <Navbar user={user} />
      <div className="min-h-screen absolute top-10 left-1/8 w-7/8 p-6 z-[-10]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Page;
