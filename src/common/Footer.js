import React from "react";
import Image from "next/image";
import connextarFavicon from "../resources/images/connextar-favicon.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <h2 className="text-xl mb-4">About Us</h2>
            <p className="text-sm">
              Building high-performance software for tomorrow's needs.
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 mt-6 md:mt-0">
            <h2 className="text-xl mb-4">Contact Us</h2>
            <p className="text-sm">
              Connextar Technologies Ltd
              <br /> 39 Seldon Street, Bradford, BD5 9HH
            </p>
            <p className="text-sm mt-4">
              Phone: (123) 456-7890
              <br /> Email: support@connextar.com
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 mt-6 md:mt-0">
            <h2 className="text-xl mb-4">Links</h2>
            <ul className="text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-800 pt-4">
          <div className="flex items-center justify-between">
            <a href="#">
              <Image src={connextarFavicon} alt="logo" />
            </a>
            <p className="text-sm">
              Copyright &copy; 2023 | Connextar Technologies
            </p>
            <p className="text-sm">
              <a href="#" className="hover:text-white">
                Terms of Use
              </a>
              <span className="mx-2 text-gray-500">|</span>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
