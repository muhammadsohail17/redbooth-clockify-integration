import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import { registerUser } from "@/data/dataModel";
import Router from "next/router";

export async function getServerSideProps(ctx) {

    const { token, email } = ctx.query;
    let resetPassword = false;
    let emailForReset = null; // Assign a default value of null

    if (token) {
        const user = await registerUser.findOne({ verificationToken: token });
        if (user) {
            resetPassword = true;
            user.verificationToken = false;
            await user.save();
        }
    }

    if (email) {
        emailForReset = email; // Assign the value of `email` to `emailForReset`
    }

    return {
        props: {
            resetPassword,
            emailForReset,
        },
    };
}



export default function sendLink({ resetPassword, emailForReset }) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState({ status: null, text: "" });
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.post('/api/sendlink', { email: email });
            console.log(result);
            setMessage({ status: 1, text: result.data })
            console.log(message)
        } catch (error) {
            console.log(error); // Log the error on the frontend
            // Pass the error back to the backend
            // axios.post('/api/error', { error: error.message });
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        console.log(password, confirmPassword);

        try {
            const result = await axios.post('/api/resetPassword', { password, confirmPassword, emailForReset })
            console.log(result)
            if (result.data.status == 1) {
                Router.replace('/login')
            } else {
                setMessage({ status: 0, text: result.data.message });
            }
        } catch (error) {
            console.log(error)
            // setMessage({ status: 0, text:  })
        }

    }



    return <>
        <Head>
            <title>Redbooth + Clockify Integration</title>
        </Head>
        <section className="py-24 lg:py-28 bg-cyan-600 h-screen overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="max-w-3xl mx-auto">
                    {resetPassword ? <div>
                        <h2 className="font-serif m-2 text-4xl text-white tracking-tighter">Choose a new password</h2>
                        <form onSubmit={handlePasswordSubmit}>
                            <div className="w-full md:w-1/2 p-3">
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
                                <label className="block">
                                    <input onChange={(e) => setPassword(e.target.value)} name="password" className="p-4 w-full text-gray-700 tracking-tight bg-white placeholder-gray-700 outline-none border border-gray-600 placeholder-light-gray-700 rounded-lg focus:border-indigo-500 transition duration-200" id="password" type="password" placeholder="Password" required />
                                </label>
                            </div>
                            <div className="w-full md:w-1/2 p-3">
                                <label className="block">
                                    <input onChange={(e) => setConfirmPassword(e.target.value)} name="confirmpassword" className="p-4 w-full text-gray-700 tracking-tight bg-white placeholder-gray-700 outline-none border border-gray-600 placeholder-light-gray-700 rounded-lg focus:border-indigo-500 transition duration-200" id="confirmpassword" type="password" placeholder="Confirm Password" required />
                                </label>
                            </div>

                            <div className="w-full md:w-1/2 p-3">
                                <button type="submit" className="p-4 w-full text-white font-semibold  bg-indigo-500 hover:bg-indigo-600 outline-none border border-gray-600 rounded-lg focus:border-indigo-500 transition duration-200">Reset</button>
                            </div>
                        </form>
                    </div> : <div> {
                        message.status == 1 ? <div><h4 className="font-serif mb-4 text-5xl text-white tracking-tighter">Reset Link Sent!</h4>
                            `<p className="mb-7 text-xl text-white tracking-tight">If the email address <strong>{email}</strong> is registered, an email will be sent to you with instructions on how to retrieve your password.</p>`
                            <p className="mb-7 text-xl text-white tracking-tight">Additionally, please remember to check your spam folder if you can't locate the email. Once you receive it, simply follow the link provided in the email to log in to the Redbooth and Clockify integration.</p></div>
                            : <div><h2 className="font-serif mb-4 text-6xl text-white tracking-tighter">Have You Forgotten Your Password?</h2>
                                <p className="mb-7 text-xl text-white tracking-tight">Redbooth and Clockify integration.</p>
                                <div className=" p-px bg-transparent overflow-hidden rounded-lg">
                                    <p className="text-white transition duration-200 ml-2">We can send you a link to reset it.</p>
                                </div>
                                <form onSubmit={handleFormSubmit}  >
                                    <div className="w-full md:w-1/2 p-3">
                                        <label className="block">
                                            <div className="mb-2 text-white font-semibold">
                                                <span>
                                                    Email
                                                </span>
                                            </div>
                                            <input onChange={(e) => setEmail(e.target.value)} value={email} name="email" className="p-4 w-full text-gray-700 tracking-tight bg-white placeholder-gray-700 outline-none border border-gray-600 placeholder-light-gray-700 rounded-lg focus:border-indigo-500 transition duration-200" id="email" type="text" placeholder="you@example.com" required />
                                        </label>
                                    </div>

                                    <div className="w-full md:w-1/2 p-3">
                                        <button type="submit" className="p-4 w-full text-white font-semibold  bg-indigo-500 hover:bg-indigo-600 outline-none border border-gray-600 rounded-lg focus:border-indigo-500 transition duration-200">Send Link</button>
                                    </div>
                                </form></div>
                    } </div>}
                </div>
            </div>
        </section>
    </>
}