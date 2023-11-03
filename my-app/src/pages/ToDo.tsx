import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, updateToken } from "../state/user";

const ToDo = () => {
  const token = useSelector((state: any) => state.user.token);
  const dispatch = useDispatch();

  const showUser = async () => {
    const response = await fetch("http://localhost:5000/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 403) {
      const refreshResponse = await fetch("http://localhost:5000/refresh", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      if (refreshResponse.ok) {
        const data = await refreshResponse.json(); //DISPATCH NIE DZIALA
        dispatch(updateToken({ token: data.token }));
      } else {
        dispatch(setCredentials({ token: "", email: "", username: "" }));
      }
    } else if (!response.ok) {
      dispatch(setCredentials({ token: "", email: "", username: "" }));
    }
  };

  useEffect(() => {
    showUser();
    const intervalId = setInterval(showUser, 1000 * 10);
    return () => clearInterval(intervalId);
  }, []);

  return token ? <div>You're here.</div> : <div>You're not here.</div>;
};

export default ToDo;
