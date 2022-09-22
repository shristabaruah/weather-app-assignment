import { useState } from "react";
import { useEffect } from "react";
import "./weather.css";

const WeatherApp = () => {
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const [search, setSearch] = useState("mumbai");
  const [weather, setWeather] = useState("");
  const [toast, setToast] = useState("");
  const api = {
    base: "https://api.openweathermap.org/data/2.5/",
    key: "56a85ec5c39cff8ec36ee6a76b5a987f",
    city: search,
  };

  const fetchApi = async () => {
    try {
      if (search !== "") {
        const response = await fetch(
          `${api.base}weather?q=${api.city}&appid=${api.key}&units=metric`
        );
        if (response.status === 404) {
          setToast("No city found");
        }
        if (response.status === 200) {
          const data = await response.json();
          setWeather(() => data);
        }
      } else {
        setWeather("");
      }
    } catch (e) {
      console.error("error", e);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [search]);
  return (
    <>
      <main>
        <div id="container">
          <div className="search-input">
            <input
              type="search"
              placeholder="Search here"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {typeof weather.main === "undefined" ? (
            <p className="text">{toast}</p>
          ) : (
            <div className="details">
              <div className="detail-city">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
              <div className="detail-temp">
                {Math.round(weather.main.temp)}&deg;C
              </div>
              <div className="detail_weather">{weather.weather[0].main}</div>
              <div className="detail_feels">
                Feels like {Math.round(weather.main.feels_like)}&deg;C
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
export { WeatherApp };
