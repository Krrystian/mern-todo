import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { newTaskClose } from "../../state/modal";
import { updateTasks } from "../../state/user";
import { toast } from "react-toastify";

const NewTask = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const todo = useSelector((state: any) => state.user.todo);
  const handleClose = () => {
    dispatch(newTaskClose());
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { title, description, stage, format } = e.target;
    await toast
      .promise(
        fetch(`${process.env.REACT_APP_API_URL}/todo/newTask`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            title: title.value,
            description: description.value,
            stage: stage.value,
            format: format.checked,
            id: todo._id,
          }),
        }).then(async (response) => {
          if (!response.ok) {
            return Promise.reject("Something went wrong");
          }
          const data = await response.json();
          dispatch(updateTasks(data));
          dispatch(newTaskClose());
        }),
        {
          pending: "Creating new task...",
          success: "New task created",
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
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("uncompleted");
  return (
    <section
      className="fixed h-screen w-screen overflow-hidden flex justify-center items-center z-50 bg-black/50"
      onClick={handleClose}
    >
      <div
        className="relative w-full md:w-3/5 xl:w-2/5 bg-[#294936] rounded-xl"
        onClick={(e: any) => e.stopPropagation()}
      >
        <div className="w-full p-3">
          <h2 className="text-center text-3xl mb-6">New Task</h2>
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
              required
              className="border-2 border-[#AEF6C7] rounded-md text-center col-span-2 bg-[#294936] focus:outline-none"
            />
            <label htmlFor="description" className="p-2">
              Description
            </label>
            <input
              type="description"
              name="description"
              id="description"
              placeholder="Optional"
              className="border-2 border-[#AEF6C7] rounded-md text-center col-span-2 bg-[#294936] focus:outline-none"
            />
            <label htmlFor="format" className="p-2">
              Include progress stage
            </label>
            <input
              type="checkbox"
              name="format"
              id="format"
              onClick={(e: any) => {
                setIsChecked((prev) => !prev);
                setSelectedOption(
                  !e.target.checked ? "uncompleted" : selectedOption
                );
              }}
              className="col-span-2 self-center h-[40px] border-[#AEF6C7] accent-green-700"
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
            <button className="bg-green-800 rounded-md col-span-3 p-3 hover:bg-green-700 duration-300">
              Add new task
            </button>
          </form>
        </div>
        <AiOutlineClose
          size={20}
          className="absolute right-3 top-3 cursor-pointer"
          onClick={handleClose}
        />
      </div>
    </section>
  );
};

export default NewTask;
