import { useContext } from "react";
import WeatherContext from "../WeatherContext";
function Forecast() {
  const { forecastData, loading, error, data } = useContext(WeatherContext);

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
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        {data.city.name} - {data.city.country}
      </h2>
      <h2 className="text-center mb-4">Next 5 days Weather</h2>

      <div className="row justify-content-center">
        {forecastData.slice(1).map((day, index) => (
          <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
            <div className="card p-3 text-center shadow">
              <h5>{day.date}</h5>
              <img
                src={day.icon}
                alt="weather icon"
                style={{ width: "100px", height: "100px" }}
                className="mx-auto"
              />
              <p className="mb-1">{day.description}</p>
              <p className="mb-1">🌡 Máx: {day.avgTemp} °C</p>
              <p className="mb-1">🌡 Mín: {day.minTemp} °C</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
