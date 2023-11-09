import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { newTaskClose } from "../../state/modal";

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
    const response = await fetch("http://localhost:5000/todo/newTask", {
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
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);

      dispatch(newTaskClose());
    }
  };
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("uncompleted");
  return (
    <section
      className="absolute h-screen w-screen overflow-hidden flex justify-center items-center z-50 bg-black/50"
      onClick={handleClose}
    >
      <div
        className="relative w-full md:w-3/5 xl:w-2/5 bg-white rounded-xl"
        onClick={(e: any) => e.stopPropagation()}
      >
        <div className="w-full p-3">
          <h2 className="text-center text-3xl mb-6">New Task</h2>
          <form
            className="grid grid-cols-3 gap-4 w-full justify-center"
            onSubmit={handleSubmit}
          >
            <label htmlFor="title" className="p-2">
              Name
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              className="border-2 border-green-700 rounded-md text-center col-span-2"
            />
            <label htmlFor="description" className="p-2">
              Description
            </label>
            <input
              type="description"
              name="description"
              id="description"
              placeholder="Optional"
              className="border-2 border-green-700 rounded-md text-center col-span-2"
            />
            <label htmlFor="format" className="p-2">
              Include progress stage
            </label>
            <input
              type="checkbox"
              name="format"
              id="format"
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
              className="border-2 border-green-700 rounded-md text-center col-span-2"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="uncompleted">Uncompleted</option>
              <option value="inprogress" disabled={!isChecked}>
                In Progress
              </option>
              <option value="completed">Completed</option>
            </select>
            <button className="bg-green-700 text-white rounded-md col-span-3 p-3 hover:bg-green-600 duration-300">
              Add new task
            </button>
          </form>
        </div>
        <GrClose
          size={20}
          className="absolute right-3 top-3 cursor-pointer"
          onClick={handleClose}
        />
      </div>
    </section>
  );
};

export default NewTask;
