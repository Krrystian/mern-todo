import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { newTodoClose, newTodoOpen } from "../state/modal";
import { useEffect } from "react";
import { setTodos } from "../state/user";

const TodoList = () => {
  const todos = useSelector((state: any) => state.user.todoList);
  const token = useSelector((state: any) => state.user.token);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const getTodos = async () => {
    const repsonse = await fetch(
      `http://localhost:5000/todo/getTodoList?id=${user.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (repsonse.ok) {
      const data = await repsonse.json();
      dispatch(setTodos(data));
      dispatch(newTodoClose());
    }
  };
  const isNotEmptyArray = (arr: any[]) => {
    return Array.isArray(arr) && arr.length > 0;
  };
  useEffect(() => {
    getTodos();
  }, []);

  const handleNewTodo = () => {
    dispatch(newTodoOpen());
  };
  return (
    <div className="flex flex-col h-[94%] w-[30%] border-r-4 border-green-700">
      <input
        className="w-[90%] h-[40px] border-2 border-green-700 rounded-full placeholder:text-center my-6 self-center text-center focus:outline-none"
        placeholder="Your todos"
      />
      {isNotEmptyArray(todos) ? (
        "You have todos"
      ) : (
        <div className="w-full h-full flex justify-center items-center flex-col">
          <p className="lg:text-xl xl:text-3xl">You don't have any todos</p>
          <button
            className="flex m-3 bg-green-700 rounded-xl p-2 px-6 justify-center gap-1 transition-colors duration-300 hover:bg-green-600"
            onClick={handleNewTodo}
          >
            <AiOutlinePlus className="self-center" />
            Todo
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
