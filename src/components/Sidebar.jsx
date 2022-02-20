import React from 'react';
import s from './Sidebar.module.css';

const Sidebar = () => {
    return (
        <form className={s.wrapper}>
            <div>
                <p>Сортировать</p>
                <label><input type="radio" /> - по возрастанию цены</label><br/>
                <label><input type="radio" /> - по убыванию цены</label><br/>
                <label><input type="radio" /> - по времени в пути</label>
            </div>
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
                <label><input type="checkbox" /> - без пересадок</label><br/>
                <label><input type="checkbox" /> - без пересадок</label>
            </div>
        </form>
    );
};

export default Sidebar;