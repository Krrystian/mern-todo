import React from "react";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { sharingClose } from "../../state/modal";
import { BiCopyAlt } from "react-icons/bi";

const SharingList = () => {
  const dispatch = useDispatch();
  const todo = useSelector((state: any) => state.user.todo);
  const handleClose = () => {
    dispatch(sharingClose());
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(todo._id);
  };
  return (
    <section
      className="absolute h-screen w-screen overflow-hidden flex justify-center items-center z-50 bg-black/50"
      onClick={handleClose}
    >
      <div
        className="relative w-4/5 md:w-3/5 xl:w-2/5 bg-white rounded-xl flex-col flex justify-center items-center p-2"
        onClick={(e: any) => e.stopPropagation()}
      >
        <h2 className="text-center text-3xl mb-3">Share your Todo</h2>
        <div className="w-full text-md p-3 flex justify-center gap-5">
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
        <GrClose
          size={20}
          className="absolute right-3 top-3 cursor-pointer"
          onClick={handleClose}
        />
      </div>
    </section>
  );
};

export default SharingList;
