import React from "react";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosArrowUp,
  IoIosArrowDown,
} from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { deleteOpen, editOpen } from "../state/modal";
import { toast } from "react-toastify";
import { updateTask } from "../state/user";
interface TaskProps {
  title: string;
  description: string;
  progressInclude: boolean;
  _id: string;
  color: string;
  progressStage: string;
}
const Task: React.FC<TaskProps> = ({
  title,
  description,
  progressInclude,
  _id,
  color,
  progressStage,
}) => {
  const dispatch = useDispatch();
  const selectedList = useSelector((state: any) => state.user.selected);
  const token = useSelector((state: any) => state.user.token);
  const handleEdit = () => {
    dispatch(
      editOpen({
        id: _id,
        description,
        title,
        task: progressInclude,
        progressStage: progressStage,
      })
    );
  };
  const handleDelete = () => {
    dispatch(deleteOpen({ id: _id, task: true, progressStage: progressStage }));
  };
  const handleDowngrade = async () => {
    let reqData: {
      id: string;
      title: string;
      description: string;
      stage: string;
      format: boolean;
      selectedList: string;
      currentStage: string;
    } = {
      id: _id,
      title,
      description,
      stage: "",
      format: progressInclude,
      selectedList,
      currentStage: progressStage,
    };
    if (progressInclude && progressStage === "completed") {
      reqData = {
        ...reqData,
        stage: "inProgress",
      };
    } else if (progressStage === "inProgress") {
      reqData = {
        ...reqData,
        stage: "uncompleted",
      };
    } else if (!progressInclude && progressStage === "completed") {
      reqData = {
        ...reqData,
        stage: "uncompleted",
      };
    }
    await toast
      .promise(
        fetch("http://localhost:5000/todo/updateTask", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reqData),
        }).then(async (response) => {
          if (!response.ok) {
            return Promise.reject("Something went wrong");
          }
          const data = await response.json();
          dispatch(
            updateTask({
              id: data._id,
              title: data.title,
              description: data.description,
              progressStage: data.progressStage,
              format: data.progressInclude,
              stage: reqData.currentStage,
            })
          );
        }),
        {
          pending: "Editing task...",
          success: "Task edited!",
          error: "Something went wrong",
        },
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      )
      .catch(() => {});
  };
  const handleUpgrade = async () => {
    let reqData: {
      id: string;
      title: string;
      description: string;
      stage: string;
      format: boolean;
      selectedList: string;
      currentStage: string;
    } = {
      id: _id,
      title,
      description,
      stage: "",
      format: progressInclude,
      selectedList,
      currentStage: progressStage,
    };
    if (progressInclude && progressStage === "uncompleted") {
      reqData = {
        ...reqData,
        stage: "inProgress",
      };
    } else if (progressStage === "inProgress") {
      reqData = {
        ...reqData,
        stage: "completed",
      };
    } else if (!progressInclude && progressStage === "uncompleted") {
      reqData = {
        ...reqData,
        stage: "completed",
      };
    }
    await toast
      .promise(
        fetch("http://localhost:5000/todo/updateTask", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reqData),
        }).then(async (response) => {
          if (!response.ok) {
            return Promise.reject("Something went wrong");
          }
          const data = await response.json();
          dispatch(
            updateTask({
              id: data._id,
              title: data.title,
              description: data.description,
              progressStage: data.progressStage,
              format: data.progressInclude,
              stage: reqData.currentStage,
            })
          );
        }),
        {
          pending: "Editing task...",
          success: "Task edited!",
          error: "Something went wrong",
        },
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      )
      .catch(() => {});
  };
  return (
    <div
      className={`p-3 w-[90%] rounded-md my-2 overflow-hidden ${
        color === "green"
          ? "bg-[#4e704b]"
          : color === "orange"
          ? "bg-[#593E62]"
          : "bg-[#3e6259]"
      }`}
    >
      <h1 className="font-bold">{title}</h1>
      <p>{description}</p>
      <div className="flex justify-between">
        <div className="flex">
          <button
            className="bg-[#5b8266] p-1 rounded-md w-[75px] mr-3"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="bg-[#c73c53] p-1 rounded-md w-[75px]"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
        <div className="gap-3 lg:flex hidden">
          {progressStage !== "uncompleted" && (
            <div
              className="flex items-center w-[30px] cursor-pointer bg-[#3E5962] justify-center rounded-md"
              onClick={handleDowngrade}
            >
              <IoIosArrowBack />
            </div>
          )}
          {progressStage !== "completed" && (
            <div
              className="flex items-center w-[30px] cursor-pointer bg-[#3E5962] justify-center rounded-md"
              onClick={handleUpgrade}
            >
              <IoIosArrowForward />
            </div>
          )}
        </div>
        <div className="gap-2 justify-center flex  lg:hidden">
          {progressStage !== "uncompleted" && (
            <div
              className="flex h-full items-center w-[60px] cursor-pointer bg-[#3E5962] justify-center rounded-md"
              onClick={handleDowngrade}
            >
              <IoIosArrowUp />
            </div>
          )}
          {progressStage !== "completed" && (
            <div
              className="flex h-full items-center w-[60px] cursor-pointer bg-[#3E5962] justify-center rounded-md"
              onClick={handleUpgrade}
            >
              <IoIosArrowDown />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
