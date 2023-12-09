import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { deleteOpen, editOpen } from "../state/modal";
interface TaskProps {
  title: string;
  description: string;
  progress: boolean;
  _id: string;
  color: string;
  progressStage: string;
}
const Task: React.FC<TaskProps> = ({
  title,
  description,
  progress,
  _id,
  color,
  progressStage,
}) => {
  const dispatch = useDispatch();
  const handleEdit = () => {
    dispatch(editOpen({ id: _id, description, title }));
  };
  const handleDelete = () => {
    dispatch(deleteOpen({ id: _id, task: true, progressStage: progressStage }));
  };
  return (
    <div
      className={`p-3 w-[90%] rounded-md my-2 ${
        color === "green"
          ? "bg-green-300"
          : color === "orange"
          ? "bg-orange-300"
          : "bg-gray-300"
      }`}
    >
      <h1 className="font-bold">{title}</h1>
      <p>{description}</p>
      <div className="flex justify-between">
        <div className="flex">
          <button
            className="bg-green-500 p-1 rounded-md w-[75px] mr-3"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="bg-red-500 p-1 rounded-md w-[75px]"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center w-[30px] cursor-pointer bg-blue-400 justify-center rounded-md">
            <IoIosArrowBack />
          </div>
          <div className="flex items-center w-[30px] cursor-pointer bg-blue-400 justify-center rounded-md">
            <IoIosArrowForward />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
