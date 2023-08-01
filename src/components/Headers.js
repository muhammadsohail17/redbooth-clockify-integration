import React from "react";
import connextar_logo from "../resources/images/connextar-favicon.png";

const Header = () => {
  return (
    <nav className="bg-gray-800 px-4 py-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo or brand */}
          <a href="/">
            <img src={connextar_logo} alt="logo" />
          </a>

          {/* Navigation links */}
          <div className="space-x-4">
            <a href="/" className="text-white hover:text-gray-200">
              Home
            </a>
            <a href="/cx-users" className="text-white hover:text-gray-200">
              Users
            </a>
            <a href="/cx-projects" className="text-white hover:text-gray-200">
              Projects
            </a>
            <a href="/dashboard/generateInvoice">
              <button className="bg-blue-600 px-4 py-2 text-white rounded-lg hover:bg-blue-700 mb-3 absolute top-1 mx-auto mt-1">
                Generate Invoice
              </button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
