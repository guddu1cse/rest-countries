import React, { use, useContext } from "react";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { api } from "./config";
import { ThemeContext } from "./components/ThemeContext";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Country from "./components/Country";

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
      .then((res) =>
        setData(() => res.map((country, index) => ({ ...country, id: index })))
      );
  }, []);

  useEffect(() => {
    localStorage.setItem("countries", JSON.stringify(data));
    setCountries(data);
    setRegion(findRegions(data));

    return () => localStorage.removeItem("countries");
  }, [data]);

  const findRegions = (data) => {
    return data.reduce(
      (acc, currVal) =>
        acc.includes(currVal.region) ? acc : [...acc, currVal.region],
      []
    );
  };

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <BrowserRouter>
        <div
          className={`w-screen h-screen flex flex-col overflow-x-hidden ${
            dark ? "bg-[#1E2939]" : ""
          }`}
        >
          <Navbar />
          <Routes>
            <Route
              path="/rest-countries/"
              element={
                <Home
                  countries={countries}
                  setCountries={setCountries}
                  data={data}
                  region={region}
                />
              }
            />
            <Route
              path="/rest-countries/countries/:id"
              element={<Country countries={data} />}
            />
            {/* <Route path="/home" element={<Home />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
};

export default App;
