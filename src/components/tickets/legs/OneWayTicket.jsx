import React from 'react';

const OneWayTicket = ({firstLeg}) => {
    const tickets = new Array(firstLeg);
    let firstTicket = [];
    let secondTicket = [];
    tickets.map((item) => {
        firstTicket.push(item.segments[0]);
        secondTicket.push(item.segments[1]);
    })
    console.log('firstLeg', firstLeg)
    return (
        <div>
            {firstTicket.map((segment) => {
                return (
                    <div>{segment.departureCity?.caption}, {segment.departureAirport?.caption}
                    <span> ({segment.departureAirport?.uid})</span>
                    </div>
                )
            })}

            {secondTicket.map((segment) => {
                return (
                    <div></div>
                )
            })}
        </div>
    );
};

export default OneWayTicket;