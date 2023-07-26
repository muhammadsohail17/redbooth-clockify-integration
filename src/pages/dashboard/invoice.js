import Head from 'next/head'
import React, { createContext, useEffect, useState } from 'react'
import { generateInvoiceData, renderedInvoiceData, formatNumber } from '@/data/util';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
const axios = require("axios")


export async function getServerSideProps(ctx) {
    const { User } = require('../../data/dataModel');

    const session = await getServerSession(ctx.req, ctx.res, authOptions);
    const user = await User.findOne({ email: session.user.email }).lean();
    // console.log('User Inside invoice', user)
    // console.log('ctx.query', ctx.query)

    const { month, year, userId, hourlyRate, invoiceNo } = ctx.query;
    var data = await generateInvoiceData(month, year, userId, hourlyRate, invoiceNo);
    // console.log('data', data)
    // const invoiceDefaultData = renderedInvoiceData(data);
    // console.log("invoiceDefaultData", invoiceDefaultData)

    return {
        props: {
            data: JSON.parse(JSON.stringify(data)),
            user: JSON.parse(JSON.stringify(user)),
            // invoiceDefaultData: JSON.parse(JSON.stringify(invoiceDefaultData)),
            queryData: {
                month,
                year,
                userId,
                hourlyRate,
                invoiceNo,
            }
        }
    }
}

