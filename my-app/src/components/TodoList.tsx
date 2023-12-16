import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import {
  deleteOpen,
  newTodoClose,
  newTodoJoinOpen,
  newTodoOpen,
} from "../state/modal";
import { useEffect, useRef, useState } from "react";
import { setSelected, setTodo, setTodos } from "../state/user";
const isNotEmptyArray = (arr: any[]) => {
  return Array.isArray(arr) && arr.length > 0;
};
const TodoList = () => {
  const todos = useSelector((state: any) => state.user.todoList);
  const token = useSelector((state: any) => state.user.token);
  const user = useSelector((state: any) => state.user);
  const menuBar = useSelector((state: any) => state.modal.menuBar.isOpen);
  const selected = useSelector((state: any) => state.user.selected);
  const dispatch = useDispatch();
  const titles: string[] = [];
  let [filteredTitles, setFilteredTitles] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const repsonse = await fetch(
          `${process.env.REACT_APP_API_URL}/todo/getTodoList?id=${user.id}`,
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
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    getTodos();
  }, [dispatch, token, user.id]);

  const handleClick = () => {
    let inputValue = inputRef.current?.value;
    if (!inputValue) {
      setFilteredTitles([]);
      return;
    }
    const filtered = titles.filter((title) => {
      return title.toLowerCase().includes(inputValue!.toLowerCase());
    });
    setFilteredTitles(filtered);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  const handleSelect = (todo: any) => {
    dispatch(setSelected(todo._id));
    dispatch(setTodo(todo));
  };
  const handleNewTodo = () => {
    dispatch(newTodoOpen());
  };
  const handleJoinTodo = () => {
    dispatch(newTodoJoinOpen());
  };

  const handleDelete = async (e: any, id: string) => {
    e.stopPropagation();
    dispatch(deleteOpen({ id: id, task: false }));
  };
  return (
    <div
      className={`flex-col min-h-[92vh] w-[30%] overflow-hidden lg:flex transition-all duration-100 ${
        menuBar ? "hidden" : "flex z-10 absolute w-full bg-[#294936]"
      }`}
    >
      <div
        className={`relative w-full flex justify-center h-[82px] border-[#aef6c7] ${
          menuBar ? "border-r-4" : ""
        }`}
      >
        <input
          className="w-full h-full placeholder:font-bold font-bold text-2xl placeholder:text-[#aef6c7] bg-[#233d2d] placeholder:text-center placeholder:text-2xl text-center focus:outline-none focus:placeholder-[#233d2d]"
          placeholder="Your todos"
          ref={inputRef}
          onKeyDown={(e) => handleKeyPress(e)}
        />
        <AiOutlineSearch
          className="absolute h-full right-1 cursor-pointer"
          size={25}
          onClick={() => handleClick()}
        />
      </div>
      {isNotEmptyArray(todos) ? (
        <div className="w-full h-full flex flex-col z-10">
          {todos.map((todo: any) => {
            const isSelected = selected === todo._id;
            if (
              filteredTitles.length > 0 &&
              !filteredTitles.includes(todo.title) &&
              !isSelected
            )
              return null;
            titles.push(todo.title);
            return (
              <div
                key={todo._id}
                className={`flex justify-between p-3 cursor-pointer hover:bg-[#233d2d] hover:shadow-[0px_0px_5px_5px_#aef6c7] transition-all ${
                  menuBar ? "rounded-l-full" : "rounded-md"
                } duration-300 hover:z-20
              ${
                isSelected
                  ? `bg-[#233d2d] lg:bg-inherit lg:bg-gradient-to-r from-[#233d2d] to-[#294936] border-[#aef6c7] ${
                      menuBar ? "border-y-4 border-l-4" : "border-0 rounded-md"
                    }`
                  : ` border-[#aef6c7] ${
                      menuBar ? "border-r-4" : "border-none"
                    }`
              }`}
                onClick={() => handleSelect(todo)}
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
                <AiOutlineClose
                  size={20}
                  className="self-center cursor-pointer"
                  onClick={(e: any) => {
                    handleDelete(e, todo._id);
                  }}
                />
              </div>
            );
          })}
          <div
            className={`w-full h-full flex justify-center border-[#aef6c7] ${
              menuBar && "border-r-4"
            }`}
          >
            <button
              className="flex m-3 bg-green-800 rounded-xl p-2 px-6 h-[40px] justify-center gap-1 transition-colors duration-300 hover:bg-green-700"
              onClick={handleNewTodo}
            >
              <AiOutlinePlus className="self-center" />
              Todo
            </button>
            <button
              className="flex m-3 bg-green-800 rounded-xl p-2 px-6 h-[40px] justify-center gap-1 transition-colors duration-300 hover:bg-green-700"
              onClick={handleJoinTodo}
            >
              <AiOutlinePlus className="self-center" />
              Join
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`w-full min-h-[92vh] flex flex-col justify-center items-center border-[#AEF6C7] ${
            menuBar ? "border-r-4" : "border-none"
          }`}
        >
          <p className="text-center text-3xl">You don't have any todos</p>
          <div className="flex flex-row">
            <button
              className="flex m-3 bg-green-800 rounded-xl p-2 px-6 h-[40px] justify-center gap-1 transition-colors duration-300 hover:bg-green-700"
              onClick={handleNewTodo}
            >
              <AiOutlinePlus className="self-center" />
              Todo
            </button>
            <button
              className="flex m-3 bg-green-800 rounded-xl p-2 px-6 h-[40px] justify-center gap-1 transition-colors duration-300 hover:bg-green-700"
              onClick={handleJoinTodo}
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
