import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import connextar_logo from "../resources/images/connextar-logo-dark.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 px-4 py-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo or brand */}
          <a href="/">
            <Image src={connextar_logo} alt="logo" />
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
          </button>

          {/* Navigation links */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:block md:flex space-y-2 md:space-y-0 md:space-x-4`}
          >
            <a
              href="/"
              className="text-white hover:text-gray-200 block md:inline p-2"
            >
              Home
            </a>
            <a
              href="/cx-users"
              className="text-white hover:text-gray-200 block md:inline p-2"
            >
              Users
            </a>
            <a
              href="/cx-projects"
              className="text-white hover:text-gray-200 block md:inline p-2"
            >
              Projects
            </a>
            <a
              href="/dashboard/generateInvoice"
              className="text-white hover:text-gray-200 border border-gray-200 hover:border-gray-300 p-2 rounded-md block md:inline"
            >
              Generate Invoice
            </a>
            <a
              href="api/auth/signout"
              className="text-white hover:text-gray-200 block md:inline p-2"
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
