import React from "react";
import Alert from "./alert";
import Weekly from "./Weekly"

const Header = (props) => {
  // invoke date object
  let today = new Date();

  // current time
  let hours = today.getHours(); // gives the value in 24 hours format
  let AmOrPm = hours >= 12 ? 'pm' : 'am';
  hours = (hours % 12) || 12;
  let minutes = today.getMinutes();
  let time = hours + ":" + minutes + " " + AmOrPm;

  // forehnheit symbol
  const showFarehneheit = () => {
    const headerSup = document.querySelector(".temperature sup");
    if (headerSup !== null) {
      setTimeout(() => {
        headerSup.className = "";
      }, 100);
    }
  };

  // invoke showFarehneheit
  showFarehneheit();

  return (
    <div className="header">
      <div className="header-content">
        {/* daily */}
        <div className="temp-container">
          {/* city name */}
          <h1 className="city">
            {props.cityName}, <span id="location-region"> {props.region}</span>
          </h1>
          {/* icon and temp */}
          <div className="icon-temp">
            <span>
              {Math.ceil(props.temperature)}<sup>o</sup>
            </span>
          </div>
          {/* time */}
          <p className="time">{time}</p>
        </div>

        <div className="icon-container">
          <img id="weatherConditionIcon" src={props.condition} />
          <p>{props.conditionText}</p>
        </div>
      </div>

      <Weekly citys={props.week} displayForecast={props.displayForecast} />

      <Alert warning={props.warning} alertMsg={props.displayAlertMsg} city={props.cityName} region={props.region} />
    
    </div>
  );
};

export default Header;
