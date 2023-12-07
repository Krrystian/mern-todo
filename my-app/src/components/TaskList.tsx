import { useSelector } from "react-redux";
import Task from "./Task";

const TaskList = () => {
  const completed = useSelector((state: any) => state.user.todo.completed);
  const uncompleted = useSelector((state: any) => state.user.todo.uncompleted);
  const inProgress = useSelector((state: any) => state.user.todo.inProgress);
  if (!inProgress)
    return (
      //full screen different
      <div className="w-full h-full flex justify-center items-center">
        <h1 className="text-3xl">
          Your everyday <span className="text-green-700">Todo App</span>
        </h1>
      </div>
    );
  return (
    <div
      className={`md:grid ${
        inProgress && inProgress.length > 0 ? "grid-cols-2" : "grid-cols-3"
      }`}
    >
      <div className="border-r-2 items-center flex flex-col">
        <h1 className="text-3xl text-center w-full font-bold items-center">
          Uncompleted
        </h1>
        {uncompleted &&
          uncompleted.map((task: any) => (
            <Task key={task._id} {...task} color="gray" />
          ))}
      </div>
      <div
        className={`border-r-2 ${
          inProgress.length === 0 ? "hidden" : "flex flex-col items-center"
        }`}
      >
        <h1 className="text-3xl text-center w-full font-bold">Progress</h1>
        {inProgress &&
          inProgress.map((task: any) => (
            <Task key={task._id} {...task} color="orange" />
          ))}
      </div>
      <div className="items-center flex flex-col">
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
