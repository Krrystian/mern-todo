import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../state/user";

const Navbar = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [menu, isMenu] = useState<boolean>(false);
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
    <section className="w-full h-[50px] flex items-center gap-1 justify-end px-10 border-b-2 relative">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => isMenu((prev) => !prev)}
      >
        Hello, <span className="text-green-700">{user.username}</span>
      </h1>
      <AiOutlineArrowLeft
        size={20}
        className={`duration-500 transition-all cursor-pointer ${
          menu ? "-rotate-90" : ""
        }`}
        onClick={() => isMenu((prev) => !prev)}
      />
      <div
        className={`absolute bg-white translate-y-12 duration-500 transition-all ${
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
