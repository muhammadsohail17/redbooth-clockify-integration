import React from "react";
import Image from "next/image";
import connextar_logo from "../resources/images/connextar-logo-dark.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <nav className="bg-gray-800 py-2">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo or brand */}
          <a href="/">
            <Image src={connextar_logo} alt="logo" />
          </a>

          {/* Navigation links */}
          <div className="md:flex md:space-y-0 md:space-x-4 md:inline-flex">
            <a href="/" className="text-white hover:text-gray-200 p-2">
              Home
            </a>
            <a
              href="/cx-users"
              className="text-white hover:text-gray-200 p-2 mr-2"
            >
              Users
            </a>
            <a
              href="/cx-projects"
              className="text-white hover:text-gray-200 p-2 mr-2"
            >
              Projects
            </a>
            <a
              href="/dashboard/generateInvoice"
              className="text-white hover:text-gray-200 border border-gray-200 hover:border-gray-300 p-2 mr-2 rounded-md"
            >
              Generate Invoice
            </a>
            <a
              href="api/auth/signout"
              className="text-white hover:text-gray-200 p-2"
              title="Sign Out"
            >
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="text-white hover:text-gray-200"
                aria-label="Sign Out"
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
