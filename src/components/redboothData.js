import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

const RedboothData = () => {
  const [isRedboothDataVisible, setIsRedboothDataVisible] = useState(false);
  const [data, setData] = useState([]);

  const { data: session } = useSession();

  const rbUserId = session?.user?.rbUserId;

  const toggleRedBoothData = () => {
    setIsRedboothDataVisible((prev) => !prev);
  };

  useEffect(() => {
    if (rbUserId) {
      axios
        .get(
          `http://localhost:3001/invoice/generate-weekly-summary/${rbUserId}`
        )
        .then((response) => {
          console.log("/invoice/generate-weekly-summary", response.data);
          setData(response.data.InvoiceItem);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [rbUserId]);

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
              aria-expanded={isRedboothDataVisible}
              onClick={toggleRedBoothData}
            >
              <span className="text-gray-800 font-medium px-4">
                Redbooth Data
              </span>
              <span
                className={`ml-auto h-5 w-5 transition-transform duration-200 ease-in-out ${
                  isRedboothDataVisible ? "rotate-[-180deg]" : ""
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
            className={isRedboothDataVisible ? "visible" : "hidden"}
            data-te-collapse-item
            data-te-collapse-show
            aria-labelledby="headingOne"
            data-te-parent="#accordionExample"
          >
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-s font-medium leading-4 tracking-wider text-center text-gray-900 uppercase border-b border-gray-200 bg-gray-50">
                    Project Name
                  </th>
                  <th className="px-6 py-3 text-s font-medium leading-4 tracking-wider text-center text-gray-900 uppercase border-b border-gray-200 bg-gray-50">
                    Week
                  </th>
                  <th className="px-6 py-3 text-s font-medium leading-4 tracking-wider text-center text-gray-900 uppercase border-b border-gray-200 bg-gray-50">
                    Logged Hours
                  </th>
                </tr>
              </thead>
              <tbody>
                {data && data.loggingsData && data.loggingsData.length > 0 ? (
                  data.loggingsData.map((loggingsItem, index) => (
                    <React.Fragment key={index}>
                      {loggingsItem.projectLoggingsData.map(
                        (projectItem, projectIndex) => (
                          <tr
                            key={`${index}-${projectIndex}`}
                            className="cursor-pointer"
                          >
                            <td className="px-6 py-4 text-s font-normal text-center text-gray-500 border-b border-gray-200">
                              {loggingsItem.name}
                            </td>
                            <td className="px-6 py-4 text-s font-normal text-center text-gray-500 border-b border-gray-200">
                              {projectItem.range}
                            </td>
                            <td className="px-6 py-4 text-s font-normal text-center text-gray-500 border-b border-gray-200">
                              {formatTime(projectItem.weeklyTotalLoggedHours)}
                            </td>
                          </tr>
                        )
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default RedboothData;
