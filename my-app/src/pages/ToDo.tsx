import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, updateToken } from "../state/user";
import Navbar from "../components/Navbar";
import TodoList from "../components/TodoList";
import NewTodo from "../components/modals/NewTodo";
import TodoBar from "../components/TodoBar";
import TaskList from "../components/TaskList";
import JoinTodo from "../components/modals/JoinTodo";
const ToDo = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.user.token);
  const newTodo = useSelector((state: any) => state.modal.newTodo.isOpen);
  const joinTodo = useSelector((state: any) => state.modal.joinNewTodo.isOpen);
  const [refreshing, isRefreshing] = useState<boolean>(false);
  const header = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
    Authorization: `Bearer ${token}`,
  };
  const refreshAndDispatchToken = async () => {
    await fetch("http://localhost:5000/refresh", {
      method: "GET",
      headers: header,
      credentials: "include",
    }).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        dispatch(updateToken({ token: data.token }));
      } else {
        dispatch(setCredentials({ token: "", email: "", username: "" }));
      }
    });
  };

  const isUser = async () => {
    try {
      if (refreshing) return;

      const response = await fetch("http://localhost:5000/verify", {
        method: "POST",
        headers: header,
        credentials: "include",
      });
      if (response.status === 403 || response.ok) {
        isRefreshing(true);
        await refreshAndDispatchToken();
      } else if (!response.ok) {
        dispatch(setCredentials({ token: "", email: "", username: "" }));
      }
    } catch (err) {
      console.log(err);
    } finally {
      isRefreshing(false);
    }
  };

  useEffect(() => {
    isUser();
    const intervalId = setInterval(isUser, 1000 * 60 * 5);
    return () => clearInterval(intervalId);
  }, [token]);

  return token ? (
    <div className="overflow-hidden h-screen w-screen">
      {newTodo && <NewTodo />}
      {joinTodo && <JoinTodo />}
      <Navbar />
      <div className="flex w-full h-full">
        <TodoList />
        <div className="flex flex-col w-full h-full">
          <TodoBar />
          <TaskList />
        </div>
      </div>
    </div>
  ) : (
    <div>You're not here.</div>
  );
};

export default ToDo;
