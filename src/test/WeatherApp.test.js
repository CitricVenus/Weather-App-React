import { render, screen } from "@testing-library/react";
import WeatherApp from "../components/WeatherApp";
import WeatherContext from "../WeatherContext";

describe("WeatherApp", () => {
  test("render WeatherApp minimal", () => {
    // Mock del contexto con toda la estructura necesaria para WeatherApp y Forecast
    const mockContext = {
      data: {
        city: { name: "London", country: "GB" },
        list: [
          {
            main: {
              temp_max: 20,
              temp: 15,
              temp_min: 10,
              humidity: 80,
            },
            weather: [
              {
                main: "Clouds",
                description: "scattered clouds",
                icon: "03d",
              },
            ],
          },
        ],
      },
      forecastData: [
        {
          date: "2025-06-11",
          icon: "https://openweathermap.org/img/wn/03d.png",
          description: "scattered clouds",
          avgTemp: 20,
          minTemp: 10,
        },
      ],
      loading: false,
      error: null,
      icon: "03d",
    };

    render(
      <WeatherContext.Provider value={mockContext}>
        <WeatherApp setCity={jest.fn()} />
      </WeatherContext.Provider>
    );

    // Verificaciones básicas para datos del mock
    expect(screen.getByText(/London/i)).toBeInTheDocument();
    expect(screen.getByText(/GB/i)).toBeInTheDocument();

    expect(screen.getByText(/Clouds/i)).toBeInTheDocument();
    expect(screen.getByText(/scattered clouds/i)).toBeInTheDocument();

    expect(screen.getByText(/Max Temperature/i)).toBeInTheDocument();
    expect(screen.getByText(/20 °C/i)).toBeInTheDocument();

    // Verificar también que el Forecast se renderice con la info del mock
    expect(screen.getByText(/Next 5 days Weather/i)).toBeInTheDocument();
    expect(screen.getByText(/2025-06-11/i)).toBeInTheDocument();
    expect(screen.getByText(/🌡 Máx: 20 °C/i)).toBeInTheDocument();
    expect(screen.getByText(/🌡 Mín: 10 °C/i)).toBeInTheDocument();
  });
});
