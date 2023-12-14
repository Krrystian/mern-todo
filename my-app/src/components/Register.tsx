import React from "react";
import Input from "./Input";
import { useCallback } from "react";
import { loadingClose, loadingOpen } from "../state/modal";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

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
      dispatch(loadingClose());
      return toast.error("Passwords do not match. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }); //tostify replacement later
    }
    await toast
      .promise(
        fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.value,
            username: username.value,
            password: password.value,
          }),
        }).then(async (response) => {
          if (!response.ok) {
            dispatch(loadingClose());
            return Promise.reject("Something went wrong");
          }
          dispatch(loadingClose());
          window.location.reload();
        }),
        {
          pending: "Creating account...",
          success: "Account created",
          error: "Something went wrong",
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
            className="underline cursor-pointer hover:text-green-800"
            onClick={handleLogin}
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

export default Register;
