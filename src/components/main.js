import React from "react";
const Main = (props) => {
  return (
    <div className="main">
      <div className="main-content">
        <form id="search-form" onSubmit={props.formSubmit}>
          <input type="text" id="search-input" placeholder="city or zipcode" />
          <button type="submit" className="btn">
            <i className="fa-solid fa-magnifying-glass fa-2xl"></i>
          </button>
        </form>
        <ul className="saved-citys">
          {/* city's searched will get listed here as an list item */}
          {props.cityList.map((obj) => (
            <div key={obj.id} className="listedCity">
              <li onClick={props.clickSearch}>{obj.city}</li>
              <span onClick={props.removeListedCity}>
                <i className="fa-solid fa-delete-left" />
              </span>
            </div>
          ))}
        </ul>
        <div className="weather-details">
          <h2 className="weather-details-title">Weather Details</h2>
          <div className="cloudy">
            <h3 className="cloudy-title">Cloudy</h3>
            <span className="cloudy-percentage">{props.cloudy}%</span>
          </div>
          <div className="humidity">
            <h3 className="humidity-title">Humidity</h3>
            <span className="humidity-percentage">{props.humidity}%</span>
          </div>
          <div className="wind">
            <h3 className="wind-title">Wind</h3>
            <span className="wind-speed">{props.wind} mph</span>
          </div>
          <div className="rain">
            <h3 className="rain-title">Rain</h3>
            <span className="rain-level">{props.precipitation} in</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
