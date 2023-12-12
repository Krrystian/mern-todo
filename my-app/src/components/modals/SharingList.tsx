import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { sharingClose } from "../../state/modal";
import { BiCopyAlt } from "react-icons/bi";
import { toast } from "react-toastify";

const SharingList = () => {
  const dispatch = useDispatch();
  const todo = useSelector((state: any) => state.user.todo);
  const handleClose = () => {
    dispatch(sharingClose());
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(todo._id);
    toast.success("Copied to clipboard", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <section
      className="fixed h-screen w-screen overflow-hidden flex justify-center items-center z-50 bg-black/50"
      onClick={handleClose}
    >
      <div
        className="relative w-full md:w-3/5 xl:w-2/5 bg-[#294936] rounded-xl flex-col flex justify-center items-center p-2"
        onClick={(e: any) => e.stopPropagation()}
      >
        <h2 className="text-center text-3xl mb-3">Share your Todo</h2>
        <div className="w-full text-md p-3 flex justify-center gap-2 ">
          Your sharing code:
          <span className="font-bold self-center flex gap-2">
            {todo._id}
            <BiCopyAlt
              className="cursor-pointer"
              size={25}
              onClick={copyToClipboard}
            />
          </span>
        </div>
        <p>Be careful it's equal share</p>
        <AiOutlineClose
          size={20}
          className="absolute right-3 top-3 cursor-pointer"
          onClick={handleClose}
        />
      </div>
    </section>
  );
};

export default SharingList;
