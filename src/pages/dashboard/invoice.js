import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faEnvelope,
  faShare,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { endPoints } from "@/rest_api/endpoints";
import { handleApiError } from "@/utils/handleApiError";

const { REST_API, HOST_URL } = endPoints;

const Invoice = () => {
  const [customItems, setCustomItems] = useState([]);

  const router = useRouter();
  const invoiceItemString = router.query.invoice_data;

  let invoiceData = null;

  if (invoiceItemString) {
    try {
      invoiceData = JSON.parse(decodeURIComponent(invoiceItemString));
    } catch (error) {
      handleApiError(error);
    }
  }

  const addCustomItem = () => {
    const newCustomItem = {
      customItem: "Custom item",
      customValue: 0.0,
    };
    setCustomItems([...customItems, newCustomItem]);
  };

  const handleCustomItemChange = (e, customIndex, field) => {
    const updatedItems = [...customItems];
    if (field === "customValue") {
      const inputValue = e.target.value.trim();
      updatedItems[customIndex][field] =
        inputValue !== "" ? parseFloat(inputValue) : 0;
    } else {
      updatedItems[customIndex][field] = e.target.value;
    }
    setCustomItems(updatedItems);
  };

  const handleDeleteCustomItem = (customIndex) => {
    const updatedItems = customItems.filter(
      (_, index) => index !== customIndex
    );
    setCustomItems(updatedItems);
  };

  const calculateMonthlyTotal = () => {
    const monthlyTotal =
      parseFloat(invoiceData.invoice_item.monthlyTotals) +
      customItems.reduce((acc, item) => acc + parseFloat(item.customValue), 0);

    return monthlyTotal.toFixed(2);
  };

  const downloadPDF = async () => {
    console.log("createPDF clicked");
    axios({
      url: `${HOST_URL}${REST_API.Invoice.DownloadPDF}${invoiceData.invoice_item.rbUserId}`,
      method: "GET",
      responseType: "blob",
    })
      .then((res) => {
        const blob = new Blob([res.data], { type: "application/pdf" });
        const href = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = href;
        link.setAttribute(
          "download",
          `${invoiceData.invoice_item.name}_Invoice_${new Date()
            .toISOString()
            .slice(0, 10)}.pdf`
        );
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  return (
    <>
      <Head>
        <title>Invoice</title>
      </Head>

      <div id="invoice-container" className="container mx-auto p-4 mt-4">
        <div className="flex justify-between">
          <div>
            {/* Logo or brand */}
            <a href="/">
              <Image
                src="/_next/static/media/connextar-logo-dark.1acfc47a.png"
                alt="Connextar Logo"
                width={200}
                height={58}
                priority
              />
            </a>
            <h1 className="text-2xl font-bold my-4">
              {invoiceData.invoice_item.name}
            </h1>

            <div className="mb-4">
              <p className="font-bold py-2">Bill To:</p>
              <span className="text-md">
                {invoiceData.invoice_item.companyName}
                <br />
                {invoiceData.invoice_item.companyAddress}
                <br />
              </span>
            </div>
          </div>
          <div className="text-right flex flex-col justify-end mb-[16px]">
            <p className="font-normal py-0 text-left">
              <span className="font-semibold">Invoice Number: #</span>
              {invoiceData.invoice.invoiceNo}
            </p>
            <p className="font-normal py-1 text-left">
              <span className="font-semibold">Date:</span>{" "}
              {invoiceData.invoice_item.invoiceDate}
            </p>
            <p className="font-normal py-0 text-left">
              <span className="font-semibold">Due Date:</span>{" "}
              {invoiceData.invoice_item.invoiceDueDate}
            </p>
          </div>
        </div>
        <table className="w-full mt-8">
          <thead>
            <tr>
              <th className="border px-4 py-2 bg-slate-50">Project</th>
              <th className="border px-4 py-2 bg-slate-50 pl-2.5 pr-2.5">
                Period
              </th>
              <th className="border px-4 py-2 bg-slate-50">Rate</th>
              <th className="border px-4 py-2 bg-slate-50">Hours</th>
              <th className="border px-4 py-2 bg-slate-50">Charges</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.invoice_item.loggingsData.map((logData, logIndex) => (
              <React.Fragment key={logIndex}>
                {logData.projectLoggingsData.map(
                  (projectData, projectIndex) => (
                    <tr key={projectIndex}>
                      <td className="border px-8 py-2 text-center">
                        {projectData.projectName}
                      </td>
                      <td className="border px-6 py-2 text-center pl-2.5 pr-2.5">
                        {projectData.range}
                      </td>
                      <td className="border px-8 py-2 text-center">
                        {invoiceData.invoice_item.currency}
                        {projectData.hourlyRate}
                      </td>
                      <td className="border px-8 py-2 text-center">
                        {projectData.weeklyTotalLoggedHours.toFixed(2)}
                      </td>
                      <td className="border px-8 py-2 text-center">
                        {projectData.weeklyTotals.toFixed(2)}
                      </td>
                    </tr>
                  )
                )}

                {/* Custom Items */}
                {customItems.map((customItem, customIndex) => (
                  <tr key={`custom-${customIndex}`}>
                    <td className="border px-8 py-2 text-center" colSpan="2">
                      <input
                        type="text"
                        value={customItem.customItem}
                        onChange={(e) =>
                          handleCustomItemChange(e, customIndex, "customItem")
                        }
                        className="text-center w-full bg-transparent border-none outline-none"
                      />
                    </td>
                    <td className="border px-6 py-2 text-center pl-2.5 pr-2.5">
                      <input
                        type="text"
                        value={customItem.customValue}
                        onChange={(e) =>
                          handleCustomItemChange(e, customIndex, "customValue")
                        }
                        className="text-center w-full bg-transparent border-none outline-none"
                      />
                    </td>
                    <td className="border px-8 py-2 text-center"></td>{" "}
                    {/* Empty cell */}
                    <td className="border px-6 py-2 text-center">
                      <button
                        className="text-gray-700 hover:text-gray-800"
                        onClick={() => handleDeleteCustomItem(customIndex)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/*Total*/}
        <div className="text-right flex flex-col justify-end my-8">
          <p className="font-bold">
            <span className="font-semibold">Total Logged Hours: </span>
            {invoiceData.invoice_item.totalLoggedHours.toFixed(2)}
          </p>
          <p className="font-bold">
            <span className="font-semibold">Monthly Total: </span>{" "}
            {invoiceData.invoice_item.currency} {calculateMonthlyTotal()}
          </p>
        </div>

        {/* Button for adding custom items */}
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white py-1 px-2 rounded mr-2"
          onClick={addCustomItem}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Line Item
        </button>

        {/* Section for download, email, and share buttons */}
        <div className="inline float-right justify-end py-4 px-6 text-gray-500 hover:text-gray-800 mt-8">
          <button
            className="relative text-gray-500 hover:text-gray-600 px-2 mr-4"
            onClick={() => downloadPDF()}
          >
            <FontAwesomeIcon icon={faDownload} />
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-4 text-xs font-bold text-gray-800">
              Download
            </span>
          </button>

          <button className="relative text-gray-500 hover:text-gray-800 px-2 mr-4">
            <FontAwesomeIcon icon={faEnvelope} />
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-4 text-xs font-bold text-gray-800">
              Email
            </span>
          </button>

          <button className="relative text-gray-500 hover:text-gray-800">
            <FontAwesomeIcon icon={faShare} />
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-4 text-xs font-bold text-gray-800">
              Share
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Invoice;
