import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import TicketList from './components/TicketList';
import { AuthContext } from './components/tickets/context/context';
import { useChangeOutputArray } from './components/tickets/items/hooks/useChangeOutputArray';
import { useFilterAndSorted } from './components/tickets/items/hooks/useFilterAndSorted';
import { useFilterByPriceFromAndTo } from './components/tickets/items/hooks/useFilterByPriceFromAndTo';
import { usePriceAndStops } from './components/tickets/items/hooks/usePriceAndStops';
import { useShowArrayOnClick } from './components/tickets/items/hooks/useShowArrayOnClick';
import { useSorted } from './components/tickets/items/hooks/useSorted';
import { unique, arrayOfCarriers, arrayOfUniqueCarriers, arrayOfNumbers, arrayOfBothPrice, arrayOfWithoutStops, arrayOfPriceFromAndWithoutStops, arrayOfPriceUpToAndWithoutStops, arrayOfPriceFromAndWithOneStop, arrayOfPriceUpToAndWithOneStop, arrayOfBothPriceAndWithoutStops, arrayOfBothPriceAndWithStops } from './components/tickets/items/utils';
import data from './flights.json';

function App() {
  const { result: { flights }} = data; // json --> result-flights (1 уровень вложенности)

  const [showMore, setShowMore] = useState(false); //btn 'показать еще'
  const [btnWithoutStops, setBtnWithoutStops] = useState(false); //btn фильтровать --> без пересадок
  const [btnWithStops, setBtnWithStops] = useState(false); //btn фильтровать --> 1 пересадка
  const [priceFrom, setPriceFrom] = useState(''); // отслежтваем вводимое число в 'цене от'
  const [priceUpTo, setPriceUpTo] = useState(''); // отслежтваем вводимое число в 'цене до'

  const iterator = flights.keys();
  let allTickets = []; // json --> result-flights-(carrier/price/legs...etc) (2 уровень вложенности)
  const [iterat, setIterat] = useState(allTickets); // создаем состояние на основе массива всех билетов
  const withOneStop = []; // массив билетов, где туда - одна пересадка(фильтрация "1 пересадка" - по верхнему билету)
  const allWithoutStops = []; // массив билетов, где и туда, и обратно - нет пересадок
  const without = [];  // массив билетов, где туда - нет пересадок, а обратно - одна пересадка
  const [currentPriceFrom, setCurrentPriceFrom] = useState(''); // вводимое в инпут число
  const [currentPriceUpTo, setCurrentPriceUpTo] = useState(''); // вводимое в инпут число
  const ticketsPriceFrom = []; // билеты, отфильтрованные по фильтру 'цена от'
  const ticketsPriceUpTo = []; // билеты, отфильтрованные по фильтру 'цена до'
  
  // итерирумся для вывода массивов билетов:
  for(const key of iterator) {
    let flight = flights[key].flight;
      allTickets.push(flight)
      const firstTicket = flight.legs[0].segments[1];
      const secondTicket = flight.legs[1].segments[1];
      const currNum = flight.price.total.amount;
      if (currNum > currentPriceFrom) {
        ticketsPriceFrom.push(flight) // отфильтрованные по фильтру 'цена от'
      }
      if (currNum < currentPriceUpTo) {
        ticketsPriceUpTo.push(flight) // отфильтрованные по фильтру 'цена до'
      }
      if (firstTicket === undefined && secondTicket !== undefined) {
        without.push(flight) // туда - нет пересадок, а обратно - одна пересадка
      }
      if (secondTicket === undefined && firstTicket === undefined) {
        allWithoutStops.push(flight) // и туда, и обратно - нет пересадок
      }
      if (firstTicket !== undefined && secondTicket !== undefined) {
        withOneStop.push(flight) // и туда, и обратно - есть одна пересадка
      }
  }

  const carriers = arrayOfCarriers(allTickets) // массив с названиями перевозчиков и цен
  const captions = carriers.map(caption => { // массив с названиями перевозчиков
    return caption[0]
  })

  const names = []; // массив уникальных перевозчиков
  names.length = unique(captions).length //задаем правильную длину массива
  const uniqueCarriers = arrayOfUniqueCarriers({carriers, names})
  const numbers = arrayOfNumbers(names); // массив чисел для чекбоксов
  const [currentNum, setCurrentNum] = useState(Number); // для изменения индекса в итерирующемся names
  const [checked, setChecked] = useState(false); // по клику выводим билеты
  const [checkedCarriers, setCheckedCarriers] = useState([]); // массив кликнутых перевозчиков

  // если все чекбоксы не отмечены - показываем изначальный массив
  useShowArrayOnClick({allTickets,
    currentNum,
    setChecked,
    checked,
    checkedCarriers,
    setCheckedCarriers,
    names
  })

  // изменяем массив вывода
  useChangeOutputArray({setIterat, allTickets, checkedCarriers})

  // массив билетов, совпадающих по категориям и 'цена от', и 'цена до' 
  const both = arrayOfBothPrice({ticketsPriceFrom, ticketsPriceUpTo});

  // пушим разные массивы билетов в зависимости от фильтрации по категориям 'цена от' и 'цена до'
  useFilterByPriceFromAndTo({setIterat,
    currentPriceFrom,
    ticketsPriceFrom,
    currentPriceUpTo,
    ticketsPriceUpTo,
    both,
    allTickets
  })

  const ticketsWithoutStops = arrayOfWithoutStops({allWithoutStops, without}); // массив билетов (без пересадок && с одной пересадкой обратно)

  const [byDuration, setByDuration] = useState(false); // создаем состояние на основе сортировки по времени
  const [byAscending, setByAscending] = useState(false); // создаем состояние на основе сортировки по возростанию цены
  const [byDescending, setByDescending] = useState(false); // создаем состояние на основе сортировки по убыванию цены

  // пушим разные массивы билетов в зависимости от фильтрации/сортировки
  useFilterAndSorted({setIterat,
    btnWithoutStops,
    ticketsWithoutStops,
    btnWithStops,
    withOneStop,
    allTickets
  })

  // цена от и без пересадок
  const ticketsPriceFromAndWithoutStops = arrayOfPriceFromAndWithoutStops({ticketsPriceFrom, ticketsWithoutStops});
  // цена до и без пересадок
  const ticketsPriceUpToAndWithoutStops = arrayOfPriceUpToAndWithoutStops({ticketsPriceUpTo, ticketsWithoutStops});
  // цена от и 1 пересадка
  const ticketsPriceFromAndWithOneStop = arrayOfPriceFromAndWithOneStop({ticketsPriceFrom, withOneStop});
  // цена до и 1 пересадка
  const ticketsPriceUpToAndWithOneStop = arrayOfPriceUpToAndWithOneStop({ticketsPriceUpTo, withOneStop});
  // цена от и цена до и без пересадок
  const bothPriceAndWithoutStops = arrayOfBothPriceAndWithoutStops({both, ticketsWithoutStops});
  // цена от и цена до и 1 пересадка
  const bothPriceAndWithStops = arrayOfBothPriceAndWithStops({both, withOneStop});
  // по tab
  const [handlePressPriceFromBool, setHandlePressPriceFromBool] = useState(false) // для поля ввода 'цена от'
  const handlePressPriceFrom = (event) => {
    if (event.key === "Enter") {
      setHandlePressPriceFromBool(true)
        let number = Number(event.target.value)
        setCurrentPriceFrom(number)
        setIterat(ticketsPriceFrom);
        
    }
  }
  const [handlePressPriceUpToBool, setHandlePressPriceUpToBool] = useState(false) // для поля ввода 'цена до'
  const handlePressPriceUpTo = (event) => {
    if (event.key === "Enter") {
      setHandlePressPriceUpToBool(true)
        let number = Number(event.target.value)
        setCurrentPriceUpTo(number)
        setIterat(ticketsPriceUpTo)
    }
  }
  // фасетная фильтрация по цене и пересадкам
  usePriceAndStops({btnWithoutStops,
    handlePressPriceFromBool,
    setIterat,
    ticketsPriceFromAndWithoutStops,
    handlePressPriceUpToBool,
    ticketsPriceUpToAndWithoutStops,
    ticketsPriceFromAndWithOneStop,
    ticketsPriceUpToAndWithOneStop,
    bothPriceAndWithoutStops,
    bothPriceAndWithStops,
    allTickets,
    btnWithStops
  })

  // СОРТИРОВАТЬ:
  useSorted({byDuration,
    byAscending,
    byDescending,
    btnWithoutStops,
    btnWithStops,
    iterat,
    setByDescending,
    setByAscending,
    setByDuration,
    setIterat
  })

  return (
    <AuthContext.Provider value={{
    allTickets,
    showMore,
    setShowMore,
    iterat,
    setIterat,
    setByAscending,
    setByDuration,
    setByDescending,
    setBtnWithoutStops,
    btnWithoutStops,
    btnWithStops,
    setBtnWithStops,
    priceFrom,
    setPriceFrom,
    setPriceUpTo,
    priceUpTo,
    handlePressPriceFrom,
    handlePressPriceUpTo,
    uniqueCarriers,
    setChecked,
    checked,
    setCurrentNum,
    numbers
    }}>
      <div className="App">
        <Sidebar />
        <TicketList />
      </div>
    </AuthContext.Provider>
  );
}

export default App;