import React from 'react';

const DepartureDate = ({departureDate}) => {
    let dataTime = new Date(departureDate).toLocaleString("ru", {
        hour: 'numeric',
        minute: 'numeric',
    });
    let dataDay = new Date(departureDate).toLocaleString("ru", {
        day: 'numeric',
        month: 'short',
    });
    let dataWeekday = new Date(departureDate).toLocaleString("ru", {
        weekday: 'short',
    });
    return (
        <div>
            <span>{dataTime} </span>
            <span>{dataDay} {dataWeekday}</span>
        </div>
    );
};

export default DepartureDate;