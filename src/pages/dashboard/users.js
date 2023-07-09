import connectDB from "../../data/db";
const { User, Project, Task, Logging } = require('../../data/dataModel')
import Head from "next/head";
import Link from "next/link";

export const getServerSideProps = async () => {

  try {
    await connectDB();
    console.log('CONNECTED TO MONGO!');
    const users = await User.find({}).sort({ name: 1 }).lean();
    const projects = await Project.find({}).sort({ name: -1 }).lean();
    const loggings = await Logging.find({}).limit(50).sort({ createdAt: -1 });
    const tasks = await Task.find({}).limit(30);
    return {
      props: {
        users: JSON.parse(JSON.stringify(users)),
        projects: JSON.parse(JSON.stringify(projects)),
        loggings: JSON.parse(JSON.stringify(loggings)),
        tasks: JSON.parse(JSON.stringify(tasks))
      },
    };

  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default function Home({ users, projects, loggings, tasks }) {

  return <>
    <Head>
      <title>Redbooth + Clockify Integration</title>
    </Head>

    <div className="px-12 ">
      {/* month=6&year=2023&invoice=1&userId=6237218 */}

      <h1 className="text-center text-3xl my-4 " ><span className="text-red-400">Redbooth</span> + <span className="text-blue-400">Clockify</span></h1>
      <Link href='/single' className="text-2xl font-semibold text-green-500">
        Generate Invoice
      </Link>
      <div className="flex flex-col items-center">
        <div className="flex justify-center">
          <div className="border-t border-b border-r border-l border-slate-300 pr-16 pl-10 py-7 bg-gray-50 ">
            <h1 className="text-3xl font-bold text-red-500">{users.length} People</h1>
            <div className="my-6 font-normal text-xl ">
              {users.map((user, index) => (
                <li key={index} className="list-none my-2 text-blue-600">{user.name}</li>
              ))}
            </div>
          </div>

          <div className="border-t border-b border-slate-300 pr-4 pl-10 py-7 bg-gray-50">
            <h1 className="text-3xl font-bold text-red-500">Tasks (30)</h1>
            <div className="my-6 font-normal text-xl">
              {tasks.map((task, index) => (
                <li key={index} className="list-none my-2 text-blue-600">{task.name}</li>
              ))}

            </div>
          </div>

          <div className="border-t border-l border-r border-b border-slate-300 pr-10 pl-10 py-7 bg-gray-50 text-gray-600 ">
            <h1 className="text-3xl font-bold text-red-500">User Emails</h1>
            <div className="my-6 font-normal text-xl text-blue-800">
              {users.map((user, index) => (
                <li key={index} className="list-none my-2 text-blue-600">{user.email}</li>
              ))}
            </div>
          </div>

        </div>

        <div className="flex justify-center">
          <div className="border-b border-l border-slate-300 pr-36 pl-10 py-7 bg-gray-50 text-3xl font-bold text-red-500">Loggings
            <div className="my-6 font-normal text-xl text-blue-800">
              {loggings.map((log, index) => (
                <li key={index} className="list-none text-blue-600 inline-block p-5">{Math.floor(log.minutes / 60)}H</li>
              ))}
            </div>
          </div>
          {/* <div className="border-b border-r border-l border-slate-300 pr-36 pl-10 py-7 bg-gray-50">Projects <div className="my-2 text-5xl font-light text-green-600">123</div></div>
          <div className="border-b  border-r border-slate-300 pr-36 pl-10 py-7 bg-gray-50">User <div className="my-2 text-5xl font-light text-green-600">123</div></div> */}
        </div>
      </div>
    </div>

  </>
}
