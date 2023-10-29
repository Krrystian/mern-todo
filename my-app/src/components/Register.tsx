import React, { useState } from "react";
import Input from "./Input";
import { useCallback } from "react";

interface RegisterProps {
  setLogin: (value: boolean) => void;
}

const handleSubmit = (e: any) => {
  e.preventDefault();
  const { email, username, password, password2 } = e.target.elements;
  console.log(email.value, username.value, password.value, password2.value);
};
const Register: React.FC<RegisterProps> = ({ setLogin }) => {
  const handleLogin = useCallback(() => {
    setLogin(false);
  }, [setLogin]);

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
