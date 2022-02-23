import React from 'react';
import s from '../OneTicket.module.css';


// let dataTime = new Date(departureDate).toLocaleString("ru", {
//     hour: 'numeric',
//     minute: 'numeric',
// });
// let dataDay = new Date(departureDate).toLocaleString("ru", {
//     day: 'numeric',
//     month: 'short',
// });
// let dataWeekday = new Date(departureDate).toLocaleString("ru", {
//     weekday: 'short',
// });



const ReturnTicket = ({secondLeg, caption}) => {  
    const tickets = new Array(secondLeg);
    const { duration } = tickets[0];
    let firstTicket = [];
    let secondTicket = [];
    tickets.map((item) => {
        firstTicket.push(item.segments[0]);
        if (!item.segments[1]) {
            let div = null;
            secondTicket.push(div)
        } else {
            secondTicket.push(item.segments[1])
        }
        
    })
    let hours = Math.floor(duration / 60);
    let min = duration - (hours * 60);

    return (
        <div className={s.wrapper}>
            <div className={s.tickets__wrapper}>
                {firstTicket.map((segment, index) => {
                    return (
                        <div key={index}>
                            <div>{segment.departureCity?.caption}, {segment.departureAirport?.caption}
                                <span> ({segment.departureAirport?.uid})</span>
                            </div>
                            <div>{segment.arrivalDate}</div>
                        </div>
                    )
                })}
                {secondTicket.map((segment, index) => {
                    return (
                    segment === null
                    ?
                    firstTicket.map((segment, index) => {
                        return (
                            <div key={index} className={s.first__ticket}>
                                <div>{segment.arrivalCity?.caption}, {segment.arrivalAirport?.caption}
                                    <span> ({segment.arrivalAirport?.uid})</span>
                                </div>
                                <div className={s.stop}>
                                    <div>{hours} ч {min} мин</div>
                                </div>
                                <div>{segment.arrivalDate}</div>
                            </div>
                        )
                    })
                    :
                        <div key={index}>
                            <div className={s.stop}>
                                <div>{hours} ч {min} мин</div>
                                <div>1 пересадка</div>
                            </div>
                            <div className={s.second_ticket__wrapper}>
                                <div>{segment.arrivalCity?.caption}, {segment.arrivalAirport?.caption}
                                    <span> ({segment.arrivalAirport?.uid})</span>
                                </div>
                                <div>{segment.arrivalDate}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={s.carrier}>Рейс выполняет: {caption}</div>
        </div>
    );
};

export default ReturnTicket;