import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteClose } from "../../state/modal";
import { toast } from "react-toastify";
import { deleteTodo, deleteTask, setSelected, setTodo } from "../../state/user";

const DeleteModal = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.user.token);

  //TASK
  const id = useSelector((state: any) => state.modal.delete.id);
  const task = useSelector((state: any) => state.modal.delete.task);
  const progressStage = useSelector(
    (state: any) => state.modal.delete.progressStage
  );

  //TODO
  const selected = useSelector((state: any) => state.user.selected);

  const handleClose = () => {
    dispatch(deleteClose());
  };
  const handleDelete = async (e: any) => {
    e.preventDefault();
    if (!task) {
      await toast
        .promise(
          fetch("http://localhost:5000/todo/removeTodoList", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id: id }),
          }).then(async (response) => {
            if (!response.ok) {
              return Promise.reject("Something went wrong");
            }
            dispatch(deleteTodo(id));
            if (selected === id) {
              dispatch(setSelected(""));
              dispatch(setTodo(""));
            }
          }),
          {
            pending: "Deleting...",
            success: "Deleted",
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
    } else {
      await toast
        .promise(
          fetch(`${process.env.REACT_APP_API_URL}/todo/removeTask`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id: id }),
          }).then(async (response) => {
            if (!response.ok) {
              return Promise.reject("Something went wrong");
            }
            dispatch(deleteTask({ id: id, progressStage: progressStage }));
          }),
          {
            pending: "Deleting...",
            success: "Deleted",
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
    }
  };
  return (
    <section
      className="fixed h-screen w-screen overflow-hidden flex justify-center items-center z-50 bg-black/50"
      onClick={handleClose}
    >
      <div
        className="relative w-full md:w-2/5 xl:w-1/3 bg-[#294936] rounded-xl flex-col flex justify-center items-center p-3"
        onClick={handleClose}
      >
        <h2 className="text-center text-3xl mb-3">
          Do you want to delete this?
        </h2>
        <div className="flex gap-3 w-full justify-center">
          <button
            className="bg-red-800 text-white rounded-md w-full p-3 hover:bg-red-700 duration-300"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-800 text-white rounded-md w-full p-3 hover:bg-green-700 duration-300"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteModal;
