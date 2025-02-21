import React, { use } from "react";
import { useState, useEffect } from "react";

const SearchBar = ({ dark, countries, setCountries, data, region }) => {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("none");
  const [subRegion, setSubRegion] = useState("none");
  const [sort, setSort] = useState(false);

  useEffect(() => {
    setCountries((prevState) =>
      sort
        ? [...prevState].sort((a, b) => a.population - b.population)
        : [...prevState].sort((a, b) => b.population - a.population)
    );
  }, [sort]);

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

      <select
        className={`p-2 px-4 rounded cursor-pointer
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
    </div>
  );
};

export default SearchBar;
