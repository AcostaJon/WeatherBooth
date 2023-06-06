import React, { useState } from "react";

// Component- City
const City = (props) => {
  return (
    <div className="listedCity">
      <li onClick={props.clickSearch}>{props.city}</li>
      <span onClick={props.remove}>
        <i className="fa-solid fa-delete-left" />
      </span>
    </div>
  )
}

const Main = (props) => {
  const [inputValue, setinputValue] = useState("");
  const citys = props.cityList;

  //map through array and return city component
  let listedCitys = citys.map(obj => (
    <City key={obj.id} city={obj.city} clickSearch={props.clickSearch} remove={props.removeListedCity} />
  ))

  // handle form submit
  const handleSubmit = e => {
    e.preventDefault();
    const input = e.target[0];
    input.value = "";
    props.formSubmit(inputValue);
  }

  return (
    <div className="main">
      <div className="main-content">
        <form id="search-form" onSubmit={e => handleSubmit(e)}>
          <input type="text" id="search-input" onChange={e => setinputValue(e.target.value)} placeholder="Search city or zipcode" />
          <button type="submit" className="btn">
            <i className="fa-solid fa-magnifying-glass fa-2xl"></i>
          </button>
        </form>
        <ul className="saved-citys">
          {listedCitys}
        </ul>
        <div className="weather-details">
          <h2 className="weather-details-title">Currently</h2>
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
            <span className="wind-speed">{Math.ceil(props.wind)} mph</span>
          </div>
          <div className="rain">
            <h3 className="rain-title">Rain</h3>
            <span className="rain-level">{Math.ceil(props.precipitation)} in</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
