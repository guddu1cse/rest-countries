import React from "react";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const Card = ({ country }) => {
  const { dark } = useContext(ThemeContext);
  return (
    <div
      className={`w-[100%] h-[100%] flex flex-col justify-center ${
        dark ? "bg-[#1E2939]" : ""
      }`}
    >
      <img src={country.flags.png} alt="" className="w-[100%] h-[50%]" />
      <p className={`text-xl font-bold px-5 ${dark ? "text-white" : ""}`}>
        {country.name.common}
      </p>
      <div className="flex flex-col justify-between px-5">
        <p className={`text-sm ${dark ? "text-white" : ""}`}>
          <span className="font-bold"> Population:</span> {country.population}
        </p>
        <p className={`text-sm ${dark ? "text-white" : ""}`}>
          <span className="font-bold"> Region:</span> {country.region}
        </p>
        <p className={`text-sm ${dark ? "text-white" : ""}`}>
          <span className="font-bold"> Capital:</span> {country.capital}
        </p>
      </div>
    </div>
  );
};

export default Card;
