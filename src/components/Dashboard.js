import React from 'react'
import Link from 'next/link'

export default function Dashboard({ projects, userData }) {
    return <>
        {console.log(userData)}
        <div className="flex h-screen overflow-x-hidden h-full">

            <div className="px-4 py-2 bg-gray-200 bg-indigo-600 lg:w-1/5">
                <svg xmlns="http://www.w3.org/2000/svg" className="inline w-8 h-8 text-white lg:hidden" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <div className="my-2">
                    <h1 className="text-2xl font-bold text-white inline">Welcome User!</h1>

                    <span className=''>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 ml-3 mb-4 inline text-white  hover:text-red-400 cursor-pointer fixed bottom-0 left-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                    </span>

                </div>
                {projects.map(project => (
                    <h1 className='text-white text-2xl'>{project.name}</h1>

                ))}


            </div>
            <div className="w-full px-4 py-2 bg-gray-200 lg:w-full">
                <div className="container mx-auto mt-14">
                    <Link href="/invoice">
                        <button className='bg-blue-600 px-2 py-2 text-white rounded-lg hover:bg-blue-700 mb-3 absolute right-2.5 top-1 mt-2'>Generate Invoice</button>
                    </Link>
                    <div className="grid gap-4 lg:grid-cols-2">
                        <div className="flex items-center px-4 py-6 bg-white rounded-md shadow-md">
                            <div className="p-3 bg-indigo-600 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>

                            </div>
                            <div className="mx-4">
                                <h4 className="text-2xl font-semibold text-gray-700">100</h4>
                                <div className="text-gray-500">Last Week Hours</div>
                            </div>
                        </div>
                        <div className="flex items-center px-4 py-6 bg-white rounded-md shadow-md">
                            <div className="p-3 bg-indigo-600 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                </svg>

                            </div>
                            <div className="mx-4">
                                <h4 className="text-2xl font-semibold text-gray-700">30</h4>
                                <div className="text-gray-500">Last Month Hours</div>
                            </div>
                        </div>
                        {/* <div className="flex items-center px-4 py-6 bg-white rounded-md shadow-md">
                            <div className="p-3 bg-indigo-600 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" stroke-linejoin="round" strokeWidth="2"
                                        d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="mx-4">
                                <h4 className="text-2xl font-semibold text-gray-700">1000</h4>
                                <div className="text-gray-500">All Transaction</div>
                            </div>
                        </div> */}

                    </div>
                    <div className="flex flex-col mt-8">
                        <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">

                            <div
                                className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                                <table className="min-w-full">
                                    <thead>
                                        <tr>
                                            <th
                                                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                                Task Name</th>
                                            <th
                                                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                                Project Name</th>
                                            <th
                                                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                                Logging Time</th>
                                            <th
                                                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                                Logged Hours</th>
                                            <th
                                                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                                Active</th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white">
                                        {userData.map((data, id) => (

                                            <tr key={id}>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <div className="flex items-center">
                                                        {/* <div className="flex-shrink-0 w-10 h-10">
                                                        <img className="w-10 h-10 rounded-full"
                                                            src="https://source.unsplash.com/user/erondu"
                                                            alt="admin dashboard ui" />
                                                    </div> */}

                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium leading-5 text-gray-900">
                                                                {data.task.name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-sm leading-5 text-gray-500">{data.project.name}</div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <span
                                                        className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800">{data.timeTrackingOn}</span>
                                                </td>

                                                <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                                    <span
                                                        className="inline-flex px-2 text-xs font-semibold">{Math.floor(data.minutes / 60)}</span>
                                                </td>
                                                <td
                                                    className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                                    <span
                                                        className="inline-flex px-2 text-xs font-semibold">Yes</span>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </>
}