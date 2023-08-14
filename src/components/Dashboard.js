import React, { useState, useEffect } from "react";
import { unixTimestampToDate } from "../data/util";
import Header from "./Headers";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useSession } from "next-auth/react";
import Clockifydata from "./Clockifydata";

export default function Dashboard({ data }) {
  const { data: session } = useSession();
  console.log("dashboard", data);
  console.log("dashboard session", session);
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
                    {data.totalLoggedHours}
                  </h4>
                  <div className="text-gray-500">Current Month Hours</div>
                </div>
              </div>
            </div>

            {/* dashboard item two */}
            <div className="flex flex-col mt-8">
              <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase border-b border-gray-200 bg-gray-50">
                          Project Name
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase border-b border-gray-200 bg-gray-50">
                          Week Ending
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase border-b border-gray-200 bg-gray-50">
                          Logged Hours
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white">
                      {data.loggingsData.map((project, id) => (
                        <React.Fragment key={id}>
                          {project.projectLoggingsData.map(
                            (weeklyLogging, id) => (
                              <tr key={id}>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <div className="flex items-center">
                                    <div className="ml-4">
                                      <div className="text-sm font-medium leading-5 text-gray-900">
                                        {project.name}
                                      </div>
                                    </div>
                                  </div>
                                </td>

                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800">
                                    {unixTimestampToDate(
                                      weeklyLogging.rangeEnd
                                    ).toLocaleDateString("en-US", {
                                      month: "long",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </span>
                                </td>

                                <td className="px-6 py-4 text-left text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 ">
                                  <span className="inline-flex px-2 text-xs font-semibold">
                                    {weeklyLogging.weeklyTotalLoggedHours}
                                  </span>
                                </td>
                              </tr>
                            )
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <Clockifydata />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
