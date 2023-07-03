import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import connectDB from '@/data/db'
import Dashboard from '@/components/Dashboard'

export async function getServerSideProps() {
    const { User, Project, Task, Logging } = require('../data/dataModel')

    try {
        await connectDB();
        console.log('CONNECTED TO MONGO 1!');
        const user = await User.findOne({ email: 'ufaq3022@gmail.com' }).lean();
        const userLoggings = await Logging.find({ rbUserId: 6237218 }).sort({ rbCommentId: -1 }).limit(30).lean();

        const taskIds = userLoggings.map(logging => logging.rbTaskId);
        // Creates an array of taskIds by extracting the rbTaskId property from each object in the userLoggings array
        const userTasks = await Task.find({ rbTaskId: { $in: taskIds } });
        // Finds all tasks where the rbTaskId property is included in the taskIds array and awaits the result
        const projectIds = userTasks.map(task => task.rbProjectId);
        // Creates an array of projectIds by extracting the rbProjectId property from each object in the userTasks array
        const projects = await Project.find({ rbProjectId: { $in: projectIds } }).lean();
        
        const loggingsWithTasksAndProjects = userLoggings.map(logging => {
            const task = userTasks.find(task => task.rbTaskId === logging.rbTaskId);
            // Finds the task object in the userTasks array where the rbTaskId matches the rbTaskId of the current logging object

            const project = projects.find(project => project.rbProjectId === task.rbProjectId);
            // Finds the project object in the projects array where the _id matches the projectId of the current task object

            return { ...logging, task, project };
            // Returns a new object that includes the original logging object, task object, and project object
        });

        // const loggingsWithTasks = userLoggings.map(logging => {
        //     const task = userTasks.find(task => task.rbTaskId === logging.rbTaskId);
        //     return { ...logging, task };
        // });
        console.log("loggingsWithTasksAndProjects", loggingsWithTasksAndProjects)

        return {
            props: {
                user: JSON.parse(JSON.stringify(user)),
                loggingsWithTasksAndProjects: JSON.parse(JSON.stringify(loggingsWithTasksAndProjects)),
                projects: JSON.parse(JSON.stringify(projects)),
            },
        };
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        };
    }
}




export default function Home({ projects, loggingsWithTasksAndProjects }) {

    return <>
        {console.log("loggingsWithTasks", loggingsWithTasksAndProjects)}
        <Head>
            <title>Dashboard</title>
        </Head>
        <Dashboard projects={projects} userData={loggingsWithTasksAndProjects} />

    </>
}