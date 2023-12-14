import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { newTodoJoinClose } from "../../state/modal";
import { updateTodos } from "../../state/user";
import { toast } from "react-toastify";

const JoinTodo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const handleClose = () => {
    dispatch(newTodoJoinClose());
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { code, password } = e.target.elements;

    await toast
      .promise(
        fetch(`${process.env.REACT_APP_API_URL}/todo/joinTodoList`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            id: user.id,
            code: code.value,
            password: password.value,
          }),
        }).then(async (response) => {
          if (!response.ok) {
            return Promise.reject("Something went wrong");
          }
          const data = await response.json();
          dispatch(updateTodos(data));
          dispatch(newTodoJoinClose());
        }),
        {
          pending: "Joining todo...",
          success: "Todo joined",
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
          <h2 className="text-center text-3xl mb-6">Join Todo List</h2>
          <form
            className="grid grid-cols-3 gap-4 w-full justify-center"
            onSubmit={handleSubmit}
          >
            <label htmlFor="title" className="p-2">
              Code
            </label>
            <input
              type="text"
              name="code"
              id="code"
              required
              className="border-2 border-[#AEF6C7] rounded-md text-center col-span-2 bg-[#294936] focus:outline-none text-[#AEF6C7]"
            />
            <label htmlFor="password" className="p-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Optional"
              className="border-2 border-[#AEF6C7] rounded-md text-center col-span-2 bg-[#294936] focus:outline-none text-[#AEF6C7]"
            />
            <button className="bg-green-800 rounded-md col-span-3 p-3 hover:bg-green-700 duration-300">
              Join
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

export default JoinTodo;
