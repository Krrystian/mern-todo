import { useDispatch, useSelector } from "react-redux";
import { setTodo } from "../state/user";

const TodoBar = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state: any) => state.user.todoList);
  const todo = useSelector((state: any) => state.user.todo);
  if (lists.length === 0) {
    dispatch(setTodo(""));
  }
  return lists.length > 0 && todo ? (
    <section className=" w-full flex gap-2 justify-center lg:justify-start items-center p-3 text-xs  md:text-base lg:p-6 border-b">
      <div className="p-2 border-2 border-green-700 rounded-full cursor-pointer bg-green-700 duration-300 transition-colors md:max-w-[150px] text-center flex justify-center">
        New
      </div>
      <div className="p-2 border-2 border-green-700 rounded-full cursor-pointer hover:bg-green-700 duration-300 transition-colors md:max-w-[150px] text-center flex justify-center">
        Share list
      </div>
      <div className="p-2 border-2 border-green-700 rounded-full cursor-pointer hover:bg-green-700 duration-300 transition-colors md:max-w-[150px] text-center flex justify-center">
        Change title
      </div>
      <div className="p-2 border-2 border-green-700 rounded-full cursor-pointer hover:bg-green-700 duration-300 transition-colors md:max-w-[150px] text-center flex justify-center">
        Change password
      </div>
    </section>
  ) : (
    <></>
  );
};

export default TodoBar;
