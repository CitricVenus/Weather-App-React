//Main component where the data is fetch with Axios
import { useContext, useEffect, useReducer, useState, useRef } from "react";
import WeatherCard from "./WeatherCard";
import { Routes, Route, NavLink, MemoryRouter } from "react-router-dom";
import WeatherContext from "../WeatherContext";
import Forecast from "./Forecast";

import axios from "axios";

function WeatherApp({ setCity }) {
  const { data, loading, error, icon } = useContext(WeatherContext);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const API_KEY = "d8a2029e3127dc96adc301be11dc029d";
  const inputRef = useRef();

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchCities = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct`,
          {
            params: {
              q: query,
              limit: 5,
              appid: API_KEY,
            },
          }
        );
        setSuggestions(response.data);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching cities", error);
        setSuggestions([]);
      }
    };

    fetchCities();
  }, [query]);

  const handleSelect = (city) => {
    setCity(city.name); // Actualizas el estado de la ciudad
    setQuery(city.name); // Actualizas el input
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <div className="navbar navbar-dark bg-dark d-flex">
        {" "}
        <div className="container ">
          <a className="navbar-brand"> Weather App With React</a>

          <ul className="nav nav-pills">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? `active bg-white text-dark` : `text-white`
                  }`
                }
                aria-current="page"
              >
                {" "}
                Home{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? `active bg-white text-dark` : `text-white`
                  }`
                }
                to="/forecast"
              >
                {" "}
                Forecast{" "}
              </NavLink>
            </li>
          </ul>

          <form
            role="form"
            className="d-flex"
            onSubmit={(e) => {
              e.preventDefault();
              setCity(query); // Actualizas al hacer submit
              setShowSuggestions(false);
            }}
            autoComplete="off"
          >
            <div style={{ position: "relative", width: "100%" }} ref={inputRef}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search City"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query.length >= 2 && setShowSuggestions(true)}
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul
                  className="list-group"
                  style={{
                    position: "absolute",
                    zIndex: 1000,
                    width: "100%",
                    top: "100%",
                  }}
                >
                  {suggestions.map((city, index) => (
                    <li
                      key={index}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleSelect(city)}
                      style={{ cursor: "pointer" }}
                    >
                      {city.name}, {city.state ? city.state + ", " : ""}
                      {city.country}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button className="btn btn-light ms-2" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="container align-self-start">
        <Routes>
          <Route path="/" element={<WeatherCard></WeatherCard>}></Route>
          <Route
            path="/Forecast"
            element={
              <Forecast
                data={data}
                loading={loading}
                error={error}
                icon={icon}
              ></Forecast>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default WeatherApp;
