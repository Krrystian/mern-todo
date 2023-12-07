import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { newTodoJoinClose } from "../../state/modal";
import { updateTodos } from "../../state/user";

const JoinTodo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const handleClose = () => {
    dispatch(newTodoJoinClose());
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { code, password } = e.target.elements;
    const response = await fetch("http://localhost:5000/todo/joinTodoList", {
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
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(updateTodos(data));
      dispatch(newTodoJoinClose());
    }
  };
  return (
    <section
      className="fixed h-screen w-screen overflow-hidden flex justify-center items-center z-50 bg-black/50"
      onClick={handleClose}
    >
      <div
        className="relative w-full md:w-2/5 xl:w-1/5 bg-white rounded-xl"
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
              className="border-2 border-green-700 rounded-md text-center col-span-2"
            />
            <label htmlFor="password" className="p-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Optional"
              className="border-2 border-green-700 rounded-md text-center col-span-2"
            />
            <button className="bg-green-700 text-white rounded-md col-span-3 p-3 hover:bg-green-600 duration-300">
              Join
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

export default JoinTodo;
