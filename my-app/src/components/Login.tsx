import { useCallback } from "react";
import { useDispatch } from "react-redux";
import Input from "./Input";
import { loadingOpen } from "../state/modal";

interface LoginProps {
  setRegister: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setRegister }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    dispatch(loadingOpen);
  };

  const handleRegister = useCallback(() => {
    setRegister(true);
  }, [setRegister]);
  return (
    <>
      <h1 className="text-4xl cursor-default">Login</h1>
      <form
        className="flex justify-center flex-col"
        onSubmit={() => handleSubmit}
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
