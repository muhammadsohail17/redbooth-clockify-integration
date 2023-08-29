import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const { data: session } = useSession();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="relative bg-gray-700">
      {/* Button to toggle the sidebar */}
      <button
        className="inline cursor-pointer absolute p-4 text-white z-10"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon
          icon={faBars}
          className={sidebarVisible ? "mr-2" : "mr-2 text-black"}
        />
      </button>
      {/* Sidebar */}
      <div
        className={`${
          sidebarVisible ? "block" : "hidden"
        } lg:block lg:relative lg:w-1/5 lg:px-8 lg:py-2 lg:bg-gray-700`}
      >
        <div className="my-1">
          <h1 className="text-2xl font-bold text-white p-3">
            Welcome {session?.user?.rbUserId}
          </h1>
          <h1 className="text-2xl font-bold text-white">
            {session?.user?.email}!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
