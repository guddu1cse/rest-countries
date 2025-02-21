import React from "react";
import { ThemeContext } from "./ThemeContext";
import { useContext } from "react";

const Navbar = () => {
  const { dark, setDark } = useContext(ThemeContext);
  return (
    <div
      className={`flex justify-between items-center p-4 sm:px-20 ${
        dark ? "bg-[#1E2939] text-white" : "bg-white text-[#1E2939]"
      }`}
    >
      <p className="text-xl sm:text-2xl font-bold">Where in the world ?</p>
      <button
        onClick={() => {
          setDark(!dark);
          localStorage.setItem("dark", !dark);
        }}
        className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
          dark ? "bg-gray-500 text-white" : "bg-gray-200 text-[#1E2939]"
        }`}
      >
        <div
          className={`w-5  h-5 bg-cover rounded-md bg-no-repeat ${
            dark
              ? "bg-[url('/src/assets/light.png')]"
              : "bg-[url('/src/assets/dark.png')]"
          }`}
        ></div>
      </button>
    </div>
  );
};

export default Navbar;
