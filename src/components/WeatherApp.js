//Main component where the data is fetch with Axios
import { useCityTime, useLocalTime } from "../hooks/useCityTime";
import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";

function WeatherApp() {
  const { hours, minutes, seconds } = useCityTime();

  return (
    <div>
      <div className="navbar navbar-dark bg-dark d-flex">
        {" "}
        <div className="container fluid ">
          <a className="navbar-brand"> Weather App With React</a>
          <h3 style={{ color: "white" }}>
            {hours}:{minutes}:{seconds}
          </h3>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search City"
              aria-label="Search"
            ></input>
            <button className="btn btn-light"> Search</button>
          </form>
        </div>
      </div>
      <div className="container">
        <WeatherCard></WeatherCard>
      </div>
    </div>
  );
}

export default WeatherApp;
