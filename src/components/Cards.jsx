import React from "react";
import Card from "./Card";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
const Cards = ({ countries }) => {
  const { dark } = useContext(ThemeContext);
  return (
    <div
      className={`w-[100%] flex items-center justify-center
    ${dark ? "bg-[#1E2939]" : ""}`}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 300px)",
          gridTemplateRows: "repeat(auto-fill, 300px)",
        }}
        className={`w-[100%] h-full flex justify-center gap-4 ${
          dark ? "bg-[#1E2939]" : ""
        }`}
      >
        {countries.map((country) => (
          <div key={country.name.common}>
            <Card country={country} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
