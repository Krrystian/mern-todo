import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteClose } from "../../state/modal";

const DeleteModal = () => {
  const dispatch = useDispatch();
  const id = useSelector((state: any) => state.modal.delete.id);
  const handleClose = () => {
    dispatch(deleteClose());
  };
  const handleDelete = () => {
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
        <h2 className="text-center text-3xl mb-3">
          Do you want to delete this?
        </h2>
        <div className="flex gap-3 w-full justify-center">
          <button
            className="bg-red-700 text-white rounded-md w-full p-3 hover:bg-red-600 duration-300"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button className="bg-green-700 text-white rounded-md w-full p-3 hover:bg-green-600 duration-300">
            Delete
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteModal;
