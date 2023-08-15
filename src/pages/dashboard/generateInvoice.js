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

    return (

        <>
            <Head>
                <title>Generate Invoice</title>
            </Head>

            <div className=" bg-gray-900 min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-semibold text-center mb-6" style={{ marginBottom: '10px' }}>Invoice Generator</h1>
                    <p className='text-gray-500 py-0' style={{ marginBottom: '20px' }}>Provide the following details to Generate your Invoice</p>

                    <form target="_blank" action="/dashboard/invoice">
                        <div className="mb-4">
                            <label htmlFor="userId" className="block text-gray-700 font-medium mb-2">User Name</label>
                            <select
                                id="userId"
                                name="userId"
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value={newUserId}>{user.name}</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="month" className="block text-gray-700 font-medium mb-2">Select Month</label>
                                <select
                                    name="month"
                                    id="monthSelect"
                                    defaultValue={'1'}
                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
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

                            <div>
                                <label htmlFor="year" className="block text-gray-700 font-medium mb-2">Select Year</label>
                                <select
                                    id='yearSelect'
                                    name="year"
                                    defaultValue={'2023'}
                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="hourlyRate" className="block text-gray-700 font-medium mb-2">Hourly Rate</label>
                            <input
                                type="number"
                                id="hourlyRate"
                                placeholder='Rate'
                                name="hourlyRate"
                                step="any"
                                min="0"
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="invoiceNo" className="block text-gray-700 font-medium mb-2">Invoice No</label>
                            <input
                                type="number"
                                id="invoiceNo"
                                placeholder='Invoice'
                                name="invoiceNo"
                                min="0"
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Generate Invoice
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
}