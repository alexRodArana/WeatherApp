import React, { useState } from "react";

interface WeatherData {
  id: number;
  name: string;
  temp: number;
  humidity: number;
}

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState("");
  const [weatherList, setWeatherList] = useState<WeatherData[]>([]);

  const fetchWeather = async () => {
    if (!city.trim()) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=98c0ecd5164e4d0da9c130829252502&units=metric`
      );
      if (!response.ok) throw new Error("Ciudad no encontrada");
      const data = await response.json();
      const newWeather: WeatherData = {
        id: data.id,
        name: data.name,
        temp: data.main.temp,
        humidity: data.main.humidity,
      };
      setWeatherList((prev) => [...prev, newWeather]);
      setCity("");
    } catch (error) {
      alert(error.message);
    }
  };

  const removeCard = (id: number) => {
    setWeatherList((prev) => prev.filter((weather) => weather.id !== id));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Ingresa una ciudad"
          className="p-2 border rounded w-full"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {weatherList.map((weather) => (
          <div
            key={weather.id}
            className="relative p-4 border rounded shadow-lg bg-white"
          >
            <button
              onClick={() => removeCard(weather.id)}
              className="absolute top-2 right-2 text-red-500"
            >
              ×
            </button>
            <h3 className="text-lg font-bold">{weather.name}</h3>
            <p>Temperatura: {weather.temp}°C</p>
            <p>Humedad: {weather.humidity}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;