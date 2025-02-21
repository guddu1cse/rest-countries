import React, { use } from "react";
import { useState, useEffect } from "react";

const SearchBar = ({ dark, countries, setCountries, data, region }) => {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("none");
  const [subRegion, setSubRegion] = useState([]);
  const [selectedSubRegion, setSelectedSubRegion] = useState("none");
  const [sort, setSort] = useState(false);

  useEffect(() => {
    setCountries((prevState) =>
      sort
        ? [...prevState].sort((a, b) => a.population - b.population)
        : [...prevState].sort((a, b) => b.population - a.population)
    );
  }, [sort]);

  useEffect(() => {
    if (selectedRegion !== "none") {
      setSubRegion(() => {
        return countries.reduce(
          (acc, currVal) =>
            acc.includes(currVal.subregion) ? acc : [...acc, currVal.subregion],
          []
        );
      });
    } else {
      setSubRegion([]);
      setSelectedSubRegion("none");
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedSubRegion !== "none") {
      setCountries(
        data
          .filter((country) => country.region === selectedRegion)
          .filter((country) => country.subregion === selectedSubRegion)
      );
    }
  }, [selectedSubRegion]);

  const handleChange = (searchItem) => {
    setSearch(searchItem);
    setCountries(
      selectedRegion === "none"
        ? data.filter((country) =>
            country.name.common.toLowerCase().includes(searchItem.toLowerCase())
          )
        : data
            .filter((country) => country.region === selectedRegion)
            .filter((country) =>
              country.name.common
                .toLowerCase()
                .includes(searchItem.toLowerCase())
            )
    );
  };

  const handleResionChange = (e) => {
    setCountries(
      e.target.value === "none"
        ? data
        : data.filter((country) => country.region === e.target.value)
    );
    setSelectedRegion(e.target.value);
  };

  const handleSubRegionChange = (e) => {
    setSelectedSubRegion(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div
      className={`sm:flex items-center justify-between p-4 sm:px-20 gap-2   border-b border-b-gray-200
    ${dark ? "bg-[#1E2939] text-white" : "bg-white text-[#1E2939]"}`}
    >
      <div className="flex items-center justify-center">
        <input
          className={`p-2 px-4 rounded mb-2 sm:mb-0 mr-2
         ${dark ? "bg-gray-500 text-white" : "bg-gray-200 text-[#1E2939]"}
        `}
          type="text"
          placeholder="🔍 Search for a country..."
          value={search}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />

        <button
          onClick={() => {
            setSort((prev) => !prev);
          }}
          className={`flex mb-2 sm:mb-0 items-center justify-center gap-2 p-2 rounded cursor-pointer ${
            dark ? "bg-gray-500 text-white" : "bg-gray-200 text-[#1E2939]"
          }`}
        >
          <div
            className={`w-5  h-5 bg-cover rounded-md bg-no-repeat bg-[url('/src/assets/sorting.png')] ${
              sort ? "rotate-180" : ""
            }`}
          >
            {/* sorting btn */}
          </div>
        </button>
      </div>

      <div className="sm:flex items-center">
        {/* region options */}
        <select
          className={`p-2 px-4 m-2 rounded cursor-pointer
      ${dark ? "bg-gray-500 text-white" : "bg-gray-200 text-[#1E2939]"}
      `}
          onChange={(e) => handleResionChange(e)}
        >
          <option value="none">Filter by Region</option>
          {region.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        {/* sub region options*/}
        {subRegion.length > 0 &&
          (subRegion.length > 1 ? (
            <select
              className={`p-2 px-4 rounded cursor-pointer
        ${dark ? "bg-gray-500 text-white" : "bg-gray-200 text-[#1E2939]"}
        `}
              onChange={(e) => handleSubRegionChange(e)}
            >
              <option value="none">Filter by Sub Region</option>
              {subRegion.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          ) : (
            <h3
              className={`p-2 px-4 rounded cursor-pointer ${
                dark ? "bg-gray-500 text-white" : "bg-gray-200 text-[#1E2939]"
              }`}
            >
              No Sub Region
            </h3>
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
