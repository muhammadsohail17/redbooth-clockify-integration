import Head from 'next/head'
import React, { useState } from 'react'
import { generateInvoiceData } from '@/data/util';

export async function getServerSideProps(ctx) {
    console.log(ctx.query)
    const { month, year, userId, hourlyRate, invoiceNo, generatePdf, customItem, customValue } = ctx.query;
    var data = await generateInvoiceData(month, year, userId, hourlyRate, invoiceNo, customItem, customValue);
    console.log(data)
    // if (generatePdf) {
    //     const invoiceFile = await generatePdfInvoice(data);
    //     res.download(invoiceFile);
    // } else {
    //     res.render('generateInvoice', { data });
    // }


    return {
        props: {}
    }
}

export default function Invoice() {
    return <>
        <Head>
            <title>Create Invoice</title>
        </Head>
        <div className="max-w-[85rem] mx-auto p-5">
            <div className="sm:w-11/12 lg:w-3/4">
                <div className="flex flex-col p-4">
                    <div className="flex justify-between">
                        <div className="font-semibold text-xl"> name </div>
                        <div className="text-right">
                            <h2 className="text-5xl">INVOICE</h2>
                            <span className="mt-1 block text-2xl text-gray-500">#  invoiceNo </span>
                        </div>
                    </div>
                    <div className="mt-10">
                        <table className="w-full text-sm text-left text-gray-500">
                            <tbody>
                                <tr>
                                    <td className="text-md text-gray-500">Bill To:</td>
                                    <td className="text-md text-gray-500 text-right">Date:</td>
                                    <td className="text-md text-black text-right"> invoiceDate </td>
                                </tr>
                                <tr>
                                    <td className="text-md text-md font-semibold text-black">
                                        {process.env.NEXT_PUBLIC_INVOICE_COMPANY_NAME}
                                    </td>
                                    <td className="text-md text-gray-500 text-right">Due Date:</td>
                                    <td className="text-md text-black text-right"> invoiceDueDate </td>
                                </tr>
                                <tr>
                                    <td className="text-md"> {process.env.NEXT_PUBLIC_INVOICE_COMPANY_ADDRESS} </td>
                                    <td className="text-md font-semibold text-black text-right">
                                        Balance Due:
                                    </td>
                                    <td className="text-md font-semibold text-black text-right"> currency  monthlyTotals </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="border border-gray-400 rounded-lg mt-10">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase">
                                <tr className="border-b border-gray-400">
                                    <th className="px-6 py-3 w-full">Project</th>
                                    <th className="px-6 py-3">Hours</th>
                                    <th className="px-6 py-3">Rate</th>
                                    <th className="px-6 py-3">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-400">
                                    <td className="px-6 py-4 text-black"> project.name  - Work done from  weeklyLogging.range </td>
                                    <td className="px-6 py-4 text-black whitespace-nowrap"> weeklyLogging.weeklyTotalLoggedHours </td>
                                    <td className="px-6 py-4 text-black whitespace-nowrap"> currency  hourlyRate </td>
                                    <td className="px-6 py-4 text-black whitespace-nowrap"> currency  weeklyLogging.weeklyTotals </td>
                                </tr>
                                <tr className="border-b border-gray-400">
                                    <td className="px-6 py-4 text-black"> cI.item </td>
                                    <td className="px-6 py-4 text-black whitespace-nowrap"></td>
                                    <td className="px-6 py-4 text-black whitespace-nowrap"></td>
                                    <td className="px-6 py-4 text-black whitespace-nowrap"> currency  cI.value </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-10">
                        <table className="w-full text-sm text-left text-gray-500">
                            <tbody>
                                <tr>
                                    <td className="px-12"></td>
                                    <td className="text-md text-gray-500 text-right">Total Logged Hours:</td>
                                    <td className="text-md text-black text-right"> totalLoggedHours </td>
                                </tr>
                                <tr>
                                    <td className="px-12"></td>
                                    <td className="text-md text-gray-500 text-right">Total:</td>
                                    <td className="text-md text-black text-right"> currency  monthlyTotals </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
}
