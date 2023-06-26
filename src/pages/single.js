import React from 'react'
import connectDB from "./db";
import Head from 'next/head';
// import { User, Project, Logging, Task} from "./dataModel";


export async function getServerSideProps() {
    const { User, Project, Task, Logging } = require('./dataModel')

    try {
        await connectDB();
        console.log('CONNECTED TO MONGO 1!');
        const user = await User.findOne({ email: 'ufaq3022@gmail.com' }).lean();
        const userLoggings = await Logging.find({ rbUserId: 6237218 }).sort({ rbCommentId: -1 }).limit(30).lean();

        const taskIds = userLoggings.map(logging => logging.rbTaskId);
        const userTasks = await Task.find({ rbTaskId: { $in: taskIds } });
        const projectIds = userTasks.map(task => task.projectId);
        const projects = await Project.find({ rbProjectId: { $in: projectIds } }).lean();
        console.log("projects,", projects)

        // const loggingsWithTasksAndProjects = userLoggings.map(logging => {
        //     const task = userTasks.find(task => task.rbTaskId === logging.rbTaskId);
        //     const project = projects.find(project => project._id === task.projectId);
        //     return { ...logging, task, project };
        // });

        // console.log("loggingsWithTasksAndProjects", loggingsWithTasksAndProjects)

        const loggingsWithTasks = userLoggings.map(logging => {
            const task = userTasks.find(task => task.rbTaskId === logging.rbTaskId);
            return { ...logging, task };
        });
        // console.log("Logging with tasks",loggingsWithTasks)

        return {
            props: {
                user: JSON.parse(JSON.stringify(user)),
                loggingsWithTasks: JSON.parse(JSON.stringify(loggingsWithTasks)),
            },
        };
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        };
    }
}

export default function singeUser({ user, loggingsWithTasks }) {
    return <>
        {/* {console.log('Component loggingsWithTasks', loggingsWithTasks)} */}
        <Head>
            <title>Single User Data</title>
        </Head>

        <div className="container mx-auto mt-5 px-20 mb-5">
            <div className="text-4xl font-semibold text-center">Loggings Data</div>
            <div className="rounded-xl border-black border-[1px] border-solid text-center mt-10">
                <div className="grid grid-cols-4 p-5">
                    <div className="font-semibold">RB User ID</div>
                    <div className="font-semibold">Name</div>
                    <div className="font-semibold">Email</div>
                    <div className="font-semibold">Total Logged Hours</div>
                    <div className="text-2xl">{user.rbUserId}</div>
                    <div className="text-2xl">{user.name}</div>
                    <div className="text-2xl">{user.email}</div>
                    <div className="text-2xl font-semibold">106</div>
                </div>

                <div className="text-xl">
                    Logging Details:
                </div>


                <div className="grid grid-cols-4 p-5">
                    <div className="font-semibold">Project Name</div>
                    <div className="font-semibold">Task Name</div>
                    <div className="font-semibold">Logging Time</div>
                    <div className="font-semibold">Logging Date</div>
                    {loggingsWithTasks.map(log => (
                        <>
                            <div className="">CX: Interneships</div>
                            <div className="">{log.task.name}</div>

                            <div className="">
                                {Math.floor(log.minutes / 60)}h {(log.minutes % 60) > 0 ? ` ${log.minutes % 60}m` : ''}
                            </div>
                            <div className="">{log.timeTrackingOn}</div>
                        </>
                    ))}

                </div>
            </div>
        </div>
    </>
}
