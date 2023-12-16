import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../state/user";
import { menuClose, menuOpen, settingsOpen } from "../state/modal";
import { toast } from "react-toastify";

const Navbar = () => {
  const user = useSelector((state: any) => state.user);
  const todoName = useSelector((state: any) => state.user.todo.title);
  const dispatch = useDispatch();
  const [menu, isMenu] = useState<boolean>(false);
  const [hamburger, isHamburger] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await toast.promise(
      fetch(`${process.env.REACT_APP_API_URL}/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        credentials: "include",
      }).then(async (response) => {
        if (!response.ok) {
          return Promise.reject("Something went wrong!");
        }
        navigate("/");
        dispatch(setCredentials({ token: "", email: "", username: "" }));
      }),
      {
        pending: "Logging out...",
        success: "Logged out successfully!",
        error: "Something went wrong!",
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
    );
  };

  const handleSettings = () => {
    dispatch(settingsOpen());
    isMenu((prev) => !prev);
  };

  useEffect(() => {
    hamburger ? dispatch(menuClose()) : dispatch(menuOpen());
  }, [hamburger, dispatch]);

  return (
    <section className="w-full h-[8vh] flex items-center gap-1 justify-between px-5 border-b-2 border-[#AEF6C7] relative">
      <div
        className="cursor-pointer lg:hidden"
        onClick={() => isHamburger((prev) => !prev)}
      >
        {hamburger ? (
          <AiOutlineClose size={25} />
        ) : (
          <GiHamburgerMenu size={25} />
        )}
      </div>
      {todoName && (
        <div className="text-xl font-bold select-none cursor-default max-w-[20%] lg:hidden text-ellipsis whitespace-nowrap overflow-hidden">
          {todoName}
        </div>
      )}
      <h1 className="hidden lg:flex text-3xl tracking-widest font-extrabold cursor-default select-none">
        TODO
      </h1>
      <div
        className={`flex gap-2 h-full justify-center select-none transition-all duration-300 ${
          menu ? "lg:translate-x-0" : "lg:translate-x-[264px]"
        }`}
      >
        <h1
          className="text-2xl font-bold cursor-pointer self-center"
          onClick={() => isMenu((prev) => !prev)}
        >
          Hello, <span className="text-[#1a211a]">{user.username}</span>
        </h1>
        <AiOutlineArrowLeft
          size={20}
          className={`duration-500 self-center transition-all cursor-pointer ${
            menu ? "lg:-rotate-180 -rotate-90" : ""
          }`}
          onClick={() => isMenu((prev) => !prev)}
        />
        <div className="hidden lg:flex mx-6 h-full items-center">
          <ul className="h-full flex">
            <li
              className="cursor-pointer items-center flex text-xl px-4 h-full hover:bg-[#3e6259] duration-300"
              onClick={handleLogout}
            >
              Logout
            </li>
            <li
              className="cursor-pointer items-center flex text-xl px-4 h-full hover:bg-[#3e6259] duration-300"
              onClick={handleSettings}
            >
              Settings
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`absolute lg:hidden bg-[#294936] translate-y-[3rem] duration-500 transition-all right-10 ${
          menu ? "opacity-100" : "opacity-0 z-[-1]"
        }  ${menu ? " z-[100]" : ""}`}
      >
        <ul className="text-xl border-2 border-[#aef6c7] w-[150px] text-center">
          <li
            className="cursor-pointer px-2 hover:text-green-700 hover:bg-slate-50 duration-300 border-b-2"
            onClick={handleSettings}
          >
            Settings
          </li>
          <li
            className="cursor-pointer px-2 hover:bg-[#3e6259] duration-300"
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
