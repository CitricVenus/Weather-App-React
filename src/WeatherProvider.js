import { Children } from "react";
import WeatherContext from "./WeatherContext";
import axios from "axios";
import { use, useEffect, useState } from "react";

export const WeatherProvider = ({ children, city = "London" }) => {
  const apiKey = "d8a2029e3127dc96adc301be11dc029d";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [icon, setIcon] = useState();
  const [forecastData, setForecastData] = useState(null);

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  //Sacar datos para 5 dias
  const groupForecastByDay = (forecastList) => {
    const grouped = {};

    forecastList.forEach((item) => {
      const date = item.dt_txt.split(" ")[0]; // también estabas usando split("") incorrectamente
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    });

    return grouped;
  };

  //Sacar resumen de clima diario  a partir del filtrado anterior

  const getDailySummaries = (groupedForecast) => {
    return Object.entries(groupedForecast).map(([date, items]) => {
      const dayName = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
      });
      const midday =
        items.find((item) => item.dt_txt.includes("12:00:00")) || items[0];

      const avgTemp =
        items.reduce((sum, item) => sum + item.main.temp, 0) / items.length;

      const minTemp = Math.min(...items.map((item) => item.main.temp_min));

      return {
        date: dayName.charAt(0).toUpperCase() + dayName.slice(1),
        avgTemp: avgTemp.toFixed(1),
        minTemp: minTemp.toFixed(1),
        description: midday.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${midday.weather[0].icon}@4x.png`,
      };
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;
    setLoading(true);
    setError(null);
    axios
      .get(url, { signal: controller.signal })
      .then((response) => {
        if (isMounted) {
          const grouped = groupForecastByDay(response.data.list);
          const dailyForecast = getDailySummaries(grouped);
          setData(response.data);
          setLoading(false);
          setForecastData(dailyForecast);
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
    }
  }, [data, forecastData]);

  return (
    <WeatherContext.Provider
      value={{ data, loading, error, icon, forecastData }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
