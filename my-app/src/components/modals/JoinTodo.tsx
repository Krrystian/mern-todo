import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { newTodoJoinClose } from "../../state/modal";

const JoinTodo = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(newTodoJoinClose());
  };

  return (
    <section className="absolute h-screen w-screen overflow-hidden flex justify-center items-center z-50 bg-black/50">
      <div className="relative w-3/5 md:w-2/5 xl:w-1/5 bg-white rounded-xl">
        <div className="w-full p-3">
          <h2 className="text-center text-3xl mb-6">Join TodoList</h2>
          <form
            className="grid grid-cols-3 gap-4 w-full justify-center"
            onSubmit={() => console.log("CLOSE")}
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
