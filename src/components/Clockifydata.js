import { React, useEffect, useState } from "react";
import axios from "axios";

const Clockifydata = () => {
  const [isClockifyDataVisible, setIsClockifyDataVisible] = useState(false);
  const [data, setClockifyData] = useState([]);

  const toggleClockifyData = () => {
    setIsClockifyDataVisible((prev) => !prev);
  };

  useEffect(() => {
    // Make the GET request to the API endpoint
    axios
      .get("http://localhost:3001/generate-weekly-summary")
      .then((response) => {
        console.log(response.data.data);
        setClockifyData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function formatTime(decimalTime) {
    const hours = Math.floor(decimalTime);
    const minutes = Math.round((decimalTime - hours) * 60);

    return `${hours}h ${minutes}m`;
  }

  return (
    <>
      <div id="accordionExample" className="py-6">
        <div className="border-b shadow sm:rounded-lg border-gray-200 bg-white text-gray-200">
          <h2 className="mb-0" id="headingOne">
            <button
              className={`group relative flex w-full items-center border-b shadow sm:rounded-lg px-5 py-4 text-left text-base transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-gray-100 dark:text-white`}
              type="button"
              aria-expanded={isClockifyDataVisible}
              onClick={toggleClockifyData}
            >
              <span className="text-gray-800 font-medium px-4">
                Clockify Data
              </span>
              <span
                className={`ml-auto h-5 w-5 transition-transform duration-200 ease-in-out ${
                  isClockifyDataVisible ? "rotate-[-180deg]" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`h-6 w-6 text-gray-600`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </button>
          </h2>
          <div
            id="collapseOne"
            className={isClockifyDataVisible ? "visible" : "hidden"}
            data-te-collapse-item
            data-te-collapse-show
            aria-labelledby="headingOne"
            data-te-parent="#accordionExample"
          >
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-8 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-900 uppercase border-b border-gray-200 bg-gray-50">
                    Project Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-900 uppercase border-b border-gray-200 bg-gray-50">
                    User Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-900 uppercase border-b border-gray-200 bg-gray-50">
                    Week Ending
                  </th>
                  <th className="px-8 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-900 uppercase border-b border-gray-200 bg-gray-50">
                    Logged Hours
                  </th>
                </tr>
                {data.map((data) => (
                  <tr key={data}>
                    <th className="px-8 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 border-b border-gray-200">
                      {data.Project}
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 border-b border-gray-200">
                      {data.User}
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 border-b border-gray-200">
                      {data.Week}
                    </th>
                    <th className="px-8 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 border-b border-gray-200">
                      {formatTime(data["Time (decimal)"])}
                    </th>
                  </tr>
                ))}
              </thead>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clockifydata;
