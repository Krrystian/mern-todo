import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-screen bg-[#5b8266] text-[#aef6c7] h-screen flex gap-3 justify-center items-center flex-col cursor-default">
      <h1 className="font-extrabold text-9xl w-screen text-center tracking-widest">
        404
      </h1>
      <h2 className="font-extrabold text-3xl w-screen text-center tracking-widest">
        Website not found
      </h2>
      <Link
        to="/"
        className="text-[#212922] text-xl max-w-screen text-center cursor-pointer
    hover:text-[#294936] hover:scale-150 transition-all duration-300"
      >
        Go to main website
      </Link>
    </div>
  );
};

export default NotFound;
