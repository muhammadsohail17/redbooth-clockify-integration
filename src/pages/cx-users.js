import React, { useEffect, useState } from "react";
import axios from "axios";
import Headers from "@/components/Headers";
import Head from "next/head";

const CxUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Make the GET request to the API endpoint
    axios
      .get("http://localhost:3001/render-users")
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Headers />
      <Head>
        <title>Cx users</title>
      </Head>
      <div className="container mx-auto px-4 py-4">
        <h2 className="text-2xl font-semibold mb-4 mt-4 text-center">
          CX Users
        </h2>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">RB ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.rbUserId}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default CxUsers;
