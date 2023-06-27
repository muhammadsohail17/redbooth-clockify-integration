import React, { useState, useEffect } from "react";
import axios from "axios";

const renderDataView = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getLogData();
  }, []);

  const getLogData = () => {
    axios
      .get("http://localhost:3000/render-data-view")
      .then((response) => {
        const loggingsData = response.data;
        setData(loggingsData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div>
      <h1>Logging data</h1>
      {data && (
        <table className="table-fixed">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Task Name</th>
              <th>Logging Time</th>
              <th>Logging Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Sliding Mr. Bones</td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
            <tr>
              <td>Witchy Woman</td>
              <td>The Eagles</td>
              <td>1972</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default renderDataView;
