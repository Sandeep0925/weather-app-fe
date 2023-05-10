import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const url = `https://theta-topic-385706.uc.r.appspot.com/weather/${location}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      setLoading(true);
      axios.get(url).then((response) => {
        setData(response.data);
        setLoading(false);
        setError(false);
      }).catch(e=>{
        setError(true);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter City Name"
          type="text"
        />
      </div>
      {error && <div className="error">Oops! We couldn't find the city you entered.</div>}
      <div className="container">
        <div className="top-holder">
          <div className="top">
            {!data.name && (
              <div class="welcome">
                {!loading && !error && <h1>☃ Welcome to Weather App 🌞</h1>}
                {loading && !error && <h1>Fetching data...</h1>}
                {!error && <p>Weather report at your fingertips!!!</p>}
              </div>
            )}
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
          {data.name !== undefined && (
            <div className="weather-image">
              <img src={data.weather[0].icon} alt="Weather" />
            </div>
          )}
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <hr />
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
