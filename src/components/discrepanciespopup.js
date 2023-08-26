import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/invoice/generate-weekly-summary/6237221";

const DiscrepanciesPopup = ({ togglePopup }) => {
  const [data, setData] = useState([]);
  const [totalLoggedHours, setTotalLoggedHours] = useState(0);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setData(response.data.InvoiceItem);
        calculateTotalLoggedHours(response.data.InvoiceItem);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const calculateTotalLoggedHours = (invoiceData) => {
    let totalHours = 0;
    invoiceData.loggingsData.forEach((loggingsItem) => {
      loggingsItem.projectLoggingsData.forEach((projectItem) => {
        totalHours += projectItem.weeklyTotalLoggedHours;
      });
    });
    setTotalLoggedHours(totalHours);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-center mb-4 text-black font-semibold">Discrepancies between RB / CF time logged </h1>
          <div className="bg-white p-4 rounded-md">
            <thead>
            <tr>
                <td className="px-6 py-2 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 border-b border-gray-200 bg-gray-50">
                  Total Redbooth Logged Hours
                </td>
                <td className="px-6 py-2 text-xs font-medium leading-4 tracking-wider text-center text-gray-800 border-b border-gray-200 bg-gray-50">
                {totalLoggedHours.toFixed(2)} h
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

export default DiscrepanciesPopup;
