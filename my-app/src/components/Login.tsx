import { useCallback } from "react";
import { useDispatch } from "react-redux";
import Input from "./Input";
import { loadingClose, loadingOpen } from "../state/modal";
import { setCredentials } from "../state/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    await toast
      .promise(
        fetch(`${process.env.REACT_APP_API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        }).then(async (response) => {
          if (!response.ok) {
            return Promise.reject("Invalid credentials");
          }
          const data = await response.json();
          dispatch(setCredentials(data));
          navigate("/todo");
        }),
        {
          pending: "Logging in...",
          success: "Logged in",
          error: "Invalid credentials",
        },
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      )
      .catch(() => {});
    dispatch(loadingClose());
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
            className="underline cursor-pointer hover:text-green-800"
            onClick={handleRegister}
          >
            Click here
          </p>
        </div>
        <button
          type="submit"
          className="bg-green-800 text-white p-3 m-3 hover:bg-green-700 duration-500 transition-all font-medium"
        >
          Continue
        </button>
      </form>
    </>
  );
};

export default Login;
