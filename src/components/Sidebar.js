import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
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
          <FontAwesomeIcon icon={faBars} className="mr-2 text-black" />
        )}
      </button>
      {/* Sidebar */}
      {sidebarVisible && (
        <div className="px-4 py-2 bg-gray-700 lg:w-1/5">
          <div className="my-1">
            {/* Close button */}
            <button
              className="bg-gray-700 p-2 text-white absolute left-0 transform -translate-x-full z-10"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
            <h1 className="text-2xl font-bold text-white ml-6 mr-2">
              Welcome {session?.user?.email}!
            </h1>
            <Link href="api/auth/signout">
              <span>
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  rotation={180}
                  className="text-white hover:text-red-400 cursor-pointer absolute bottom-0"
                  aria-label="Sign Out"
                />
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
