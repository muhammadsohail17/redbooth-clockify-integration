import { React, useEffect, useState } from "react";
import axios from "axios";


const discrepanciespopup = ({ togglePopup }) => {

  const [data, setData] = useState([]);

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

  useEffect(() => {
    // Make the GET request to the API endpoint
    axios
      .get("http://localhost:3001/generate-weekly-summary")
      .then((response) => {
        console.log("generate-weekly-summary", response.data);
        setClockifyData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-center mb-4 text-black font-semibold">Discrepancies between time logged RB / CF</h1>
          <div className="bg-white p-4 rounded-md">
            <thead>
              <tr>
                <td className="px-6 py-2 text-xs font-medium leading-4 tracking-wider text-center text-gray-800 border-b border-gray-200 bg-gray-50">
                  All Week's Redbooth <br />Logged Hours
                </td>
                <td className="px-6 py-2 text-xs font-medium leading-4 tracking-wider text-center text-gray-800 border-b border-gray-200 bg-gray-50">
                  {data && data.loggingsData && data.loggingsData.length > 0 ? (
                    data.loggingsData.map((loggingsItem, index) => (
                      loggingsItem.projectLoggingsData.map((projectItem, projectIndex) => (
                        <tr key={`${index}-${projectIndex}`} className="">
                          <td className="px-6 py-2 text-xs font-medium leading-4 tracking-wider text-center text-gray-800 border-b border-gray-200 bg-gray-50">
                            {projectItem.weeklyTotalLoggedHours}h
                          </td>
                        </tr>
                      ))
                    ))
                  ) : null}
                </td>
              </tr>
            </thead>
            <thead>
              <tr>
                <td className="px-6 py-2 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 border-b border-gray-200 bg-gray-50">
                  Clockify Logged Hours
                </td>
                <td className="px-6 py-2 text-xs font-medium leading-4 tracking-wider text-center text-gray-800 border-b border-gray-200 bg-gray-50">
                  35h 02m
                </td>                
              </tr>
            </thead>

            {/* ... Add More your popup content here ... */}

            {/* Close button */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={togglePopup} // Use the passed function to close the popup
                className="mt-6 px-4 py-1 bg-gray-600 hover:bg-gray-800 text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )

};

export default discrepanciespopup;