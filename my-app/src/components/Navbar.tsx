import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../state/user";

const Navbar = () => {
  const user = useSelector((state: any) => state.user);
  const todoName = useSelector((state: any) => state.user.todo.title);
  const dispatch = useDispatch();
  const [menu, isMenu] = useState<boolean>(false);
  const [hamburger, isHamburger] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await fetch("http://localhost:5000/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      credentials: "include",
    });
    if (response.ok) {
      navigate("/");
      dispatch(setCredentials({ token: "", email: "", username: "" }));
    }
  };
  return (
    <section className="w-full h-[6%] flex items-center gap-1 justify-between lg:justify-end px-5 border-b-2 relative">
      <div
        className="cursor-pointer lg:hidden"
        onClick={() => isHamburger((prev) => !prev)}
      >
        {hamburger ? <GrClose size={25} /> : <GiHamburgerMenu size={25} />}
      </div>
      {todoName && (
        <div className="text-xl font-bold select-none cursor-default text-green-700 lg:hidden">
          {todoName}
        </div>
      )}
      <div className="flex gap-2 justify-center select-none">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => isMenu((prev) => !prev)}
        >
          Hello, <span className="text-green-700">{user.username}</span>
        </h1>
        <AiOutlineArrowLeft
          size={20}
          className={`duration-500 self-center transition-all cursor-pointer ${
            menu ? "-rotate-90" : ""
          }`}
          onClick={() => isMenu((prev) => !prev)}
        />
      </div>
      <div
        className={`absolute bg-white translate-y-12 duration-500 transition-all right-10 ${
          menu ? "opacity-100" : "opacity-0 z-[-1]"
        }  ${menu ? " z-10" : ""}`}
      >
        <ul className="text-xl border-2 w-[150px] text-center">
          <li className="cursor-pointer px-2 hover:text-green-700 hover:bg-slate-50 duration-300 border-b-2">
            Settings
          </li>
          <li
            className="cursor-pointer px-2 hover:text-green-700 hover:bg-slate-50 duration-300"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Navbar;
