import { React, useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Discrepanciespopup from "./discrepanciespopup";

const RedboothData = () => {
  const [isRedboothDataVisible, setIsRedboothDataVisible] = useState(false);
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility


  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleRedBoothData = () => {
    setIsRedboothDataVisible((prev) => !prev);
  };

  useEffect(() => {
    // Make the GET request to the API endpoint
    axios
      .get("http://localhost:3001/invoice/generate-weekly-summary/6237221")
      .then((response) => {
        console.log("/invoice/generate-weekly-summary/6237221", response.data);
        setData(response.data.InvoiceItem);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
                className={`ml-auto h-5 w-5 transition-transform duration-200 ease-in-out ${isRedboothDataVisible ? "rotate-[-180deg]" : ""
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
                    <>
                      {loggingsItem.projectLoggingsData.map(
                        (projectItem, projectIndex) => (
                          <tr
                            key={`${index}-${projectIndex}`}
                            className=""
                          >
                            <td className="px-6 py-4 text-s font-normal text-center text-gray-500 border-b border-gray-200">
                              {loggingsItem.name}
                            </td>
                            <td className="px-6 py-4 text-s font-normal text-center text-gray-500 border-b border-gray-200">
                              {projectItem.range}
                            </td>
                            <td className="cursor-pointer px-6 py-4 text-s font-normal text-center text-gray-500 border-b border-gray-200" onClick={togglePopup}>
                              {projectItem.weeklyTotalLoggedHours}h
                            </td>
                          </tr>
                        )
                      )}
                    </>
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
            {/* Popup */}
            {showPopup && (
            <div>
              <Discrepanciespopup togglePopup={togglePopup} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RedboothData;
