import Head from "next/head";
import { signIn } from 'next-auth/react'
import { useState } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Router from 'next/router'
import Link from "next/link";



export const getServerSideProps = async (ctx) => {

    var autoFillEmail = ctx.query.email ? ctx.query.email : null;
    const session = await getServerSession(ctx.req, ctx.res, authOptions);

    if (session) {
        return {
            redirect: {
                destination: '/dashboard'
            },
            props: {}
        }
    } else {
        return {
            props: { autoFillEmail }
        }
    }
};


export default function signin({ autoFillEmail }) {
    const [email, setEmail] = useState(autoFillEmail)
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState({ status: null, text: '' });


    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false // Do not redirect, handle the response manually
        })

        console.log(result);
        if (result.ok) {
            Router.replace('/dashboard')
        } else if (result.status == 401) {
            setMessage({ status: 0, text: "Invalid email or password!" })
        }
    }




    return <>
        <Head>
            <title>Redbooth + Clockify Integration</title>
        </Head>
        <section className="py-24 lg:py-28 bg-gray-200 h-screen overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-heading mb-4 text-6xl text-black tracking-tighter">Sign In</h2>
                    <p className="mb-10 text-xl text-black tracking-tight">Redbooth and Clockify integration.</p>
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
                    <form onSubmit={handleSubmit} className="flex flex-wrap -m-3">
                        <div className="w-full md:w-1/2 p-3">
                            <label className="block">
                                <input defaultValue={autoFillEmail ? autoFillEmail : ''} onChange={(e) => setEmail(e.target.value)} name="email" className="p-4 w-full text-gray-700 tracking-tight bg-white placeholder-light-gray-700 outline-none border border-gray-600 rounded-lg focus:border-indigo-500 transition duration-200" id="email" type="text" placeholder="Email" required />
                            </label>
                        </div>
                        <div className="w-full md:w-1/2 p-3">
                            <label className="block">
                                <input onChange={(e) => setPassword(e.target.value)} value={password} name="password" className="p-4 w-full text-gray-700 tracking-tight bg-white placeholder-light-gray-700 outline-none border border-gray-600 rounded-lg focus:border-indigo-500 transition duration-200" id="password" type="password" placeholder="••••••••" required />
                            </label>
                        </div>
                        <div className="flex w-full p-3">
                            <div className="p-px bg-transparent ml-auto overflow-hidden rounded-lg">
                                <span className="font-medium text-white tracking-tight">
                                    <Link className="text-blue-400 hover:underline transition duration-200 ml-2" href="/forgot-password">
                                        'Forgot password?
                                    </Link>
                                </span>
                            </div>
                        </div>
                        <div className="w-full p-3">
                            <button type="submit" className="inline-block mb-7 px-5 py-4 w-full text-white text-center font-semibold border border-gray-600 tracking-tight bg-indigo-500 hover:bg-indigo-600 rounded-lg focus:ring-4 focus:ring-indigo-300 transition duration-200">Login</button>
                            <span className="font-medium text-black tracking-tight">
                                <span>Don't have an account?</span>
                                <a className="text-red-500 hover:text-red-700 transition duration-200 ml-2" href="/signup">Register Here</a>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </>
}