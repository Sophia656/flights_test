import React from 'react';
import OneWayTicket from './legs/oneWayTicket/OneWayTicket';
import ReturnTicket from './legs/returnTicket/ReturnTicket';
import s from './Tickets.module.css';
import { useContext } from 'react';
import { AuthContext } from './context/context';

const Tickets = () => {
    const { iterat, setIterat, setPriceFrom, setPriceUpTo, showMore, allTickets, setBtnWithoutStops, setBtnWithStops } = useContext(AuthContext);
    let indexOfArray = 0;
    const handleClick = () => {
        setIterat(allTickets)
        setBtnWithoutStops(false)
        setBtnWithStops(false)
        setPriceFrom('')
        setPriceUpTo('')
    }

    return (
        iterat.length === 0
        ? 
        <div>
            <div>TICKETS NOT FOUND!</div>
            <button onClick={handleClick} style={{marginBottom: '60vh'}}>RETURN</button>
        </div>
        :
        <div>
            {iterat.map((ticket) => {
                const newTicket = new Array(ticket);
                const totalPrice = newTicket[0].price.total
                const { amount } = totalPrice;
                const { currencyCode } = totalPrice;
                const carrier = newTicket[0].carrier.caption;
                if(!showMore && indexOfArray >= 2){ // изначальный вывод - 2 билета
                    return
                }
                indexOfArray++;

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