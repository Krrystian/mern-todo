import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { titleClose } from "../../state/modal";
import { setTodo, titleUpdate, updateTodos } from "../../state/user";

const TitleTodo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const todo = useSelector((state: any) => state.user.todo);
  const handleClose = (e: any) => {
    dispatch(titleClose());
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { title } = e.target.elements;
    const response = await fetch("http://localhost:5000/todo/changeTitle", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        title: title.value,
        id: todo._id,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(titleUpdate(data));
      dispatch(setTodo(data));
      dispatch(titleClose());
    }
  };
  return (
    <section
      className="absolute h-screen w-screen overflow-hidden flex justify-center items-center z-50 bg-black/50"
      onClick={handleClose}
    >
      <div
        className="relative w-3/5 md:w-2/5 xl:w-1/5 bg-white rounded-xl"
        onClick={(e: any) => e.stopPropagation()}
      >
        <div className="w-full p-3">
          <h2 className="text-center text-3xl mb-6">Change Title</h2>
          <form
            className="grid grid-cols-3 gap-4 w-full justify-center"
            onSubmit={handleSubmit}
          >
            <label htmlFor="title" className="p-2">
              New Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              className="border-2 border-green-700 rounded-md text-center col-span-2"
            />
            <button className="bg-green-700 text-white rounded-md col-span-3 p-3 hover:bg-green-600 duration-300">
              Change
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

export default TitleTodo;