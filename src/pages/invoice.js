import Head from 'next/head'
import React, { useState } from 'react'
import { generateInvoiceData, generatePdfInvoice } from '@/data/util';
import { getSession } from 'next-auth/react';

export async function getServerSideProps(ctx) {
    const { User } = require('../data/dataModel');

    const { req } = ctx;
    const session = await getSession({ req })
    const user = await User.findOne({ email: session.user.email }).lean();
    console.log('User Inside invoice', user)

    console.log(ctx.query)
    const { month, year, userId, hourlyRate, invoiceNo, customItem, customValue } = ctx.query;
    var data = await generateInvoiceData(month, year, userId, hourlyRate, invoiceNo, customItem, customValue);
    // console.log(data)
    // if (generatePdf) {
    //     const invoiceFile = await generatePdfInvoice(data);
    //     res.download(invoiceFile);
    // } else {
    //     res.render('generateInvoice', { data });
    // }


    return {
        props: {
            data: JSON.parse(JSON.stringify(data)),
            user: JSON.parse(JSON.stringify(user))
        }
    }
}

export default function Invoice({ data, user }) {
    return <>
        {console.log(data)}
        <Head>
            <title>Create Invoice</title>
        </Head>
        <div className="max-w-[85rem] mx-auto p-5">
            <div className="sm:w-11/12 lg:w-3/4">
                <div className="flex flex-col p-4">
                    <div className="flex justify-between">
                        <div className="font-semibold text-xl"> {user.name} </div>
                        <div className="text-right">
                            <h2 className="text-5xl">INVOICE</h2>
                            <span className="mt-1 block text-2xl text-gray-500">#{data.invoiceNo}</span>
                        </div>
                    </div>
                    <div className="mt-10">
                        <table className="w-full text-sm text-left text-gray-500">
                            <tbody>
                                <tr>
                                    <td className="text-md text-gray-500">Bill To:</td>
                                    <td className="text-md text-gray-500 text-right">Date:</td>
                                    <td className="text-md text-black text-right"> {data.invoiceDate} </td>
                                </tr>
                                <tr>
                                    <td className="text-md text-md font-semibold text-black">{data.companyName.toUpperCase()}</td>
                                    <td className="text-md text-gray-500 text-right">Due Date:</td>
                                    <td className="text-md text-black text-right">{data.invoiceDueDate}</td>
                                </tr>
                                <tr>
                                    <td className="text-md ">{data.companyAddress.toUpperCase()}</td>
                                    <td className="text-md font-semibold text-black text-right">
                                        Balance Due:
                                    </td>
                                    <td className="text-md font-semibold text-black text-right">{data.currency} {data.monthlyTotals} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="border border-gray-400 rounded-lg mt-10">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase">
                                <tr className="border-b border-gray-400 ">
                                    <th className="px-6 py-3 w-full text-white bg-[#232e38] rounded-tl-[7px]">Project</th>
                                    <th className="px-6 py-3 text-white bg-[#232e38]">Hours</th>
                                    <th className="px-6 py-3 text-white bg-[#232e38]">Rate</th>
                                    <th className="px-6 py-3 text-white bg-[#232e38] rounded-tr-[7px]">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.loggingsData.map((project, index) => (
                                    <React.Fragment key={index}>

                                        {project.projectLoggingsData.map((weeklyLogging, index) => (
                                            <tr className={`border-b ${!data.customItems && index === project.projectLoggingsData.length - 1 ? 'border-transparent' : 'border-gray-400'}`} key={index}>
                                                <td className="px-6 py-4 text-black"> {project.name}  - Work done from  {weeklyLogging.range}</td>
                                                <td className="px-6 py-4 text-black whitespace-nowrap"> {weeklyLogging.weeklyTotalLoggedHours} </td>
                                                <td className="px-6 py-4 text-black whitespace-nowrap"> {data.currency}  {data.hourlyRate} </td>
                                                <td className="px-6 py-4 text-black whitespace-nowrap"> {data.currency}  {weeklyLogging.weeklyTotals} </td>
                                            </tr>
                                        ))}

                                    </React.Fragment>
                                ))}
                                    
                                {data.customItems && data.customItems.length ?
                                    data.customItems.map((cI, index) => (
                                      

                                <tr className={`border-b ${index === data.customItems.length - 1 ? 'border-transparent' : 'border-gray-400'}`} key={index}>
                                    <td className="px-6 py-4 text-black"> {cI.item} </td>
                                    <td className="px-6 py-4 text-black whitespace-nowrap"></td>
                                    <td className="px-6 py-4 text-black whitespace-nowrap"></td>
                                    <td className="px-6 py-4 text-black whitespace-nowrap"> {data.currency}  {cI.value} </td>
                                </tr>
                                    )) : ''}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-10">
                        <table className="w-full text-sm text-left text-gray-500">
                            <tbody>
                                <tr>
                                    <td className="px-12"></td>
                                    <td className="text-md text-gray-500 text-right">Total Logged Hours:</td>
                                    <td className="text-md text-black text-right"> {data.totalLoggedHours} </td>
                                </tr>
                                <tr>
                                    <td className="px-12"></td>
                                    <td className="text-md text-gray-500 text-right">Total:</td>
                                    <td className="text-md text-black text-right"> {data.currency}  {data.monthlyTotals} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
}
