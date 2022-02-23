import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import s from './Sidebar.module.css';
import { AuthContext } from './tickets/context/context';

const Sidebar = () => {
    const { setByDuration, setByAscending, setByDescending, setBtnWithoutStops, btnWithoutStops } = useContext(AuthContext);

    return (
        <form className={s.wrapper}>
                <p>Сортировать</p>
                <div>
                    <input type="radio" id="setByAscending"
                    name="filter" value="setByAscending"
                    onClick={() => setByAscending(true)} />
                    <label> - по возрастанию цены</label>
                    <br/>
                    <input type="radio" id="setByDescending"
                    name="filter" value="setByDescending"
                    onClick={() => setByDescending(true)}/>
                    <label> - по убыванию цены</label>
                    <br/>
                    <input type="radio" id="setByDuration"
                    name="filter" value="setByDuration"
                    onClick={() => setByDuration(true)}/>
                    <label> - по времени в пути</label>
                </div>

            <div className={s.checkbox}>
                <p>Фильтровать</p>
                    <input type="checkbox" /><label> - 1 пересадка</label><br/>
                    <input type="checkbox" onClick={() => setBtnWithoutStops(!btnWithoutStops)} /><label> - без пересадок</label>
            </div>
            <div>
                <p>Цена</p>
                <label>От <input type="number" size="40" placeholder='0' /></label><br/>
                <label>До <input type="number" size="40" placeholder='1000000' /></label>
            </div>
            <div>
                <p>Авиакомпания</p>
                {/* {sortByDuration.map((tic, index) => {
                    const totalPrice = tic.price.total.amount;
                    const carrier = tic.carrier.caption;
                    return (
                        <div key={index}>
                            <input type="checkbox" />
                            - {carrier} от {totalPrice}
                        </div>
                    )
                })} */}
            </div>
        </form>
    );
};

export default Sidebar;