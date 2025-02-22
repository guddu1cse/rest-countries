import React from "react";
import Cards from "./Cards";
import SearchBar from "./SearchBar";

const Home = ({ setCountries, data, region, countries }) => {
  return (
    <>
      <SearchBar
        countries={countries}
        setCountries={setCountries}
        data={data}
        region={region}
      />
      <Cards countries={countries} />
    </>
  );
};

export default Home;
