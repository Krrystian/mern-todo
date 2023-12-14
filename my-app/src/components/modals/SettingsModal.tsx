import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { settingsClose } from "../../state/modal";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../state/user";

enum Settings {
  Main,
  ChangePassword,
  ChangeEmail,
  ChangeUsername,
}

const SettingsModal = () => {
  const [level, setLevel] = useState<Settings>(Settings.Main);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = (e: any) => {
    dispatch(settingsClose());
  };

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
  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    const data = {
      id: user.id,
      oldPassword: e.currentTarget.elements.oldPassword.value,
      newPassword: e.currentTarget.elements.newPassword.value,
    };
    await toast
      .promise(
        fetch(`${process.env.REACT_APP_API_URL}/user/newPassword`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(data),
        }).then(async (response) => {
          if (!response.ok) {
            return Promise.reject("Something went wrong");
          }
          dispatch(settingsClose());
          handleLogout();
        }),
        {
          pending: "Changing password...",
          success: "Password changed. Logging out...",
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
      .catch((err) => {});
  };
  const handleChangeEmail = async (e: any) => {
    e.preventDefault();
    const data = {
      id: user.id,
      email: e.currentTarget.elements.email.value,
    };
    await toast
      .promise(
        fetch(`${process.env.REACT_APP_API_URL}/user/newEmail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(data),
        }).then(async (response) => {
          if (!response.ok) {
            return Promise.reject("Something went wrong");
          }
          dispatch(settingsClose());
          handleLogout();
        }),
        {
          pending: "Changing email...",
          success: "Email changed. Logging out...",
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
      .catch((err) => {});
  };
  const handleChangeUsername = async (e: any) => {
    e.preventDefault();
    const data = {
      id: user.id,
      username: e.currentTarget.elements.username.value,
    };
    await toast
      .promise(
        fetch(`${process.env.REACT_APP_API_URL}/user/newUsername`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(data),
        }).then(async (response) => {
          if (!response.ok) {
            return Promise.reject("Something went wrong");
          }
          dispatch(settingsClose());
          handleLogout();
        }),
        {
          pending: "Changing username...",
          success: "Username changed. Logging out...",
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
      .catch((err) => {});
  };
  const handleCancel = (e: any) => {
    setLevel((prev) => (prev = Settings.Main));
  };

  return (
    <section
      className="fixed h-screen w-screen overflow-hidden flex justify-center items-center z-50 bg-black/50"
      onClick={handleClose}
    >
      <div
        className="relative w-full md:w-2/5 xl:w-1/3 bg-[#294936] rounded-xl flex-col flex justify-center items-center p-3"
        onClick={(e: any) => e.stopPropagation()}
      >
        <AiOutlineClose
          size={20}
          className="absolute right-3 top-3 cursor-pointer"
          onClick={handleClose}
        />
        {level === Settings.Main && (
          <div className="flex flex-col gap-3 w-full justify-center">
            <h2 className="text-center text-3xl mb-3 font-semibold">
              User Settings
            </h2>
            <button
              className="w-full bg-green-800 hover:bg-green-700 duration-300 transition-all p-2 py-4"
              onClick={() =>
                setLevel((prev) => (prev = Settings.ChangePassword))
              }
            >
              Change password
            </button>
            <button
              className="w-full bg-green-800 hover:bg-green-700 duration-300 transition-all p-2 py-4"
              onClick={() => setLevel((prev) => (prev = Settings.ChangeEmail))}
            >
              Change email
            </button>
            <button
              className="w-full bg-green-800 hover:bg-green-700 duration-300 transition-all p-2 py-4"
              onClick={() =>
                setLevel((prev) => (prev = Settings.ChangeUsername))
              }
            >
              Change username
            </button>
          </div>
        )}
        {level === Settings.ChangePassword && (
          <div className="flex flex-col gap-3 w-full justify-center text-[#aef6c7]">
            <h2 className="text-center text-3xl mb-3 font-semibold">
              Change Password
            </h2>
            <form
              className="grid grid-cols-3 gap-4 w-full justify-center"
              onSubmit={handleChangePassword}
            >
              <label htmlFor="oldPassword" className="p-2">
                Old Password
              </label>
              <input
                type="password"
                name="oldPassword"
                id="oldPassword"
                required
                className="border-2 border-[#AEF6C7] rounded-md text-center col-span-2 bg-[#294936] focus:outline-none text-[#AEF6C7]"
              />
              <label htmlFor="newPassword" className="p-2">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                required
                className="border-2 border-[#AEF6C7] rounded-md text-center col-span-2 bg-[#294936] focus:outline-none text-[#AEF6C7]"
              />
              <div className="flex w-full col-span-3 gap-3">
                <button
                  className="bg-red-800 rounded-md p-3 w-full hover:bg-red-700 duration-300"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button className="bg-green-800 rounded-md p-3 w-full hover:bg-green-700 duration-300">
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
        {level === Settings.ChangeEmail && (
          <div className="flex flex-col gap-3 w-full justify-center text-[#aef6c7]">
            <h2 className="text-center text-3xl mb-3 font-semibold">
              Change Email
            </h2>
            <form
              className="grid grid-cols-3 gap-4 w-full justify-center"
              onSubmit={handleChangeEmail}
            >
              <label htmlFor="email" className="p-2">
                New Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="border-2 border-[#AEF6C7] rounded-md text-center col-span-2 bg-[#294936] focus:outline-none text-[#AEF6C7]"
              />
              <div className="flex w-full col-span-3 gap-3">
                <button
                  className="bg-red-800 rounded-md p-3 w-full hover:bg-red-700 duration-300"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button className="bg-green-800 rounded-md p-3 w-full hover:bg-green-700 duration-300">
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
        {level === Settings.ChangeUsername && (
          <div className="flex flex-col gap-3 w-full justify-center text-[#aef6c7]">
            <h2 className="text-center text-3xl mb-3 font-semibold">
              Change Username
            </h2>
            <form
              className="grid grid-cols-3 gap-4 w-full justify-center"
              onSubmit={handleChangeUsername}
            >
              <label htmlFor="username" className="p-2">
                New Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                required
                className="border-2 border-[#AEF6C7] rounded-md text-center col-span-2 bg-[#294936] focus:outline-none text-[#AEF6C7]"
              />
              <div className="flex w-full col-span-3 gap-3">
                <button
                  className="bg-red-800 rounded-md p-3 w-full hover:bg-red-700 duration-300"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button className="bg-green-800 rounded-md p-3 w-full hover:bg-green-700 duration-300">
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default SettingsModal;
