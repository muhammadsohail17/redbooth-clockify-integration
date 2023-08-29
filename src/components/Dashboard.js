import React from "react";
import Header from "../common/Headers";
import Footer from "../common/Footer";
import Sidebar from "../common/Sidebar";
import Clockifydata from "./Clockifydata";
import RedboothData from "./redboothData";

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className="flex overflow-x-hidden min-h-screen">
        {/*Render sidebar component*/}
        <Sidebar />
        <div className="w-full px-4 py-2 bg-gray-200 lg:w-full">
          <div className="container mx-auto mt-14">
            {/* dashboard item One */}
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="flex items-center px-4 py-6 bg-white rounded-md shadow-md">
                <div className="p-3 bg-gray-800 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="mx-4">
                  <h4 className="text-2xl font-semibold text-gray-700">35h</h4>
                  <div className="text-gray-500">Last Week Hours</div>
                </div>
              </div>
              <div className="flex items-center px-4 py-6 bg-white rounded-md shadow-md">
                <div className="p-3 bg-gray-800 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                </div>
                <div className="mx-4">
                  <h4 className="text-2xl font-semibold text-gray-700">
                    {"data.totalLoggedHours"}
                  </h4>
                  <div className="text-gray-500">Current Month Hours</div>
                </div>
              </div>
            </div>

            {/* dashboard item two */}

            <RedboothData />

            {/* dashboard item three */}
            <Clockifydata />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
