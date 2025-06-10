import { useContext } from "react";
import WeatherContext from "../WeatherContext";

function WeatherCard() {
  const { data, loading, error, icon } = useContext(WeatherContext);

  if (loading)
    return (
      <div className="text-center pt-5">
        {" "}
        <div className="spinner-border" role="status">
          <span className="visually-hidden"> Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-center pt-5">
        <div> Error getting data</div>
      </div>
    );

  return (
    <div className="container pt-5">
      <div className="card">
        {/*Show the city name and countryu */}
        <div className="text-center pt-4">
          <h1>
            {data.city.name} - {data.city.country}
          </h1>
        </div>

        {/* Show Weather information and the icon*/}
        <div className="text-center">
          <img
            src={icon}
            className="card-img-top"
            alt="weather"
            style={{ width: "200px", height: "200px" }}
          ></img>
          <h2>{data.list[0].weather[0].main}</h2>
          <h2> {data.list[0].weather[0].description}</h2>
        </div>

        {/*Show temperature*/}
        <div className="row d-flex pt-5">
          <div className="col-12 col-md-4 text-center">
            <h3> Max Temperature</h3> <h4> {data.list[0].main.temp_max} °C</h4>
          </div>
          <div className="col-12 col-md-4 text-center">
            <h3>Temperature</h3> <h4> {data.list[0].main.temp} °C</h4>
          </div>
          <div className="col-12 col-md-4 text-center">
            <h3> Min Temperature</h3> <h4> {data.list[0].main.temp_min} °C</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
