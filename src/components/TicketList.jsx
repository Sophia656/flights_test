import React from 'react';
import s from './TicketList.module.css';
import Tickets from './tickets/Tickets';

const TicketList = () => {
    return (
        <div className={s.wrapper}>
            <div>
                <Tickets className={s.content} />
            </div>
            <button>Показать еще</button>
        </div>
    );
};

export default TicketList;


//carrier, price