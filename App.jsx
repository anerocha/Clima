import { useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import WeatherInfos from "./components/WeatherInfos/WeatherInfos";
import WeatherInfos5Days from "./components/WeatherInfos5Days/WeatherInfos5Days";

function App() {
  const [weather, setWeather] = useState();
  const [weather5Days, setWeather5Days] = useState();
  const inputRef = useRef();

  async function searchCity() {
    const city = inputRef.current.value;
    const key = "9280581cb26c8418387f1ce9ef077a7c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    const apiInfo = await axios.get(url);
    const apiInfo5Days = await axios.get(url5Days);
    setWeather5Days(apiInfo5Days.data);
    setWeather(apiInfo.data);
  }

  return (
    <div className="container">
      <h1>Previsão do Tempo</h1>
      <input ref={inputRef} type="text" placeholder="Pesquisar cidade" />
      <button onClick={searchCity}>Buscar</button>

      {weather && <WeatherInfos weather={weather} />}
      {weather5Days && <WeatherInfos5Days weather5Days={weather5Days} />}
    </div>
  );
}

export default App;
