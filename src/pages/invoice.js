import Head from 'next/head'
import React, { useState } from 'react'

export async function getServerSideProps() {
    try {
        const response = await fetch('http://localhost:3000/api/hello');
        const data = await response.json();
        console.log(data)

        return {
            props: {
                data,
            },
        };

    } catch (error) {
        console.error(error);
        return {
            props: {
                data: null,
            },
        };
    }
}

export default function Invoice() {
    return <>
        <Head>
            <title>Create Invoice</title>
        </Head>
        <div class="max-w-[85rem] mx-auto p-5">
            <div class="sm:w-11/12 lg:w-3/4">
                <div class="flex flex-col p-4">
                    <div class="flex justify-between">
                        <div class="font-semibold text-xl"> name </div>
                        <div class="text-right">
                            <h2 class="text-5xl">INVOICE</h2>
                            <span class="mt-1 block text-2xl text-gray-500">#  invoiceNo </span>
                        </div>
                    </div>
                    <div class="mt-10">
                        <table class="w-full text-sm text-left text-gray-500">
                            <tbody>
                                <tr>
                                    <td class="text-md text-gray-500">Bill To:</td>
                                    <td class="text-md text-gray-500 text-right">Date:</td>
                                    <td class="text-md text-black text-right"> invoiceDate </td>
                                </tr>
                                <tr>
                                    <td class="text-md text-md font-semibold text-black">
                                        {process.env.NEXT_PUBLIC_INVOICE_COMPANY_NAME}
                                    </td>
                                    <td class="text-md text-gray-500 text-right">Due Date:</td>
                                    <td class="text-md text-black text-right"> invoiceDueDate </td>
                                </tr>
                                <tr>
                                    <td class="text-md"> {process.env.NEXT_PUBLIC_INVOICE_COMPANY_ADDRESS} </td>
                                    <td class="text-md font-semibold text-black text-right">
                                        Balance Due:
                                    </td>
                                    <td class="text-md font-semibold text-black text-right"> currency  monthlyTotals </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="border border-gray-400 rounded-lg mt-10">
                        <table class="w-full text-sm text-left text-gray-500">
                            <thead class="text-xs text-gray-700 uppercase">
                                <tr class="border-b border-gray-400">
                                    <th class="px-6 py-3 w-full">Project</th>
                                    <th class="px-6 py-3">Hours</th>
                                    <th class="px-6 py-3">Rate</th>
                                    <th class="px-6 py-3">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b border-gray-400">
                                    <td class="px-6 py-4 text-black"> project.name  - Work done from  weeklyLogging.range </td>
                                    <td class="px-6 py-4 text-black whitespace-nowrap"> weeklyLogging.weeklyTotalLoggedHours </td>
                                    <td class="px-6 py-4 text-black whitespace-nowrap"> currency  hourlyRate </td>
                                    <td class="px-6 py-4 text-black whitespace-nowrap"> currency  weeklyLogging.weeklyTotals </td>
                                </tr>
                                <tr class="border-b border-gray-400">
                                    <td class="px-6 py-4 text-black"> cI.item </td>
                                    <td class="px-6 py-4 text-black whitespace-nowrap"></td>
                                    <td class="px-6 py-4 text-black whitespace-nowrap"></td>
                                    <td class="px-6 py-4 text-black whitespace-nowrap"> currency  cI.value </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-10">
                        <table class="w-full text-sm text-left text-gray-500">
                            <tbody>
                                <tr>
                                    <td class="px-12"></td>
                                    <td class="text-md text-gray-500 text-right">Total Logged Hours:</td>
                                    <td class="text-md text-black text-right"> totalLoggedHours </td>
                                </tr>
                                <tr>
                                    <td class="px-12"></td>
                                    <td class="text-md text-gray-500 text-right">Total:</td>
                                    <td class="text-md text-black text-right"> currency  monthlyTotals </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
}
