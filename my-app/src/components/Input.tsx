import React, { useState } from "react";
interface InputProps {
  type?: string;
  label?: string;
  name?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ type, name, label, required }) => {
  const [isFocused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-row relative">
      <label
        htmlFor={name}
        className={`absolute left-5 bg-white transform cursor-text px-1 ${
          isFocused || inputValue ? "top-0" : "translate-y-[100%]"
        } transition-transform`}
      >
        {label}
      </label>
      <input
        id={name}
        className="p-3 border focus:outline-8 border-black placeholder:text-gray-400 m-3 w-[300px]"
        type={type}
        name={name}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={inputValue}
        onChange={handleInputChange}
        required={required}
      />
    </div>
  );
};

export default Input;