const Invoice = ({ data, user, queryData }) => {
    const [invoiceData, setInvoiceData] = useState(renderedInvoiceData(data));
    const [invoiceItems, setInvoiceItems] = useState([{
        project: '',
        period: '',
        rate: '',
        hours: '',
        charges: ''
    }]);

    const [showInputs, setShowInputs] = useState(true);
    const [totalHours, setTotalHours] = useState(parseFloat(data.totalLoggedHours));

    ////// Function to add a new line to invoiceItems

    const addLine = () => {
        setInvoiceItems(prevItems => [
            ...prevItems,
            {
                project: '',
                period: '',
                rate: '',
                hours: '',
                charges: ''
            }
        ]);
        setShowInputs(true);
    };

    ////// Function to delete a line from invoiceItems

    const deleteLine = (index) => {
        setInvoiceItems(prevItems => {
            const updatedItems = [...prevItems];
            updatedItems.splice(index, 1);
            return updatedItems;
        });
    };

    ////// Function to format a number with commas for thousands separator

    ////// Function to handle input change in invoiceItems

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;

        const updatedItems = [...invoiceItems];
        updatedItems[index] = {
            ...updatedItems[index],
            [name]: value
        };

        if (name === 'rate' || name == 'hours') {
            updatedItems[index].charges = calculateSubtotal(
                updatedItems[index].rate,
                updatedItems[index].hours
            );
        }
        // Update the total hours when hours are changed
        if (name === 'hours') {
            const newTotalHours = invoiceItems.reduce((total, item) => {
                const itemHours = parseFloat(item.hours);
                return itemHours ? total + itemHours : total;
            }, 0);
            setTotalHours(parseFloat(data.totalLoggedHours) + newTotalHours);
        }
        setInvoiceItems(updatedItems);
        setInvoiceData(prevItems => {
            console.log(renderedInvoiceData(data, updatedItems))
            return renderedInvoiceData(data, updatedItems);
        })
    };

    ////// Function to calculate the subtotal of a line item

    const calculateSubtotal = (rate, hours) => {
        if (rate && hours) {
            return parseFloat(rate * hours).toFixed(2);
        } else if (rate) {
            return parseFloat(rate).toFixed(2);
        }
        return 0;
    };

    ////// Function to handle download invoice


    const handleDownloadInvoice = async () => {


        // console.log('Download Invoice');

        try {
            const requestData = { queryData, invoiceData };
            // Make the API call using Axios

            const response = await axios.post('/api/generate', requestData);

            // API call was successful, process the response here
            console.log('API Response:', response);
        } catch (error) {
            // Handle errors if the API call was not successful
            console.error('API Error:', error);
        }
    };



    ////// Mouse enter and leave event handlers for download email, and share buttons

    const [showDownloadText, setShowDownloadText] = useState(false);
    const [showEmailText, setShowEmailText] = useState(false);
    const [showShareText, setShowShareText] = useState(false);
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
        // setInvoiceData(renderedInvoiceData(data, invoiceItems));
        // console.log('invoiceItems', invoiceItems)
        // console.log('invoiceData', invoiceData)
    }, [invoiceItems])

    const handleDownloadMouseEnter = () => {
        setShowDownloadText(true);
    };

    const handleDownloadMouseLeave = () => {
        setShowDownloadText(false);
    };

    const handleEmailMouseEnter = () => {
        setShowEmailText(true);
    };

    const handleEmailMouseLeave = () => {
        setShowEmailText(false);
    };

    const handleShareMouseEnter = () => {
        setShowShareText(true);
    };

    const handleShareMouseLeave = () => {
        setShowShareText(false);
    };

    ////// Calculate total hours

    const totalLoggedHours = parseFloat(data.totalLoggedHours);
    const customHours = invoiceItems.reduce((total, item) => {
        const itemHours = parseFloat(item.hours);
        return itemHours ? total + itemHours : total;
    }, 0);
    const updatedTotalHours = totalLoggedHours + customHours;

    const confirmInvoice = () => {
        console.log('invoiceData', invoiceData)
    }


    return (
        <>
            {domLoaded && (
                <>

                    <Head>
                        <title>Create Invoice</title>
                    </Head>

                    <div id="invoice-container" className="container mx-auto p-4">
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
                                <hr className="border-double border-2 border-black mb-4" />
                                <div className="mb-4">
                                    <p className="font-bold py-2">Bill To:</p>
                                    <span className="text-md">
                                        Connextar Technologies Ltd
                                        <br />
                                        39 Seldon Street, Bradford,
                                        <br />
                                        BD5 9HH
                                    </span>
                                </div>
                            </div>
                            <div className='text-right flex flex-col justify-end mb-[16px]'>
                                <p className="font-semibold py-0 text-left">Invoice Number: # {data.invoiceNo}</p>
                                <p className="font-semibold py-1 text-left">Issue Date: {data.invoiceDate}</p>
                                <p className="font-semibold py-0 text-left">Due Date: {data.invoiceDueDate}</p>
                            </div>
                        </div>
                        <table className="N01 w-full mt-8">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2 bg-slate-50">Project</th>
                                    <th className="border px-4 py-2 bg-slate-50 pl-2.5 pr-2.5">Period</th>
                                    <th className="border px-4 py-2 bg-slate-50">Rate</th>
                                    <th className="border px-4 py-2 bg-slate-50">Hours</th>
                                    <th className="border px-4 py-2 bg-slate-50">Charges</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoiceData.renderedInvoiceData.map((invoiceItem, index) => (
                                    !invoiceItem.customItem ?
                                        <tr key={index}>
                                            <td className="border px-8 py-2 text-center">{invoiceItem.project}</td>
                                            <td className="border px-6 py-2 text-center pl-2.5 pr-2.5">{invoiceItem.period}</td>
                                            <td className="border px-8 py-2 text-center">{data.currency} {invoiceItem.rate}</td>
                                            <td className="border px-8 py-2 text-center">{invoiceItem.hours}</td>
                                            <td className="border px-8 py-2 text-center">{data.currency} {invoiceItem.charges}</td>
                                        </tr> : ''
                                ))}

                                {/* /////// Function for custom UI data fetch  */}

                                {invoiceItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className="N02 border px-4 py-2 text-center" style={{ padding: '0 0 0 0' }}>
                                            {showInputs && (
                                                <input
                                                    name="project"
                                                    value={item.project}
                                                    onChange={(e) => handleInputChange(e, index)}
                                                    className="px-4 py-2 w-full text-center"
                                                    type="text"
                                                    placeholder="Project"
                                                />
                                            )}
                                            {!showInputs && item.project}
                                        </td>
                                        <td className="border px-4 py-2" style={{ padding: '0 0 0 0px' }}>
                                            {showInputs && (
                                                <input
                                                    name="period"
                                                    value={item.period}
                                                    onChange={(e) => handleInputChange(e, index)}
                                                    className="px-4 py-2 w-full text-center"
                                                    type="text"
                                                    placeholder="Period"
                                                />
                                            )}
                                            {!showInputs && item.period}
                                        </td>
                                        <td className="border px-4 py-2 text-right" style={{ padding: '0 0 0 0px' }}>
                                            {showInputs && (
                                                <input
                                                    name="rate"
                                                    value={item.rate}
                                                    onChange={(e) => handleInputChange(e, index)}
                                                    className="px-4 py-2 w-full text-center"
                                                    type="text"
                                                    placeholder="Rate"
                                                />
                                            )}
                                            {!showInputs && item.rate}
                                        </td>
                                        <td className="border px-4 py-2 text-left" style={{ padding: '0 0 0 0px' }}>
                                            {showInputs && (
                                                <input
                                                    name="hours"
                                                    value={item.hours}
                                                    onChange={(e) => handleInputChange(e, index)}
                                                    className="px-4 py-2 w-full text-center"
                                                    type="text"
                                                    placeholder="Hours"
                                                />
                                            )}
                                            {!showInputs && item.hours}
                                        </td>
                                        <td className="border px-4 py-2 text-center" style={{ padding: '0 0 0 0px' }}>
                                            {showInputs ? (
                                                formatNumber(parseFloat(calculateSubtotal(item.rate, item.hours)).toFixed(2))
                                            ) : (
                                                formatNumber(parseFloat(item.charges).toFixed(2))
                                            )}
                                        </td>
                                    </tr>
                                ))}

                                {/*//////// Function for calculate total hours and rate */}

                                <tr>
                                    <td className="border px-4 py-2 font-bold" colSpan="2"></td>
                                    <td className="border px-6 py-2 font-bold text-center">Total:</td>
                                    <td className="border px-8 py-2 font-bold text-center">
                                        {formatNumber(updatedTotalHours.toFixed(2))}
                                    </td>
                                    <td className="border px-8 py-2 font-bold text-center">
                                        {data.currency}
                                        {invoiceData.invoiceTotals}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/*//////// Section for Confirm, Add, & Cancel buttons */}

                        <div className="flex justify-end mt-4 py-4">

                            {/* Confirm button */}

                            <button
                                className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={confirmInvoice}
                            >Confirm</button>

                            {/* Add button */}

                            {!showInputs && (
                                <button
                                    className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2"
                                    onClick={addLine}
                                >Add</button>
                            )}

                            {/* Cancel button */}

                            {showInputs && (
                                <button
                                    className="bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 rounded mr-2"
                                    onClick={() => {
                                        deleteLine();
                                        setShowInputs(false);
                                    }}
                                >Cancel</button>
                            )}
                        </div>

                        {/* ////// Section for balance due */}

                        <div className="flex justify-end mt-2">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="pr-2 font-bold">Balance Due:</td>
                                        <td className="font-bold">
                                            {data.currency}
                                            {formatNumber((data.monthlyTotals + invoiceItems.reduce((total, item) => {
                                                const subtotal = parseFloat(calculateSubtotal(item.rate, item.hours));
                                                return subtotal ? total + subtotal : total;
                                            }, 0)).toFixed(2)
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* //////// Section for download, email, and share buttons */}

                        <div className="inline float-right justify-end py-4 px-4 text-blue-400 hover:text-blue-600">

                            {/* Download button */}

                            <button className="">
                                <svg
                                    onMouseEnter={handleDownloadMouseEnter}
                                    onMouseLeave={handleDownloadMouseLeave}
                                    onClick={handleDownloadInvoice}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-8 w-8"
                                >
                                    <path d="M21 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                {showDownloadText && (
                                    <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-4 text-xs font-bold text-gray-800">
                                        Download
                                    </span>
                                )}
                            </button>

                            {/* Email button */}

                            {/* <button className="relative text-blue-400 hover:text-blue-600 px-4">
                                <svg
                                    onMouseEnter={handleEmailMouseEnter}
                                    onMouseLeave={handleEmailMouseLeave}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-8 w-8"
                                >
                                    <path d="M22 5.79V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5.79L12 12L22 5.79Z" />
                                </svg>
                                {showEmailText && (
                                    <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-4 text-xs font-bold text-gray-800">
                                        Email
                                    </span>
                                )}
                            </button> */}

                            {/* Share button */}

                            {/* <button className="relative">
                                <svg
                                    onMouseEnter={handleShareMouseEnter}
                                    onMouseLeave={handleShareMouseLeave}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-8 w-8"
                                >
                                    <circle cx="18" cy="5" r="3" />
                                    <circle cx="6" cy="12" r="3" />
                                    <circle cx="18" cy="19" r="3" />
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                </svg>
                                {showShareText && (
                                    <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-4 text-xs font-bold text-gray-800">
                                        Share
                                    </span>
                                )}
                            </button> */}
                        </div>
                    </div>
                </>
            )}
        </>

    );
};

export default Invoice;