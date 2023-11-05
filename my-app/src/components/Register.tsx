import React from "react";
import Input from "./Input";
import { useCallback } from "react";
import { loadingClose, loadingOpen } from "../state/modal";
import { useDispatch } from "react-redux";

interface RegisterProps {
  setLogin: (value: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ setLogin }) => {
  const dispatch = useDispatch();

  const handleLogin = useCallback(() => {
    setLogin(false);
  }, [setLogin]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { email, username, password, password2 } = e.target.elements;
    dispatch(loadingOpen());
    if (password.value !== password2.value) {
      return alert("Passwords don't match"); //tostify replacement later
    }
    const response = await fetch("http://localhost:5000/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        username: username.value,
        password: password.value,
      }),
    });
    if (response.ok) {
      alert("Account created! Please login");
      dispatch(loadingClose());
      window.location.reload();
    }
  };

  return (
    <>
      <h1 className="text-4xl cursor-default">Make an account</h1>
      {}
      <form
        className="flex justify-center flex-col"
        onSubmit={handleSubmit}
        method="post"
      >
        <Input name="email" type="email" label="Email" required />
        <Input type="text" name="username" label="Username" required />
        <Input type="password" name="password" label="Password" required />
        <Input
          type="password"
          name="password2"
          label="Type your password again"
          required
        />
        <div className="flex justify-between px-3">
          <p className="text-md cursor-default ">Have an acccount?</p>
          <p
            className="underline cursor-pointer hover:text-green-600"
            onClick={handleLogin}
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

export default Register;
