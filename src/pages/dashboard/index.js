import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import connectDB from '../../data/db'
import Dashboard from '../../components/Dashboard'
import { generateInvoiceData } from '../../data/util';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getServerSideProps(ctx) {
    const { User, Project, Task, Logging } = require('../../data/dataModel')
    const session = await getServerSession(ctx.req, ctx.res, authOptions);

    if (session) {
        try {
            await connectDB();
            console.log("Index!", session.user.email)
            const user = await User.findOne({ email: session.user.email }).lean();
            //get rbUserId as userId from user object
            const { rbUserId: userId } = user;
            // get all time user loggings
            const userLoggings = await Logging.find({ rbUserId: 6237218 }).sort({ rbCommentId: -1 }).limit(10).lean();
            const taskIds = userLoggings.map(logging => logging.rbTaskId);
            // Creates an array of taskIds by extracting the rbTaskId property from each object in the userLoggings array
            const userTasks = await Task.find({ rbTaskId: { $in: taskIds } });
            // Finds all tasks where the rbTaskId property is included in the taskIds array and awaits the result
            const projectIds = userTasks.map(task => task.rbProjectId);
            // Creates an array of projectIds by extracting the rbProjectId property from each object in the userTasks array
            const projects = await Project.find({ rbProjectId: { $in: projectIds } }).lean();

            const loggingsWithTasksAndProjects = userLoggings.map(logging => {
                const task = userTasks.find(task => task.rbTaskId === logging.rbTaskId);
                const project = projects.find(project => project.rbProjectId === task.rbProjectId);
                return { ...logging, task, project };
            });
            // const loggingsWithTasks = userLoggings.map(logging => {
            //     const task = userTasks.find(task => task.rbTaskId === logging.rbTaskId);
            //     return { ...logging, task };
            // });
            // console.log("loggingsWithTasksAndProjects", loggingsWithTasksAndProjects)

            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = currentDate.getFullYear();

            var data = await generateInvoiceData(currentMonth, currentYear, userId);


            return {
                props: {
                    user: JSON.parse(JSON.stringify(user)),
                    loggingsWithTasksAndProjects: JSON.parse(JSON.stringify(loggingsWithTasksAndProjects)),
                    projects: JSON.parse(JSON.stringify(projects)),
                    userLoggings: JSON.parse(JSON.stringify(userLoggings)),
                    data: JSON.parse(JSON.stringify(data)),

                },
            };
        } catch (error) {
            console.log(error);
            return {
                notFound: true,
            };
        }

    } else {
        return {
            redirect: { destination: '/login' },
            props: {}
        }
    }
}

export default function Home({ projects, loggingsWithTasksAndProjects, userLoggings, data }) {
    // console.log(loggingsWithTasksAndProjects);

    return <>
        <Head>

            <title>Dashboard</title>
        </Head>
        {/* {console.log('Index', data)} */}

        <Dashboard projects={projects} userData={loggingsWithTasksAndProjects} userLoggings={userLoggings} data={data} />

    </>
}