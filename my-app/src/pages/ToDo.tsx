import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, updateToken } from "../state/user";
import Navbar from "../components/Navbar";
import TodoList from "../components/TodoList";
import NewTodo from "../components/modals/NewTodo";
import TodoBar from "../components/TodoBar";
import TaskList from "../components/TaskList";
import JoinTodo from "../components/modals/JoinTodo";
import SharingList from "../components/modals/SharingList";
import TitleTodo from "../components/modals/TitleTodo";
import PasswordTodo from "../components/modals/PasswordTodo";
import NewTask from "../components/modals/NewTask";
import { Link } from "react-router-dom";
const ToDo = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.user.token);
  const newTodo = useSelector((state: any) => state.modal.newTodo.isOpen);
  const newTask = useSelector((state: any) => state.modal.newTask.isOpen);
  const joinTodo = useSelector((state: any) => state.modal.joinNewTodo.isOpen);
  const sharing = useSelector((state: any) => state.modal.sharing.isOpen);
  const title = useSelector((state: any) => state.modal.title.isOpen);
  const password = useSelector((state: any) => state.modal.password.isOpen);
  const tokenRef = useRef(token);

  // Update the ref when the token changes
  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  const refreshAndDispatchToken = useCallback(
    async (header: any) => {
      try {
        const res = await fetch("http://localhost:5000/refresh", {
          method: "GET",
          headers: header,
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          dispatch(updateToken({ token: data.token }));
        } else {
          dispatch(setCredentials({ token: "", email: "", username: "" }));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );

  const isUser = useCallback(async () => {
    const header = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
      Authorization: `Bearer ${tokenRef.current}`,
    };
    try {
      const response = await fetch("http://localhost:5000/verify", {
        method: "POST",
        headers: header,
      });

      if (response.status === 403 || response.ok) {
        await refreshAndDispatchToken(header);
      } else if (!response.ok) {
        dispatch(setCredentials({ token: "", email: "", username: "" }));
      }
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, refreshAndDispatchToken]);

  useEffect(() => {
    const fetchData = async () => {
      await isUser();
    };
    fetchData();
    const intervalId = setInterval(fetchData, 1000 * 60 * 15);
    return () => clearInterval(intervalId);
  }, []);

  return token ? (
    <div className="overflow-hidden h-screen w-screen">
      {newTodo && <NewTodo />}
      {joinTodo && <JoinTodo />}
      {sharing && <SharingList />}
      {title && <TitleTodo />}
      {password && <PasswordTodo />}
      {newTask && <NewTask />}
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
    //Simple unauthorized access module
    <div className="w-screen h-screen flex gap-3 justify-center items-center flex-col cursor-default">
      <h2 className="font-extrabold text-3xl w-screen text-center">
        Unauthorized access
      </h2>
      <Link
        to="/"
        className="text-black/70 text-xl max-w-screen text-center cursor-pointer
        hover:text-blue-900 hover:scale-150 transition-all duration-300"
      >
        Please login or register
      </Link>
    </div>
  );
};

export default ToDo;
