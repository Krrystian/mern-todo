import { useEffect } from "react";
import { useSelector } from "react-redux";
import Task from "./Task";

const TaskList = () => {
  const completed = useSelector((state: any) => state.user.todo.completed);
  const uncompleted = useSelector((state: any) => state.user.todo.uncompleted);
  const inProgress = useSelector((state: any) => state.user.todo.inProgress);
  const user = useSelector((state: any) => state.user.todo);
  console.log(user);
  return (
    <div className="grid grid-cols-3 h-full">
      <div className="border-r-2 min-h-full items-center flex flex-col">
        <h1 className="text-3xl text-center w-full">Uncompleted tasks</h1>
        {uncompleted &&
          uncompleted.map((task: any) => <Task key={task.id} {...task} />)}
      </div>
      <div className="border-r-2 min-h-full">
        <h1 className="text-3xl text-center w-full">Progress tasks</h1>
      </div>
      <div className="border-r-2 min-h-full">
        <h1 className="text-3xl text-center w-full">Completed tasks</h1>
      </div>
    </div>
  );
};

export default TaskList;
