import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { settingsClose } from "../../state/modal";
import { AiOutlineClose } from "react-icons/ai";

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
  const handleClose = (e: any) => {
    dispatch(settingsClose());
  };
  const handleChangePassword = (e: any) => {};
  const handleChangeEmail = (e: any) => {};
  const handleChangeUsername = (e: any) => {};
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
              onClick={handleChangePassword}
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
              onClick={handleChangeEmail}
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
              onClick={handleChangeUsername}
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
