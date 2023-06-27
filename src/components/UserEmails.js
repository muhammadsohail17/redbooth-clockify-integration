import React from "react";

const UserEmails = ({ users }) => {
  return (
    <div className="border-t border-l border-r border-b border-slate-300 pr-36 pl-10 py-7 bg-gray-50 text-gray-600 ">
      <h1 className="text-5xl font-light text-red-500">User Emails</h1>
      <div className="my-6 font-normal text-xl text-blue-800">
        {users.map((user) => (
          <li key={user._id} className="list-none my-2 text-blue-600">
            {user.email}
          </li>
        ))}
      </div>
    </div>
  );
};

export default UserEmails;
