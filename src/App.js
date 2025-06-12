import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherApp from "./components/WeatherApp";
import { WeatherProvider } from "./WeatherProvider";
import { useState } from "react";
import { MemoryRouter } from "react-router-dom";
function App() {
  const [city, setCity] = useState("London");
  return (
    <WeatherProvider city={city}>
      <div className="App">
        {" "}
        <WeatherApp setCity={setCity}></WeatherApp>{" "}
      </div>
    </WeatherProvider>
  );
}

export default App;
