import { useCallback } from "react";
import { useDispatch } from "react-redux";
import Input from "./Input";
import { loadingClose, loadingOpen } from "../state/modal";
import { setCredentials } from "../state/user";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  setRegister: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setRegister }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(loadingOpen());
    const { email, password } = e.target.elements;
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      dispatch(setCredentials(data));
      dispatch(loadingClose());
      navigate("/todo");
    }
  };

  const handleRegister = useCallback(() => {
    setRegister(true);
  }, [setRegister]);
  return (
    <>
      <h1 className="text-4xl cursor-default">Login</h1>
      <form
        className="flex justify-center flex-col"
        onSubmit={handleSubmit}
        method="post"
      >
        <Input name="email" type="email" label="Email" required />
        <Input type="password" name="password" label="Password" required />
        <div className="flex justify-between px-3">
          <p className="text-md cursor-default">Don't remember a password?</p>
          <p
            className="underline cursor-pointer hover:text-green-600"
            onClick={handleRegister}
          >
            Click here
          </p>
        </div>
        <button
          type="submit"
          className="bg-green-700 text-white p-3 m-3 hover:bg-green-600 duration-500 transition-all font-medium"
        >
          Continue
        </button>
      </form>
    </>
  );
};

export default Login;
