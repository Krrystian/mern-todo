import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, updateToken } from "../state/user";
import Navbar from "../components/Navbar";
import TodoList from "../components/TodoList";
import NewTodo from "../components/modals/NewTodo";

const ToDo = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.user.token);
  const newTodo = useSelector((state: any) => state.modal.newTodo.isOpen);
  const header = {
    "Content-Type": "application/json",
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
    const response = await fetch("http://localhost:5000/verify", {
      method: "POST",
      headers: header,
    });
    if (response.status === 403 || response.ok) {
      await refreshAndDispatchToken();
    } else if (!response.ok) {
      dispatch(setCredentials({ token: "", email: "", username: "" }));
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
      <Navbar />
      <TodoList />
    </div>
  ) : (
    <div>You're not here.</div>
  );
};

export default ToDo;
