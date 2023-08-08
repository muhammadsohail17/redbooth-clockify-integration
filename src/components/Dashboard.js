import React from "react";
import { useState } from 'react';
import { unixTimestampToDate } from "../data/util";
import Header from "./Headers";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Dashboard({ projects, userData, userLoggings, data }) {
  console.log("dashboard", projects, data);

  const [isClockifyDataVisible, setIsClockifyDataVisible] = useState(false);

  const toggleClockifyData = () => {
    setIsClockifyDataVisible((prev) => !prev);
  };

  return (
    <>
      <Header />
      <div className="flex overflow-x-hidden min-h-screen">
        {/*Render sidebar component*/}
        <Sidebar data={data} projects={projects} />
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
                  <h4 className="text-2xl font-semibold text-gray-700">20</h4>
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
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Project Name
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Week Ending
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
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
              <div id="accordionExample" className="py-6">
                <div className="border-b shadow sm:rounded-lg border-gray-200 bg-white text-gray-200">
                  <h2 className="mb-0" id="headingOne">
                    <button
                      className={`group relative flex w-full items-center border-b shadow sm:rounded-lg px-5 py-4 text-left text-base transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-gray-100 dark:text-white`}
                      type="button"
                      aria-expanded={isClockifyDataVisible}
                      onClick={toggleClockifyData}
                    >
                      <span className="text-gray-800 font-medium px-4">Clockify Data</span>
                      <span className={`ml-auto h-5 w-5 transition-transform duration-200 ease-in-out ${isClockifyDataVisible ? 'rotate-[-180deg]' : ''}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className={`h-6 w-6 text-gray-600`}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </span>
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className={isClockifyDataVisible ? 'visible' : 'hidden'}
                    data-te-collapse-item
                    data-te-collapse-show
                    aria-labelledby="headingOne"
                    data-te-parent="#accordionExample"
                  >
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="px-8 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-900 uppercase border-b border-gray-200 bg-gray-50">Project Name</th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-900 uppercase border-b border-gray-200 bg-gray-50">User Name</th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-right text-gray-900 uppercase border-b border-gray-200 bg-gray-50">Week Ending</th>
                          <th className="px-8 py-3 text-xs font-medium leading-4 tracking-wider text-right text-gray-900 uppercase border-b border-gray-200 bg-gray-50">Logged Hours</th>
                        </tr>
                        <tr>
                          <th className="px-8 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 border-b border-gray-200">Redbooth + Clockify</th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 border-b border-gray-200">Asim khan</th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-right text-gray-500 border-b border-gray-200">July 27, 2023</th>
                          <th className="px-8 py-3 text-xs font-medium leading-4 tracking-wider text-right text-gray-500 border-b border-gray-200">17.00 h</th>
                        </tr>
                        <tr>
                          <th className="px-8 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 border-b border-gray-200">Redbooth + Clockify</th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 border-b border-gray-200">Asim khan</th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-right text-gray-500 border-b border-gray-200">July 27, 2023</th>
                          <th className="px-8 py-3 text-xs font-medium leading-4 tracking-wider text-right text-gray-500 border-b border-gray-200">17.00 h</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
