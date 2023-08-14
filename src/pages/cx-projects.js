import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/Headers";

const cxProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/projects")
      .then((response) => {
        console.log(response.data.data);
        setProjects(response.data.data);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);
  return (
    <>
      <Header />
      <div className="container mx-auto p-8">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">RB Project Id</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td className="border px-4 py-2">{project.rbProjectId}</td>
                <td className="border px-4 py-2">{project.name}</td>
                <td className="border px-4 py-2">{project.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default cxProjects;
