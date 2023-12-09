import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { editClose } from "../../state/modal";
const EditTask = () => {
  const dispatch = useDispatch();
  const title = useSelector((state: any) => state.modal.edit.title);
  const description = useSelector((state: any) => state.modal.edit.description);
  const id = useSelector((state: any) => state.modal.edit.id);
  const stage = useSelector((state: any) => state.modal.edit.progressStage);
  const format = useSelector((state: any) => state.modal.edit.task);
  const [isChecked, setIsChecked] = useState<boolean>(format);
  const [selectedOption, setSelectedOption] = useState<string>(stage);

  const handleClose = () => {
    dispatch(editClose());
  };
  const handleSubmit = () => {
    //RESTful api
  };
  return (
    <section
      className="fixed h-screen w-screen overflow-hidden flex justify-center items-center z-50 bg-black/50"
      onClick={handleClose}
    >
      <div
        className="relative w-full md:w-2/5 xl:w-1/3 bg-white rounded-xl flex-col flex justify-center items-center p-3"
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
            className="border-2 border-green-700 rounded-md text-center col-span-2"
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
            className="border-2 border-green-700 rounded-md text-center col-span-2"
          />
          <label htmlFor="format" className="p-2">
            Include progress stage
          </label>
          <input
            type="checkbox"
            name="format"
            id="format"
            defaultChecked={format}
            disabled={stage === "inProgress"}
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
            <option value="inProgress" disabled={!isChecked}>
              In Progress
            </option>
            <option value="completed">Completed</option>
          </select>
          <button className="bg-green-700 text-white rounded-md col-span-3 p-3 hover:bg-green-600 duration-300">
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