import { useSelector } from "react-redux";
import Task from "./Task";

const TaskList = () => {
  const completed = useSelector((state: any) => state.user.todo.completed);
  const uncompleted = useSelector((state: any) => state.user.todo.uncompleted);
  const inProgress = useSelector((state: any) => state.user.todo.inProgress);
  const user = useSelector((state: any) => state.user.todo);
  return (
    <div
      className={`grid grid-cols-3 h-full ${
        inProgress.length === 0 ? "grid-cols-2" : "grid-cols-3"
      }`}
    >
      <div className="border-r-2 min-h-full items-center flex flex-col">
        <h1 className="text-3xl text-center w-full font-bold items-center">
          Uncompleted
        </h1>
        {uncompleted &&
          uncompleted.map((task: any) => (
            <Task key={task._id} {...task} color="gray" />
          ))}
      </div>
      <div
        className={`border-r-2 min-h-full ${
          inProgress.length === 0 ? "hidden" : "flex flex-col items-center"
        }`}
      >
        <h1 className="text-3xl text-center w-full font-bold">Progress</h1>
        {inProgress &&
          inProgress.map((task: any) => (
            <Task key={task._id} {...task} color="orange" />
          ))}
      </div>
      <div className="min-h-full items-center flex flex-col">
        <h1 className="text-3xl text-center w-full font-bold ">Completed</h1>
        {completed &&
          completed.map((task: any) => (
            <Task key={task._id} {...task} color="green" />
          ))}
      </div>
    </div>
  );
};

export default TaskList;
