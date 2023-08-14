import React from "react";
import Image from "next/image";
import connextar_logo from "../resources/images/connextar-logo-dark.png";

const Header = () => {
  return (
    <nav className="bg-gray-800 px-4 py-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo or brand */}
          <a href="/">
            <Image src={connextar_logo} alt="logo" />
          </a>

          {/* Navigation links */}
          <div className="hidden md:flex space-x-4">
            <a href="/" className="text-white hover:text-gray-200 pt-2">
              Home
            </a>
            <a href="/cx-users" className="text-white hover:text-gray-200 pt-2">
              Users
            </a>
            <a href="/cx-projects" className="text-white hover:text-gray-200 pt-2">
              Projects
            </a>
            <div className="flex space-x-4">
              <a
                href="/dashboard/generateInvoice"
                className="text-white hover:text-gray-200 border border-gray-200 hover:border-gray-300 p-2 rounded-md text-sm"
              >
                Generate Invoice
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
