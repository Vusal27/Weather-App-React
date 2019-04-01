import React from "react";

const Result = props => (
    <div className="result">
    { props.city && 
        <div>
            <p className="result__item">Местоположение: {props.city}, {props.country}</p>
            <p className="result__item">Температура: {props.temp}&#176;</p>
            <p className="result__item">Восход солнца: {props.sunrise}</p>
            <p className="result__item">Заход солнца: {props.sunset}</p>
        </div>
    }
    <p className="error">{ props.error}</p>
    </div>
);

export default Result;