import React, { useState, useEffect } from "react";
import "./css/styles.css";
import Header from "./components/header";
import Main from "./components/main";

// initial listed items id
let nextId = 0;

// header logo (weather booth)
const HeaderLogo = () => (
  <span className="headerLogo">
    <strong>
      <i>weather</i>
    </strong>
    booth
  </span>
);

function App() {
  // state
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [temp, setTemp] = useState(<HeaderLogo />);
  const [time, setTime] = useState("Search for a city");
  const [condition, setCondition] = useState([]);
  const [conditionText, setConditionText] = useState("");
  const [cloudy, setCloudy] = useState([0]);
  const [humidity, setHumidity] = useState([0]);
  const [wind, setWind] = useState([0]);
  const [precipitation, setPrecipitation] = useState([0]);
  const [cityList, setcityList] = useState([]);
  const [isDay, setIsDay] = useState(3);

  // use Effect or component did mount
  useEffect(() => {
    const saveCityListElement = document.querySelector(".saved-citys");
    saveCityListElement.style.display = "none";
    if (cityList.length > 0) {
      saveCityListElement.style.display = "block";
    }
    // change background color based on time of day
    backgroundColor();
  });

  //api call
  const locationSearch = (userInput) => {
    const input = document.getElementById("search-input");
    //feth api call. Update state
      fetch(`https://api.weatherapi.com/v1/current.json?key=36279875f3bd444e934214049221502&q=${userInput}`)
        .then((res) => res.json())
        .then((result) => {
          // remove the decimal from the temperature using Math.trunc
          // set the states
          setCity(result.location.name);
          setRegion(result.location.region);
          setTemp(Math.trunc(result.current.temp_f));
          setCondition(result.current.condition.icon);
          setCloudy(result.current.cloud);
          setHumidity(result.current.humidity);
          setWind(result.current.wind_mph);
          setPrecipitation(result.current.precip_in);
          setConditionText(result.current.condition.text);
          setIsDay(result.current.is_day);
          setTime(formatAMPM(new Date));

          // Saved citys list
          //push city object into cityList array
          cityList.push({
            id: nextId++,
            city: result.location.name,
            region: result.location.region,
          });

          // returns citylist array without duplicates
          const cityListFilteredDuplicates = cityList.reduce((accumulator, current) => {
            if (!accumulator.find((item) => item.city === current.city)) {
              accumulator.push(current);
            }
            return accumulator;
          }, []);

          // update saved citys with filtered out duplicates
          setcityList(cityListFilteredDuplicates);
        }
        ).catch((error) => {
            alert("(Invalid input) Search for a city name or zipcode " + "ErrorMessage: " + error)
        })
    // clear the input
    input.value = "";
  }

  // search icon or enter keyboard button - form handler
  const formSubmit = (e) => {
    e.preventDefault();
    // get user input
    const userInput = e.target[0].value;
    locationSearch(userInput);
  };

  // search city in list - click handler
  const searchSavedCity = (e) => {
    const clickedLi = e.target;
    locationSearch(clickedLi.textContent);
  };

  // remove city when remove button(x) is clicked -  click handler
  const removeCity = (e) => {
    // get city name
    const cityName = e.target.parentNode.parentNode.firstChild.textContent;
    // return new arry with removed city
    const newCityList = cityList.filter((city) => city.city !== cityName);
    setcityList(newCityList);
  };

  // set background color based on current time of day
  // light blue for day, black for night 
  const backgroundColor = () => {
    const body = document.querySelector("body");
    if (isDay === 1) {
      // day
      body.style.backgroundColor = "#1ecbe1"
    }else if(isDay === 0 ){
      // night
      body.style.backgroundColor = "#01090a"
    }
  }
  
  // get date and time
  function formatAMPM(date) {
  // get current time with 12 hour format
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  // get current date
  let currentDate = new Date().toLocaleDateString();
  return strTime + " " + currentDate;
  }

  // render
    return (
       // main app render
      <div className="App">
        {/* top or left side of app */}
          <Header 
            cityName={city} 
            region={region} 
            temperature={temp} 
            time={time} 
            condition={condition} 
            conditionText={conditionText} />
        {/* bottom or right side of app */}
          <Main
          cityName={city}
          region={region}
          formSubmit={formSubmit}
          cloudy={cloudy}
          humidity={humidity}
          wind={wind}
          precipitation={precipitation}
          cityList={cityList}
          clickSearch={searchSavedCity}
          removeListedCity={removeCity}
          />
      </div>
    );
}


export default App;
