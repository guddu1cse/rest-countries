import React, { use } from "react";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Cards from "./components/Cards";
import { api } from "./config";

const App = () => {
  const [data, setData] = useState([]);
  const [region, setRegion] = useState([]);
  const [countries, setCountries] = useState([]);
  const [dark, setDark] = useState(
    () => localStorage.getItem("dark") === "true"
  );

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    setCountries(data);
    setRegion(findRegions(data)); //setting the regions
  }, [data]);

  const findRegions = (data) => {
    return data.reduce(
      (acc, currVal) =>
        acc.includes(currVal.region) ? acc : [...acc, currVal.region],
      []
    );
  };

  return (
    <div
      className={`w-screen h-screen flex flex-col overflow-x-hidden ${
        dark ? "bg-[#1E2939]" : ""
      }`}
    >
      <Navbar setDark={setDark} dark={dark} />
      <SearchBar
        dark={dark}
        setCountries={setCountries}
        data={data}
        region={region}
      />
      <Cards countries={countries} dark={dark} />
    </div>
  );
};

export default App;
