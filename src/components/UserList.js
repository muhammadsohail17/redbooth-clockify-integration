import React from "react";

const UserList = ({ users }) => {
  return (
    <div className="border-t border-b border-r border-l border-slate-300 pr-36 pl-10 py-7 bg-gray-50 ">
      <h1 className="text-5xl font-light text-red-500">
        {users.length} People
      </h1>
      <div className="my-6 font-normal text-xl ">
        {users.map((user, index) => (
          <li key={user._id} className="list-none my-2 text-blue-600">
            {user.name}
          </li>
        ))}
      </div>
    </div>
  );
};

export default UserList;
