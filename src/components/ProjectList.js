import React from "react";

const ProjectList = ({ projects }) => {
  return (
    <div className="border-t border-b border-slate-300 pr-36 pl-10 py-7 bg-gray-50">
      <h1 className="text-5xl font-light text-red-500">
        {projects.length} Projects
      </h1>
      <div className="my-6 font-normal text-xl">
        {projects.map((project, index) => (
          <li key={project._id} className="list-none my-2 text-blue-600">
            {project.name}
          </li>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
