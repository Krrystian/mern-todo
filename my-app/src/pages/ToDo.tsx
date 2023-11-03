import { useEffect } from "react";
import { useSelector } from "react-redux";

const ToDo = () => {
  const user = useSelector((state: any) => state.user.token);
  const showUser = async () => {
    const response = await fetch("http://localhost:5000/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
    });
    const res = await response.json();
  };
  useEffect(() => {
    showUser();
    const intervalId = setInterval(showUser, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return <div>You're here.</div>;
};

export default ToDo;
