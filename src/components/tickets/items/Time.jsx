import React from 'react';

const Time = ({...props}) => {
    // время отправления
    let departureTime = new Date(props.departureDate).toLocaleString("ru", {
        hour: 'numeric',
        minute: 'numeric',
    });
    let departureDay = new Date(props.departureDate).toLocaleString("ru", {
        day: 'numeric',
        month: 'short',
    });
    let departureWeekday = new Date(props.departureDate).toLocaleString("ru", {
        weekday: 'short',
    });
    // время прибытия
    let arrivalTime = new Date(props.arrivalDate).toLocaleString("ru", {
        hour: 'numeric',
        minute: 'numeric',
    });
    let arrivalDay = new Date(props.arrivalDate).toLocaleString("ru", {
        day: 'numeric',
        month: 'short',
    });
    let arrivalWeekday = new Date(props.arrivalDate).toLocaleString("ru", {
        weekday: 'short',
    });

    return (
        props.departureDate
        ?
        <div>
            <b>{departureTime} </b>
            <span>{departureDay} {departureWeekday}</span>
        </div>
        :
        <div>
            <span>{arrivalDay} {arrivalWeekday}</span>
            <b> {arrivalTime}</b>
        </div>
        
    );
};

export default Time;