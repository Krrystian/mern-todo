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
    <section className=" w-full flex gap-2 justify-center items-center p-3 text-xs  md:text-base lg:p-6">
      <div
        className="p-2 md:min-w-[100px] border-2 border-green-700 rounded-full cursor-pointer bg-green-700 duration-300 transition-colors md:max-w-[150px] text-center flex justify-center"
        onClick={handleNew}
      >
        New Task
      </div>
      <div
        className="p-2 border-2 border-green-700 rounded-full cursor-pointer hover:bg-green-700 duration-300 transition-colors md:max-w-[150px] text-center flex justify-center"
        onClick={handleShare}
      >
        Share list
      </div>
      <div
        className="p-2 border-2 border-green-700 rounded-full cursor-pointer hover:bg-green-700 duration-300 transition-colors md:max-w-[150px] text-center flex justify-center"
        onClick={handleTitle}
      >
        Change title
      </div>
      <div
        className="p-2 border-2 border-green-700 rounded-full cursor-pointer hover:bg-green-700 duration-300 transition-colors md:max-w-[150px] text-center flex justify-center"
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
