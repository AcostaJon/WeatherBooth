import React from "react";

const Alert = (props) => {

    // display alert message. handled in the app.js component
    const displayMsg = (e) => {
        props.alertMsg(e);
    }

    // if warning prop is undefined
    if (props.warning === undefined) {
        return (
            <div className="alert" id="alertMsg" onClick={displayMsg}>
                <div className="alert-header">
                    <p>ALERT</p>
                </div>
                <div className="alertMsgContainer">
                    <p>no warnings for the following areas : {props.city}, {props.region} </p>
                </div>
            </div>
        )

    } else {
        // if warning prop contains warnings
        return (
            <div className="alert" id="alertMsg" onClick={displayMsg}>
                <div className="alert-header">
                    <p>ALERT</p>
                </div>
                <div className="alertMsgContainer">
                    <p>{props.warning.headline}</p>
                    <p>{props.warning.event}</p>
                </div>
            </div>
        )
    }
}

export default Alert;




