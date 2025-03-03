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

  return ();
};

export default WeatherApp;
