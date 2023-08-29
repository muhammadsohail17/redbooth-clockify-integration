import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const { data: session } = useSession();

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
            <h1 className="text-2xl font-bold text-white ml-6 mr-2 mb-4">
              Welcome {session?.user?.rbUserId}
            </h1>
            <h1 className="text-2xl font-bold text-white ml-6 mr-2">
              {session?.user?.email}!
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
