import mongoose from "mongoose";
import connectDB from "./db";
import { User, Project } from "./dataModel";
import Head from "next/head";

export const getServerSideProps = async () => {

  try {
    await connectDB();
    console.log('CONNECTED TO MONGO!');

    const users = await User.find({}).sort({ name: 1 }).lean();
    const projects = await Project.find({}).sort({ name: -1 }).lean();

    // console.log('FETCHED Users!', users[0]);
    // console.log('Fetched Projects!', projects);

    return {
      props: {
        users: JSON.parse(JSON.stringify(users)),
        projects: JSON.parse(JSON.stringify(projects))
      },
    };

  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default function Home({ users, projects }) {

  return <>
  <Head>
    <title>Redbooth + Clockify Integration</title>
  </Head>
    {console.log(users[0])}
    {console.log(projects)}
    <div className="px-12 ">
      <h1 className="text-center text-3xl my-4 " ><span className="text-red-400">Redbooth</span> + <span className="text-blue-400">Clockify</span></h1>
      <div className="flex flex-col items-center">
        <div className="flex justify-center">
          <div className="border-t border-b border-r border-l border-slate-300 pr-36 pl-10 py-7 bg-gray-50 ">
            <h1 className="text-5xl font-light text-red-500">{users.length} People</h1>
            <div className="my-6 font-normal text-xl ">
              {users.map((user, index) => (
                <li key={index} className="list-none my-2 text-blue-600">{user.name}</li>
              ))}
            </div>
          </div>

          <div className="border-t border-b border-slate-300 pr-36 pl-10 py-7 bg-gray-50">
            <h1 className="text-5xl font-light text-red-500">{projects.length} Projects</h1>
            <div className="my-6 font-normal text-xl">
              {projects.map((project, index) => (
                <li key={index} className="list-none my-2 text-blue-600">{project.name}</li>

              ))}
            </div>
          </div>

          <div className="border-t border-l border-r border-b border-slate-300 pr-36 pl-10 py-7 bg-gray-50 text-gray-600 ">
            <h1 className="text-5xl font-light text-red-500">User Emails</h1>
            <div className="my-6 font-normal text-xl text-blue-800">
              {users.map(user => (
                <li className="list-none my-2 text-blue-600">{user.email}</li>
              ))}
            </div>
          </div>

        </div>

        {/* <div className="flex justify-center">
          <div className="border-b border-l  border-slate-300 pr-36 pl-10 py-7 bg-gray-50">People <div className="my-2 text-5xl font-light text-green-600">123</div></div>
          <div className="border-b border-r border-l border-slate-300 pr-36 pl-10 py-7 bg-gray-50">Projects <div className="my-2 text-5xl font-light text-green-600">123</div></div>
          <div className="border-b  border-r border-slate-300 pr-36 pl-10 py-7 bg-gray-50">User <div className="my-2 text-5xl font-light text-green-600">123</div></div>
        </div> */}
      </div>
    </div>

  </>
}
