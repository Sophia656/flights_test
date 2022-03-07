import React from 'react';
import { useContext } from 'react';
import s from './Sidebar.module.css';
import { AuthContext } from './tickets/context/context';

const Sidebar = () => {
    const { setByDuration,
        setByAscending,
        setByDescending,
        setBtnWithoutStops,
        btnWithoutStops,
        setBtnWithStops,
        btnWithStops,
        priceFrom,
        setPriceFrom,
        priceUpTo,
        setPriceUpTo,
        handlePressPriceFrom,
        handlePressPriceUpTo,
        uniqueCarriers,
        setFirstBtn,
        firstBtn,
        setCurrentNum,
        numbers} = useContext(AuthContext);
    // следим, чтобы не было одновременно нажатых 'с 1 пересадкой' и 'без пересадок'
    if (btnWithStops) {
        setBtnWithoutStops(false)
    }
    if (btnWithoutStops) {
        setBtnWithStops(false)
    }
    
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
                    <input type="checkbox" checked={btnWithStops} onClick={() => setBtnWithStops(!btnWithStops)} /><label> - 1 пересадка</label><br/>
                    <input type="checkbox" checked={btnWithoutStops} onClick={() => setBtnWithoutStops(!btnWithoutStops)} /><label> - без пересадок</label>
            </div>
            <div>
                <p>Цена</p>
                <label onKeyPress={handlePressPriceFrom}>От <input type="number"
                 value={priceFrom}
                 onChange={event => setPriceFrom(event.target.value)}
                 size="40" 
                 placeholder='0'
                />
                </label>
                <br/>
                <label onKeyPress={handlePressPriceUpTo}>До <input type="number"
                value={priceUpTo}
                onChange={event => setPriceUpTo(event.target.value)}
                size="40"
                placeholder='1000000'
                />
                </label>
            </div>
            
                <div>
                <p>Авиакомпания</p>
                <div className={s.list_of_carriers}>
                    
                        <div className={s.airlies_checked}>
                            {numbers.map(number =>
                                <input
                                type="checkbox"
                                key={number}
                                onClick={() => {setFirstBtn(true); setCurrentNum(number)}}
                                />
                            )}
                        </div>
                    

                    <div className={s.carriers__wrapper}>
                        {uniqueCarriers.map((current, index) => {
                            return (
                                <div key={index}>
                                    {current.map((carrier, index) => {
                                        return (
                                            <div key={index} className={s.carriers}>
                                                <div> - {carrier[0]}</div>
                                                <div> от {carrier[1]}</div>
                                            </div>
                                        )
                        
                                    })}
                                </div>
                            )}
                        )}
                    </div>
                
                </div>
            </div>
            
        </form>
    );
};

export default Sidebar;