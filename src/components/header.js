import React from "react";

const Header = (props) => {
  // show the forehnheit symbol when the temperture is shown
  const show = () => {
    const headerSup = document.querySelector(".temperature sup");
    if (headerSup !== null) {
      setTimeout(() => {
        headerSup.className = "";
      }, 100);
    }
  };
  show();

  return (
    <div className="header">
      <div className="header-content">
        <span className="temperature">
          {props.temperature}
          <sup className="hide">o</sup>
        </span>
        <div className="city-time">
          <h1 className="city">
            {props.cityName} <span id="location-region">{props.region}</span>
          </h1>
          <p className="time-date">{props.time}</p>
        </div>
        <span className="weather-condition">
          <img id="weatherConditionIcon" src={props.condition} />
          <p>{props.conditionText}</p>
        </span>
      </div>
    </div>
  );
};

export default Header;
