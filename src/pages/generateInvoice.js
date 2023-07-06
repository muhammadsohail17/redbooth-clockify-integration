import axios from 'axios';
import Head from 'next/head'
import React, { useState } from 'react'
import { getSession } from 'next-auth/react';


export async function getServerSideProps({ req }) {
    const { User, Task, Project, Logging } = require('../data/dataModel');

    const session = await getSession({ req })
    const user = await User.findOne({ email: session.user.email }).lean();
    return {
        props: {
            user: JSON.parse(JSON.stringify(user)),
        }
    }
}

export default function GenerateInvoice({ user }) {
    const { rbUserId: newUserId } = user;
    const [formData, setFormData] = useState({
        month: '1',
        year: '2023',
        userId: newUserId,
        hourlyRate: '',
        invoiceNo: '',
        customItem: null,
        customValue: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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

                        <form target="_blank" className="mb-5 mt-5" action='/invoice'>

                            <div className="text-center text-2xl font-medium mb-2">
                                Generate Monthly Invoice
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="mt-1 space-y-2">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">`Select` User</label>
                                    <select
                                        name="userId"
                                        value={user.rbUserId}
                                        onChange={handleChange}
                                        className="p-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        <option value={user.rbUserId}>{user.name}</option>
                                    </select>
                                </div>

                                <div className="mt-1 space-y-2">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Select Month</label>
                                    <select
                                        name="month"
                                        value={formData.month}
                                        onChange={handleChange}
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
                                        value={formData.year}

                                        onChange={handleChange}
                                        className="p-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        <option value="2023" defaultValue>2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                    </select>
                                </div>

                                <div className="mt-1 space-y-2">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Hourly Rate</label>
                                    <input onChange={handleChange} value={formData.hourlyRate} type="number" name="hourlyRate" step="any" min="0" className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                                <div className="mt-1 space-y-2">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Invoice No</label>
                                    <input onChange={handleChange} value={formData.invoiceNo} type="number" name="invoiceNo" min="0" className="p-2  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            {/* <input type="hidden" name="generatePdf" value="1" /> */}
                            <button type="submit" className="p-2 mt-3 px-10 text-sm rounded-md text-white bg-blue-500 hover:bg-blue-800">
                                Generate Invoice
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}
