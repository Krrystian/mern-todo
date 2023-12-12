import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { editClose } from "../../state/modal";
import { toast } from "react-toastify";
import { updateTask } from "../../state/user";
const EditTask = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.user.token);
  const title = useSelector((state: any) => state.modal.edit.title);
  const description = useSelector((state: any) => state.modal.edit.description);
  const id = useSelector((state: any) => state.modal.edit.id);
  const currentStage = useSelector(
    (state: any) => state.modal.edit.progressStage
  );
  const format = useSelector((state: any) => state.modal.edit.task);
  const selectedList = useSelector((state: any) => state.user.todo._id);
  const [isChecked, setIsChecked] = useState<boolean>(format);
  const [selectedOption, setSelectedOption] = useState<string>(currentStage);

  const handleClose = () => {
    dispatch(editClose());
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const description = (
      document.getElementById("description") as HTMLInputElement
    ).value;
    const stage = (document.getElementById("stage") as HTMLInputElement).value;
    const format = (document.getElementById("format") as HTMLInputElement)
      .checked;
    const data = {
      id,
      title,
      description,
      stage,
      format,
      selectedList,
      currentStage,
    };
    await toast
      .promise(
        fetch("http://localhost:5000/todo/updateTask", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
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
              stage: currentStage,
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
    dispatch(editClose());
  };
  return (
    <section
      className="fixed h-screen w-screen overflow-hidden flex justify-center items-center z-50 bg-black/50"
      onClick={handleClose}
    >
      <div
        className="relative w-full md:w-2/5 xl:w-1/3 bg-[#294936] rounded-xl flex-col flex justify-center items-center p-3"
        onClick={(e: any) => e.stopPropagation()}
      >
        <h2 className="text-center text-3xl mb-3">Edit task</h2>
        <form
          className="grid grid-cols-3 gap-4 w-full justify-center"
          onSubmit={handleSubmit}
        >
          <label htmlFor="title" className="p-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={title}
            className="border-2 border-[#AEF6C7] rounded-md text-center col-span-2 bg-[#294936] focus:outline-none text-[#AEF6C7]"
          />
          <label htmlFor="description" className="p-2">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            defaultValue={description}
            placeholder="Optional"
            className="border-2 border-[#AEF6C7] rounded-md text-center col-span-2 bg-[#294936] focus:outline-none text-[#AEF6C7]"
          />
          <label htmlFor="format" className="p-2">
            Include progress stage
          </label>
          <input
            type="checkbox"
            name="format"
            id="format"
            defaultChecked={format}
            disabled={currentStage === "inProgress"}
            onClick={(e: any) => {
              setIsChecked(e.target.checked);
              setSelectedOption(
                !e.target.checked ? "uncompleted" : selectedOption
              );
            }}
            className="col-span-2 self-center h-[40px] accent-green-700"
          />
          <label htmlFor="stage" className="p-2">
            Stage
          </label>
          <select
            name="stage"
            id="stage"
            className="border-2 border-[#AEF6C7] rounded-md text-center col-span-2 bg-[#294936] focus:outline-none text-[#AEF6C7]"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="uncompleted">Uncompleted</option>
            <option value="inProgress" disabled={!isChecked}>
              In Progress
            </option>
            <option value="completed">Completed</option>
          </select>
          <button className="bg-green-800  rounded-md col-span-3 p-3 hover:bg-green-700 duration-300">
            Submit changes
          </button>
        </form>
        <GrClose
          size={20}
          className="absolute right-3 top-3 cursor-pointer"
          onClick={handleClose}
        />
      </div>
    </section>
  );
};

export default EditTask;
