import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { updateTodos } from "../../state/user";
import { newTodoClose } from "../../state/modal";
import { toast } from "react-toastify";

const NewTodo = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(newTodoClose());
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { title, password } = e.target.elements;
    await toast
      .promise(
        fetch("http://localhost:5000/todo/newTodoList", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            title: title.value,
            password: password.value,
            id: user.id,
          }),
        }).then(async (response) => {
          if (!response.ok) {
            return Promise.reject("Something went wrong");
          }
          const data = await response.json();
          dispatch(updateTodos(data));
          dispatch(newTodoClose());
        }),
        {
          pending: "Creating new todo...",
          success: "New todo created",
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
    <section
      className="fixed h-screen w-screen overflow-hidden flex justify-center items-center z-50 bg-black/50"
      onClick={handleClose}
    >
      <div
        className="relative w-full md:w-2/5 xl:w-1/5 bg-[#294936] rounded-xl"
        onClick={(e: any) => e.stopPropagation()}
      >
        <div className="w-full p-3">
          <h2 className="text-center text-3xl mb-6">New Todo List</h2>
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
              className="border-2 border-[#AEF6C7] rounded-md text-center col-span-2 bg-[#294936] focus:outline-none"
            />
            <label htmlFor="password" className="p-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Optional"
              className="border-2 border-[#AEF6C7] rounded-md text-center col-span-2 bg-[#294936] focus:outline-none"
            />
            <button className="bg-green-800 rounded-md col-span-3 p-3 hover:bg-green-700 duration-300">
              Submit
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

export default NewTodo;
