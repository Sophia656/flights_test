import React, { useState } from 'react';
import { useContext } from 'react';
import s from './TicketList.module.css';
import { AuthContext } from './tickets/context/context';
import Tickets from './tickets/Tickets';

const TicketList = () => {
    const { showMore, setShowMore } = useContext(AuthContext);
    return (
        <div className={s.wrapper}>
            <div>
                <Tickets className={s.content} />
            </div>
            {!showMore
            ? <button onClick={() => setShowMore(true)}>Показать еще</button>
            : <></>
            }
        </div>
    );
};

export default TicketList;