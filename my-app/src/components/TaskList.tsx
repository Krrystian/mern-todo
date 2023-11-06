import React from "react";
import { useSelector } from "react-redux";

const TaskList = () => {
  const completed = useSelector((state: any) => state.user.todo.completed);
  const uncompleted = useSelector((state: any) => state.user.todo.uncompleted);
  const inProgress = useSelector((state: any) => state.user.todo.inProgress);
  return <div>TaskList</div>;
};

export default TaskList;
