import axios from "axios";
import { useState } from "react";
import Head from "next/head";



export default function signup() {

    const [message, setMessage] = useState({ status: null, text: "" })


    async function handleSubmit(e) {
        e.preventDefault();
        const form = document.getElementById('registerForm');
        const fieldNames = Array.from(form.elements).filter(element => element.type !== 'submit' && element.type !== 'button').map(element => element.name);
        const fields = {};

        for (const fieldName of fieldNames) {
            fields[fieldName] = form.elements[fieldName].value;
        }


        try {
            const result = await axios.post('/api/registerUser', fields);
            console.log(result.data.message)
            setMessage({ status: 1, text: result.data.message })
            e.target.reset();

        } catch (err) {
            console.log(err);
            console.log(err.response.data)
            setMessage({ status: 0, text: err.response.data.error })
        }

    }
    return <>
        <Head>
            <title>Redbooth + Clockify Integration</title>
        </Head>
        <section className="py-24 lg:py-28 bg-cyan-600 h-screen overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="max-w-3xl mx-auto">
                    {message.status == 1 ? <h2 className="font-heading mb-4 text-6xl text-white tracking-tighter">Registration Successful!</h2>
                        : <h2 className="font-heading mb-4 text-6xl text-white tracking-tighter">Create a free account</h2>}
                    <p className=" text-xl text-white tracking-tight">Redbooth and Clockify integration.</p>
                    {message ? (
                        <div
                            className={`flex items-center ${message.status == 0 && 'bg-red-500'} text-white text-sm font-bold px-4 py-3 mb-2`}
                            role='alert'
                        >
                            <p>{`${message.status == 0 ? message.text : ""}`}</p>
                        </div>
                    ) : (
                        ''
                    )}
                    {message.status == 1 ? <p className="mb-5 text-xl text-white tracking-tight">Please check your email to verify your account.</p>
                        : <form onSubmit={handleSubmit} id="registerForm" className="flex flex-wrap -m-3">
                            <div className="w-full md:w-1/2 p-3">
                                <label className="block">
                                    <input className="p-4 w-full text-gray-700 tracking-tight bg-white placeholder-light-gray-700 outline-none border border-gray-600 rounded-lg focus:border-indigo-500 transition duration-200" id="signUpInput1-1" name="fullname" type="text" placeholder="Full Name" required />
                                </label>
                            </div>
                            <div className="w-full md:w-1/2 p-3">
                                <label className="block">
                                    <input className="p-4 w-full text-gray-700 tracking-tight bg-white placeholder-light-gray-700 outline-none border border-gray-600 rounded-lg focus:border-indigo-500 transition duration-200" id="signUpInput1-2" name="email" type="email" placeholder="Email Address" required />
                                </label>
                            </div>
                            <div className="w-full md:w-1/2 p-3">
                                <label className="block">
                                    <input className="p-4 w-full text-gray-700 tracking-tight bg-white placeholder-light-gray-700 outline-none border border-gray-600 rounded-lg focus:border-indigo-500 transition duration-200" id="signUpInput1-3" name="password" type="password" placeholder="Password" required />
                                </label>
                            </div>
                            <div className="w-full md:w-1/2 p-3">
                                <label className="block">
                                    <input className="p-4 w-full text-gray-700 tracking-tight bg-white placeholder-light-gray-700 outline-none border border-gray-600 rounded-lg focus:border-indigo-500 transition duration-200" id="signUpInput1-4" name="confirmpassword" type="password" placeholder="Confirm Password" required />
                                </label>
                            </div>
                            <div className="w-full p-3">
                                <button type="submit" className="inline-block mb-7 px-5 py-4 w-full text-white text-center font-semibold tracking-tight bg-indigo-500 hover:bg-indigo-600 rounded-lg focus:ring-4 focus:ring-indigo-300 transition duration-200" href="#">Create Free Account</button>
                                <span className="font-medium text-white tracking-tight">
                                    <span>Already have an account?</span>
                                    <a className="text-red-500 hover:text-red-700 transition duration-200 ml-2" href="/login">Sign In</a>
                                </span>
                            </div>
                        </form>}

                </div>
            </div>
        </section>
    </>
}