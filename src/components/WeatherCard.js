import axios from "axios";
import { use, useEffect, useState } from "react";

function WeatherCard() {
  const apiKey = "d8a2029e3127dc96adc301be11dc029d";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [icon, setIcon] = useState();
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&appid=${apiKey}`;

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;
    setLoading(true);
    setError(null);
    axios
      .get(url, { signal: controller.signal })
      .then((response) => {
        if (isMounted) {
          console.log(response);
          setData(response.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (
          axios.isCancel?.(err) ||
          err.code === "ERR_CANCELED" ||
          err.name === "CanceledError" ||
          err.name === "AbortError"
        ) {
        } else if (isMounted) {
          setError("Error getting data");
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url]);

  useEffect(() => {
    if (data) {
      setIcon(
        `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png`
      );
      console.log();
      console.log(data.list[0].main.temp_max);
    }
  }, [data]);

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
        <div className="text-center">
          <h1>
            {data.city.name} - {data.city.country}
          </h1>
        </div>
        <div className="text-center">
          <img
            src={icon}
            className="card-img-top"
            alt="weather"
            style={{ width: "200px", height: "200px" }}
          ></img>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
