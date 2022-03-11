import React from 'react';

const ArrivalDate = ({arrivalDate}) => {
    let dataTime = new Date(arrivalDate).toLocaleString("ru", {
        hour: 'numeric',
        minute: 'numeric',
    });
    let dataDay = new Date(arrivalDate).toLocaleString("ru", {
        day: 'numeric',
        month: 'short',
    });
    let dataWeekday = new Date(arrivalDate).toLocaleString("ru", {
        weekday: 'short',
    });

    return (
        <div>
            <span>{dataTime} </span>
            <span>{dataDay} {dataWeekday}</span>
        </div>
    );
};

export default ArrivalDate;