import { React, useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { endPoints } from "@/rest_api/endpoints";
import { handleApiError } from "@/utils/handleApiError";

const { REST_API, HOST_URL } = endPoints;

const Clockifydata = () => {
  const [isClockifyDataVisible, setIsClockifyDataVisible] = useState(false);
  const [data, setClockifyData] = useState([]);

  const toggleClockifyData = () => {
    setIsClockifyDataVisible((prev) => !prev);
  };

  useEffect(() => {
    // Make the GET request to the API endpoint
    axios
      .get(`${HOST_URL}${REST_API.CxClockify.WeeklySummary}`)
      .then((response) => {
        setClockifyData(response.data.data);
      })
      .catch((error) => {
        handleApiError(error);
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
                <FontAwesomeIcon
                  icon={faChevronUp}
                  className="mr-2 text-gray-500"
                />
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
                  <th className="px-8 py-3 text-s font-medium leading-4 tracking-wider text-left text-gray-900 uppercase border-b border-gray-200 bg-gray-50">
                    Project Name
                  </th>
                  <th className="px-6 py-3 text-s font-medium leading-4 tracking-wider text-center text-gray-900 uppercase border-b border-gray-200 bg-gray-50">
                    User Name
                  </th>
                  <th className="px-6 py-3 text-s font-medium leading-4 tracking-wider text-center text-gray-900 uppercase border-b border-gray-200 bg-gray-50">
                    Week Ending
                  </th>
                  <th className="px-8 py-3 text-s font-medium leading-4 tracking-wider text-center text-gray-900 uppercase border-b border-gray-200 bg-gray-50">
                    Logged Hours
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id}>
                    <th className="px-8 py-3 text-s font-normal leading-4 tracking-wider text-left text-gray-500 border-b border-gray-200">
                      {item.Project}
                    </th>
                    <th className="px-6 py-3 text-s font-normal leading-4 tracking-wider text-center text-gray-500 border-b border-gray-200">
                      {item.User}
                    </th>
                    <th className="px-6 py-3 text-s font-normal leading-4 tracking-wider text-center text-gray-500 border-b border-gray-200">
                      {item.Week}
                    </th>
                    <th className="px-8 py-3 text-s font-normal leading-4 tracking-wider text-center text-gray-500 border-b border-gray-200">
                      {formatTime(item["Time (decimal)"])}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clockifydata;
