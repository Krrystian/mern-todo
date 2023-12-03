import React from "react";
interface TaskProps {
  title: string;
  description: string;
  progress: boolean;
  id: string;
}
const Task: React.FC<TaskProps> = ({ title, description, progress, id }) => {
  return (
    <div className="p-3 rounded-md bg-slate-400 my-2">
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{progress ? "In progress" : "Not in progress"}</p>
      <p>{id}</p>
    </div>
  );
};

export default Task;
