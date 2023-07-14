import axios from 'axios';
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { getServerSession } from "next-auth";
import $ from 'jquery';
import { authOptions } from "@/pages/api/auth/[...nextauth]";


export async function getServerSideProps(ctx) {
    const { User, Task, Project, Logging } = require('../../data/dataModel');

    const session = await getServerSession(ctx.req, ctx.res, authOptions);
    const user = await User.findOne({ email: session.user.email }).lean();
    return {
        props: {
            user: JSON.parse(JSON.stringify(user)),
        }
    }
}


export default function GenerateInvoice({ user }) {
    const { rbUserId: newUserId } = user;

    useEffect(() => {

        const selectMonth = document.getElementById('monthSelect');
        const currentMonth = new Date().getMonth() + 1;
        selectMonth.value = currentMonth.toString();

        const selectYear = document.getElementById('yearSelect');
        const currentYear = new Date().getFullYear();
        selectYear.value = currentYear.toString();

    }, [])


    return <>
        <Head>
            <title>
                Generate Invoice
            </title>
        </Head>

        <div className='bg-gray-100 min-h-screen'>
            <div className="container max-w-3xl mx-auto ">
                <div className="text-3xl font-semibold text-center mb-5">
                    Invoice Generator
                </div>
                <div className="p-5 border-2 rounded-lg border-[1px] border-gray-400 shadow-sm bg-white">
                    <div className="mt-1 mb-2">

                        <form target="_blank" className="mb-5 mt-5" action='/dashboard/invoice'>

                            <div className="text-center text-2xl font-medium mb-2">
                                Generate Monthly Invoice
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="mt-1 space-y-2">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">User</label>
                                    <select
                                        name="userId"
                                        className="p-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        <option value={newUserId}>{user.name}</option>
                                    </select>
                                </div>

                                <div className="mt-1 space-y-2">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Select Month</label>
                                    <select
                                        name="month"
                                        id="monthSelect"
                                        defaultValue={'1'}
                                        className="p-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                        <option value="4">April</option>
                                        <option value="5">May</option>
                                        <option value="6">June</option>
                                        <option value="7">July</option>
                                        <option value="8">August</option>
                                        <option value="9">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>
                                </div>

                                <div className="mt-1 space-y-2">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Select Year</label>
                                    <select name="year"
                                        defaultValue={'2023'}
                                        id='yearSelect'
                                        className="p-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                    </select>
                                </div>

                                <div className="mt-1 space-y-2">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Hourly Rate</label>
                                    <input type="number" name="hourlyRate" step="any" min="0" className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                                <div className="mt-1 space-y-2">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Invoice No</label>
                                    <input type="number" name="invoiceNo" min="0" className="p-2  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="customItemContainer">

                            </div>
                            <div>
                                <button type="submit" className="addCustomItem p-[4px] mt-3 px-3 text-sm rounded-md text-white bg-pink-500 hover:bg-pink-800">
                                    Add Custom Item
                                </button>
                            </div>

                            {/* <input type="hidden" name="generatePdf" value="1" /> */}
                            <button type="submit" className="p-2 mt-3 px-10 text-sm rounded-md text-white bg-blue-500 hover:bg-blue-800">
                                Generate Invoice
                            </button>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    </>
}
