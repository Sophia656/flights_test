import React from 'react';
import OneWayTicket from './legs/oneWayTicket/OneWayTicket';
import ReturnTicket from './legs/returnTicket/ReturnTicket';
import s from './Tickets.module.css';
import { useContext } from 'react';
import { AuthContext } from './context/context';
import { useState } from 'react';
import { useEffect } from 'react';

const Tickets = () => {
    const { iterat, showMore, setShowMore } = useContext(AuthContext);
    useEffect(() => {
        if (!showMore) {
            iterat.length = 2
        }
    }, [iterat])
    
    
    return (
        <div>
            {iterat.map((ticket) => {
                const newTicket = new Array(ticket);
                const totalPrice = newTicket[0].price.total
                const { amount } = totalPrice;
                const { currencyCode } = totalPrice;
                const carrier = newTicket[0].carrier.caption;

                return (
                    <div className={s.wrapper}>
                        <header>
                            <div>{carrier}</div>
                            <div className={s.price}>
                                <span>{amount} {currencyCode}</span>
                                <span>Стоимость для одного взрослого пассажира</span>
                            </div>
                        </header>
                        {newTicket.map((item, index) => {
                            const firstLeg = item.legs[0];
                            const secondLeg = item.legs[1];
                            const { carrier: {caption} } = item;
                        return (
                            <div key={index}>
                                <div className={s.tickets__wrapper}>
                                    <OneWayTicket caption={caption} firstLeg={firstLeg} />
                                    <ReturnTicket caption={caption} secondLeg={secondLeg}  />
                                </div>
                            </div>
                        )})}
                        <footer>ВЫБРАТЬ</footer>
                    </div>
                )
            })}
        </div>
    );
};

export default Tickets;