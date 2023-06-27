import React from "react";
import Head from "next/head";
import UserList from "./UserList";
import ProjectList from "./ProjectList";
import UserEmails from "./UserEmails";

const Home = ({ users, projects, loggings }) => {
  console.log("loggings", loggings);
  return (
    <>
      <Head>
        <title>Redbooth + Clockify Integration</title>
      </Head>
      {console.log(users[0])}
      {console.log(projects)}
      <div className="px-12 ">
        <h1 className="text-center text-3xl my-4 ">
          <span className="text-red-400">Redbooth</span> +{" "}
          <span className="text-blue-400">Clockify</span>
        </h1>
        <div className="flex flex-col items-center">
          <div className="flex justify-center">
            <UserList users={users} />

            <ProjectList projects={projects} />

            <UserEmails users={users} />
          </div>

          {/* <div className="flex justify-center">
          <div className="border-b border-l  border-slate-300 pr-36 pl-10 py-7 bg-gray-50">People <div className="my-2 text-5xl font-light text-green-600">123</div></div>
          <div className="border-b border-r border-l border-slate-300 pr-36 pl-10 py-7 bg-gray-50">Projects <div className="my-2 text-5xl font-light text-green-600">123</div></div>
          <div className="border-b  border-r border-slate-300 pr-36 pl-10 py-7 bg-gray-50">User <div className="my-2 text-5xl font-light text-green-600">123</div></div>
        </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
