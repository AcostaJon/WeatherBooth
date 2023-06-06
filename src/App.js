import React, { useState, useEffect } from "react";
import "./css/styles.css";
import Header from "./components/header";
import Main from "./components/main";

// initial listed items id
let nextId = 0;

function App() {
  // state
  const [response, setResponse] = useState([])
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("Miami");
  const [searchedCitys, setsearchedCitys] = useState([]);
  const [temp, setTemp] = useState();
  const [city, setCity] = useState();
  const [condition, setCondition] = useState([]);
  const [conditionText, setConditionText] = useState("");
  const [cloudy, setCloudy] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [wind, setWind] = useState([]);
  const [precipitation, setPrecipitation] = useState([]);
  const [region, setRegion] = useState("");
  const [isDay, setIsDay] = useState(3);
  const [week, setWeek] = useState([]);
  const [warning, setWarning] = useState([]);

  // ********
  // *** Event Handlers ***
  // *********

  // useEffect api request, and set bg based on isDay
  useEffect(() => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=36279875f3bd444e934214049221502&q=${query}&days=4&aqi=no&alerts=yes`)
      .then(res => res.json())
      .then(res => {
        setResponse(res)
        setCloudy(res.current.cloud)
        setHumidity(res.current.humidity)
        setWind(res.current.wind_mph)
        setPrecipitation(res.current.precip_in)
        setTemp(res.current.temp_f)
        setCity(res.location.name)
        setRegion(res.location.region)
        setCondition(res.current.condition.icon)
        setConditionText(res.current.condition.text)
        setIsDay(res.current.is_day)
        setWeek(res.forecast.forecastday);
        setWarning(res.alerts.alert[0]);

        //create a "searched city object", push into array
        searchedCitys.push({
          id: nextId++,
          city: res.location.name,
        });
        // filter duplicates from array
        const filteredCitys = searchedCitys.reduce((accumulator, current) => {
          if (!accumulator.find((item) => item.city === current.city)) {
            accumulator.push(current);
          }
          return accumulator;
        }, []);
        // update searched city list 
        setsearchedCitys(filteredCitys)
      })
      .catch(err => {
        console.log(err)
      })
  }, [query]);

  // change background color based on current time of day
  // light blue for day, black for night 
  const backgroundColor = () => {
    const body = document.querySelector("body");
    if (isDay === 1) {
      // day
      body.style.backgroundColor = "#1ecbe1"
    } else if (isDay === 0) {
      // night
      body.style.backgroundColor = "#01090a"
    }
  }

  // search button - form handler
  const formSubmit = inputValue => {
    setQuery(inputValue);
  };

  // search saved city
  const searchSavedCity = (e) => {
    const clickedCity = e.target.innerText;
    formSubmit(clickedCity);
  };

  // remove city
  const removeCity = (e) => {
    const cityName = e.target.parentNode.parentNode.firstChild.textContent;
    const newCityList = searchedCitys.filter((city) => city.city !== cityName);
    setsearchedCitys(newCityList);
  };

  // show / hide 3 day forecast
  const displayForecast = (e) => {
    const foreCast = document.querySelector(".forecast-container");

    if (foreCast.style.display === "none" || foreCast.style.display === "") {
      foreCast.style.display = "flex"
    } else {
      foreCast.style.display = "none";
    }


  }

  // show / hide alert message
  const displayAlertMsg = (e) => {
    const alert = document.querySelector(".alertMsgContainer");

    if (alert.style.display === "none" || alert.style.display === "") {
      alert.style.display = "flex"
    } else {
      alert.style.display = "none";
    }

  }

  // invoke functions
  backgroundColor();

  {
    if (warning === "undefined") {
      setError(true);
    }
  }
  return (
    // main app render
    <div className="App">
      {/* top or left side of app */}
      <Header
        cityName={city}
        region={region}
        temperature={temp}
        condition={condition}
        conditionText={conditionText}
        week={week}
        warning={warning}
        displayForecast={displayForecast}
        displayAlertMsg={displayAlertMsg}
      />
      {/* bottom or right side of app */}
      <Main
        cloudy={cloudy}
        humidity={humidity}
        wind={wind}
        precipitation={precipitation}
        cityList={searchedCitys}
        formSubmit={formSubmit}
        clickSearch={searchSavedCity}
        removeListedCity={removeCity}
      />
    </div>
  );
}


export default App;
