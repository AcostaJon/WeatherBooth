import React from "react";
import Day from "./day";

const Weekly = (props) => {

    // display alert message. handled in the app.js component
    const displayMsg = (e) => {
        props.displayForecast(e);
    }
    // array of days
    const days = props.citys;

    // key for listed items
    let nextId = 0;

    // weekly forecast
    let listedDays = days.map((day) => (
        <Day key={nextId++} iconUrl={day.day.condition.icon} days={days} date={day.date} temp={day.day.avgtemp_f} />
    ))


    return (
        <div className="forecast" id="forecast" onClick={displayMsg}  >
            <div className="forecast-header">
                <p>3 Day Forecast</p>
            </div>
            <div className="forecast-container">
                {listedDays}
            </div>
        </div>
    )
}

export default Weekly;




