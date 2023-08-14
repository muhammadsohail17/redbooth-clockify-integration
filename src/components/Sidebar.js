import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const { data: session } = useSession();
  console.log("sidebar session", session);
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      {/* Button to toggle the sidebar */}
      <button
        className="inline cursor-pointer absolute top-15 left-2 mt-2 p-2 text-white z-10"
        onClick={toggleSidebar}
      >
        {sidebarVisible ? (
          <FontAwesomeIcon icon={faBars} className="mr-2" />
        ) : (
          <FontAwesomeIcon icon={faBars} className="mr-2  text-black" />
        )}
      </button>
      {/* Sidebar */}
      {sidebarVisible && (
        <div className="px-4 py-2 bg-gray-700 lg:w-1/5">
          <div className="my-2">
            {/* Close button */}
            <button
              className="bg-gray-700 p-2 text-white absolute top-1 left-0 transform -translate-x-full mt-2 z-10"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
            <h1 className="text-2xl font-bold text-white inline ml-4">
              Welcome {session.user?.email}!
            </h1>
            <Link href="api/auth/signout">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-9 ml-3 mb-4 inline text-white  hover:text-gray-400 cursor-pointer absolute bottom-0 left-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </span>
            </Link>
          </div>
          {/* {projects.map((project, id) => (
            <h1 key={id} className="text-white text-2xl">
              {project.name}
            </h1>
          ))} */}
        </div>
      )}
    </>
  );
};

export default Sidebar;
