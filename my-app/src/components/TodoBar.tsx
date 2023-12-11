import { useDispatch, useSelector } from "react-redux";
import { setTodo } from "../state/user";
import {
  newTaskOpen,
  passwordOpen,
  sharingOpen,
  titleOpen,
} from "../state/modal";
const TodoBar = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state: any) => state.user.todoList);
  const todo = useSelector((state: any) => state.user.todo);
  const selected = useSelector((state: any) => state.user.selected);
  if (lists.length === 0) {
    dispatch(setTodo(""));
  }
  const handleShare = () => {
    dispatch(sharingOpen());
  };
  const handleTitle = () => {
    dispatch(titleOpen());
  };
  const handlePassword = () => {
    dispatch(passwordOpen());
  };
  const handleNew = () => {
    dispatch(newTaskOpen());
  };

  return lists.length > 0 && todo && selected ? (
    <section className="w-full flex flex-row gap-2 justify-between bg-[#233d2d]  items-center text-sm md:text-base h-[75px] mb-6">
      <div
        className="border-[#aef6c7] text-center w-full h-full items-center md:text-xl cursor-pointer hover:bg-[#3e6259] duration-300 transition-colors flex justify-center"
        onClick={handleNew}
      >
        New Task
      </div>
      <div
        className=" border-[#aef6c7] text-center w-full h-full items-center md:text-xl cursor-pointer hover:bg-[#3e6259] duration-300 transition-colors flex justify-center"
        onClick={handleShare}
      >
        Share list
      </div>
      <div
        className=" border-[#aef6c7] text-center w-full h-full items-center md:text-xl cursor-pointer hover:bg-[#3e6259] duration-300 transition-colors  flex justify-center"
        onClick={handleTitle}
      >
        Change title
      </div>
      <div
        className=" border-[#aef6c7] text-center w-full h-full items-center md:text-xl cursor-pointer hover:bg-[#3e6259] duration-300 transition-colors flex justify-center"
        onClick={handlePassword}
      >
        Change password
      </div>
    </section>
  ) : (
    <></>
  );
};

export default TodoBar;
