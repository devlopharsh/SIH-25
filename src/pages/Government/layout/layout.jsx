import React from "react";
import Navbar from "@/components/government/Navbar";
import Footer from "@/components/government/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar user={sampleUser} />

      <Footer />{" "}
    </>
  );
};

export default Layout;
