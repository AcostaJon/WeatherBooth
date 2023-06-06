import React from "react";
import { useState } from "react";

const Day = (props) => {
    let today;

    // array of days of week
    const weekday = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    // date object with date passed from prop
    let d = new Date(props.date);

    // pass current date through week array and return day variable
    let day = weekday[d.getDay()];

    return (
        <div>
            <img src={props.iconUrl} />
            <p>{Math.ceil(props.temp)}</p>
            <p>{day}</p>
        </div>
    )
}

export default Day