import React from 'react';
import OneWayTicket from './legs/OneWayTicket';
import ReturnTicket from './legs/ReturnTicket';
import data from '../../flights.json';

const Tickets = () => {
    const newData = data.result.flights;
    const iterator = newData.keys();
    const allTickets = [];
    for (const key of iterator) {
        var flight = newData[key].flight 
        allTickets.push(flight)
    }
    console.log(allTickets)
    return (
        <div>
            {allTickets.map((ticket) => {
                const newTicket = new Array(ticket);
                return (
                    <div>
                        {newTicket.map((item, index) => {
                            const firstLeg = item.legs[0];
                            const secondLeg = item.legs[1];
                        return (
                            <div>
                                <OneWayTicket firstLeg={firstLeg} />
                                <ReturnTicket secondLeg={secondLeg}  />
                            </div>
                        )})}
                    </div>
                )
            })}
        </div>
    );
};

export default Tickets;