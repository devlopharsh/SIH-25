import React from "react";

const Footer = () => {
  return (
    <footer className=" bottom-0 w-full flex items-center justify-between px-6 py-3 bg-gray-100 text-gray-700 border-t text-sm">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <span>© 2025 Government of India</span>
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Terms of Service</a>
      </div>

      {/* Right side */}
      <div>
        <a href="#" className="hover:underline">Ministry of Earth Sciences</a>
      </div>
    </footer>
  );
};

export default Footer;
