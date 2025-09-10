import React from "react";

const layout = ({ children }) => {
  return (
    <>
      <Navbar user={sampleUser} />
      
      <Footer />{" "}
    </>
  );
};

export default layout;
