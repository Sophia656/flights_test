import React from 'react';

const ReturnTicket = ({secondLeg}) => {   
    const tickets = new Array(secondLeg);
    let firstTicket = [];
    let secondTicket = [];
    tickets.map((item) => {
        firstTicket.push(item.segments[0]);
        secondTicket.push(item.segments[1]);
    })
    console.log('firstTicket', firstTicket)
    console.log('secondTicket', secondTicket[0]?.departureCity)
    return (
        <div>
            {firstTicket.map((segment) => {
                console.log('segment', segment)
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

export default ReturnTicket;