import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { newTodoClose, newTodoJoinOpen, newTodoOpen } from "../state/modal";
import { useEffect, useState } from "react";
import { deleteTodo, setSelected, setTodo, setTodos } from "../state/user";

const TodoList = () => {
  const todos = useSelector((state: any) => state.user.todoList);
  const token = useSelector((state: any) => state.user.token);
  const user = useSelector((state: any) => state.user);
  const selected = useSelector((state: any) => state.user.selected);
  const dispatch = useDispatch();
  const [titles, setTitles] = useState<string[]>([]);
  const [filteredTitles, setFilteredTitles] = useState<string[]>([]);
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
  const handleChange = (e: any) => {
    const filtered = titles.filter((title) => {
      return title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilteredTitles(filtered);
  };
  const handleSelect = (id: string) => {
    dispatch(setSelected(id));
    //dispatch(setTodo(todo)); //change required
  };
  const handleNewTodo = () => {
    dispatch(newTodoOpen());
  };
  const handleJoinTodo = () => {
    dispatch(newTodoJoinOpen());
  };

  const handleDelete = async (e: any, id: string) => {
    e.stopPropagation();
    const response = await fetch("http://localhost:5000/todo/removeTodoList", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: id }),
    });
    if (response.ok) {
      dispatch(deleteTodo(id));
    }
  };
  return (
    <div className="flex-col h-[94%] w-[30%] overflow-hidden hidden lg:flex">
      <div className="w-full flex justify-center border-r-4 border-green-700">
        <input
          className="w-[90%] p-2 border-2 border-green-700 rounded-full placeholder:text-center my-6 text-center focus:outline-none"
          placeholder="Your todos"
          onChange={handleChange}
        />
      </div>

      {isNotEmptyArray(todos) ? (
        <div className="w-full h-full flex flex-col">
          {todos.map((todo: any) => {
            const isSelected = selected === todo._id;
            if (
              filteredTitles.length > 0 &&
              !filteredTitles.includes(todo.title) &&
              !isSelected
            )
              return;
            titles.push(todo.title);
            return (
              <div
                key={todo._id}
                className={`flex justify-between p-3 cursor-pointer hover:bg-white hover:shadow-[0px_0px_5px_5px_#15803d] rounded-l-full transition-all duration-300 hover:z-20
              ${
                isSelected
                  ? " bg-white border-y-4 border-l-4 rounded-l-full border-green-700"
                  : " border-r-4 border-green-700"
              }`}
                onClick={() => handleSelect(todo._id)}
              >
                <h2 className="text-center self-center text-2xl max-w-[40%] text-ellipsis whitespace-nowrap overflow-hidden">
                  {todo.title}
                </h2>
                <div className="text-sm xl:text-md">
                  <p>
                    Completed {todo.completed.length} / &nbsp;
                    {todo.completed.length +
                      todo.uncompleted.length +
                      todo.inProgress.length}
                  </p>
                  <p>
                    Uncompleted: {todo.uncompleted.length} / &nbsp;
                    {todo.completed.length +
                      todo.uncompleted.length +
                      todo.inProgress.length}
                  </p>
                </div>
                <GrClose
                  size={20}
                  className="self-center cursor-pointer"
                  onClick={(e: any) => {
                    handleDelete(e, todo._id);
                  }}
                />
              </div>
            );
          })}
          <div className="w-full h-full flex justify-center border-r-4 border-green-700">
            <button
              className="flex m-3 bg-green-700 rounded-xl p-2 px-6 h-[40px] justify-center gap-1 transition-colors duration-300 hover:bg-green-600"
              onClick={handleNewTodo}
            >
              <AiOutlinePlus className="self-center" />
              Todo
            </button>
            <button
              className="flex m-3 bg-green-700 rounded-xl p-2 px-6 h-[40px] justify-center gap-1 transition-colors duration-300 hover:bg-green-600"
              onClick={handleJoinTodo}
            >
              <AiOutlinePlus className="self-center" />
              Join
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center border-r-4 border-green-700">
          <p className="text-center text-xl">You don't have any todos ;c</p>
          <div className="flex flex-row">
            <button
              className="flex m-3 bg-green-700 rounded-xl p-2 px-6 h-[40px] justify-center gap-1 transition-colors duration-300 hover:bg-green-600"
              onClick={handleNewTodo}
            >
              <AiOutlinePlus className="self-center" />
              Todo
            </button>
            <button
              className="flex m-3 bg-green-700 rounded-xl p-2 px-6 h-[40px] justify-center gap-1 transition-colors duration-300 hover:bg-green-600"
              onClick={handleNewTodo}
            >
              <AiOutlinePlus className="self-center" />
              Join
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
