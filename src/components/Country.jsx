import React, { use, useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";

const Country = ({ countries }) => {
  const { id } = useParams();
  const [allCountries, setAllCountries] = useState(() =>
    localStorage.getItem("countries") === null
      ? countries
      : JSON.parse(localStorage.getItem("countries"))
  );

  const navigate = useNavigate();
  const [country, setCountry] = useState(() =>
    localStorage.getItem("countries") === null
      ? countries[id]
      : JSON.parse(localStorage.getItem("countries"))[id]
  );
  const { dark } = useContext(ThemeContext);

  useEffect(() => {
    setCountry(allCountries[id]);
  }, [country, id, allCountries]);

  const getNativeName = (country) => {
    const entries = Object.values(country.name.nativeName);
    const nativeName = entries[0].common;
    return nativeName;
  };

  const getBorders = (borders) => {
    return borders.map((border) => {
      const country = allCountries.find((country) => country.cca3 === border);
      return { id: country.id, name: country.name.common };
    });
  };

  return (
    <div
      className={`w-[100%] h-[100%] flex flex-col items-center justify-center ${
        dark ? "bg-[#1E2939]" : ""
      }`}
    >
      <div className="w-[100%] flex justify-start px-20 mb-5">
        <button
          className={` border border-gray-300  p-2 rounded-md ${
            dark ? "text-white bg-[#2E2939]" : "bg-gray-200 text-[#2E2939]"
          }`}
          onClick={() => navigate("/rest-countries/")}
        >
          Go Back
        </button>
      </div>
      <div className="w-[90%] flex">
        <div
          className={`w-[600px] h-[400px] bg-no-repeat bg-cover bg-center`}
          style={{ backgroundImage: `url(${country.flags.png})` }}
        ></div>
        <div className={`w-[600px] flex flex-col gap-3 ml-4 justify-between`}>
          <div className="flex gap-3">
            <div className={`flex flex-col gap-3 ${dark ? "text-white" : ""}`}>
              <h1 className={`text-3xl font-bold ${dark ? "text-white" : ""}`}>
                {country.name.common}
              </h1>
              <p>
                <span className="font-bold">Native Name :</span>{" "}
                {getNativeName(country)}
              </p>
              <p>
                <span className="font-bold">Population :</span>{" "}
                {country.population}
              </p>
              <p>
                <span className="font-bold">Region :</span> {country.region}
              </p>
              <p>
                <span className="font-bold">Sub Region :</span>{" "}
                {country.subregion}
              </p>
              <p>
                <span className="font-bold">Capital :</span> {country.capital}
              </p>
            </div>
            <div className={` ${dark ? "text-white" : ""}`}>
              <p>
                <span className="font-bold">Top Level Domain :</span>{" "}
                {country.tld.join(", ")}
              </p>
              <p>
                <span className="font-bold">Currencies :</span>{" "}
                {Object.keys(country?.currencies)?.join(", ") && ""}
              </p>
              <p>
                <span className="font-bold">Languages :</span>{" "}
                {Object.values(country.languages).join(", ")}
              </p>
            </div>
          </div>
          <div className="flex gap-3 relative top-[-100px]">
            {country.borders ? (
              <h1 className={` ${dark ? "text-white" : ""}`}>
                <span className="font-bold">Border Countries :</span>{" "}
                {getBorders(country.borders).map((border) => (
                  <button
                    onClick={() =>
                      navigate(`/rest-countries/countries/${border.id}`)
                    }
                    className={` border border-gray-300 m-1  p-1 rounded-md ${
                      dark
                        ? "text-white bg-[#2E2939]"
                        : "bg-gray-200 text-[#2E2939]"
                    }`}
                  >
                    {border.name}
                  </button>
                ))}
              </h1>
            ) : (
              <h1 className={` text-3xl ${dark ? "text-white" : ""}`}>
                No borders
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Country;
