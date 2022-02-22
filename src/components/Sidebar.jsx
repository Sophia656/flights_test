import React from 'react';
import { useContext } from 'react';
import s from './Sidebar.module.css';
import { AuthContext } from './tickets/context/context';

const Sidebar = () => {
    const { setByDuration, setByAscending, setByDescending } = useContext(AuthContext);

    return (
        <form className={s.wrapper}>
            <form>
                <p>Сортировать</p>
                <div>
                    <input type="radio" id="contactChoice1"
                    name="filter" value="byDuration"
                    onClick={() => setByAscending(true)} />
                    <label> - по возрастанию цены</label>
                    <br/>
                    <input type="radio" id="contactChoice2"
                    name="filter" value="byAscending"
                    onClick={() => setByDescending(true)}/>
                    <label> - по убыванию цены</label>
                    <br/>
                    <input type="radio" id="contactChoice3"
                    name="filter" value="byDescending"
                    onClick={() => setByDuration(true)}/>
                    <label> - по времени в пути</label>
                </div>
            </form>

            <div>
                <p>Фильтровать</p>
                <label><input type="checkbox" /> - 1 пересадка</label><br/>
                <label><input type="checkbox" /> - без пересадок</label>
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