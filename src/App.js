import { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import TicketList from './components/TicketList';
import { AuthContext } from './components/tickets/context/context';
import data from './flights.json';

function App() {
  const { result: { flights }} = data; // json --> result-flights (1 уровень вложенности)

  const [showMore, setShowMore] = useState(false); //btn 'показать еще'
  const [btnWithoutStops, setBtnWithoutStops] = useState(false); //btn фильтровать --> без пересадок
  const [btnWithStops, setBtnWithStops] = useState(false); //btn фильтровать --> 1 пересадка
  const [priceFrom, setPriceFrom] = useState(Number); // отслежтваем вводимое число в 'цене от'
  const [priceUpTo, setPriceUpTo] = useState(Number); // отслежтваем вводимое число в 'цене до'

  const iterator = flights.keys();
  let allTickets = []; // json --> result-flights-(carrier/price/legs...etc) (2 уровень вложенности)

  // итерирумся для отдельного вывода каждого билета
  for (const key of iterator) {
      let flight = flights[key].flight 
      allTickets.push(flight)
  }
  const [iterat, setIterat] = useState(allTickets); // создаем состояние на основе массива всех билетов
  const [currentTickets, setCurrentTickets] = useState([]); // состоояние для выбора массива под разные сортировки
  const iterator2 = allTickets.keys();
  const withOneStop = []; // массив билетов, где туда - одна пересадка(фильтрация "1 пересадка" - по верхнему билету)
  const allWithoutStops = []; // массив билетов, где и туда, и обратно - нет пересадок
  const without = [];  // массив билетов, где туда - нет пересадок, а обратно - одна пересадка
  const tickets2 = []; // === allTickets[]

   // итерирумся для вывода массивов билетов:
  for(const key of iterator2) {
      let num = allTickets[key];
      tickets2.push(num); // всех билетов - ?
      const kek = iterat[key].legs[0].segments[1];
      const kek2 = iterat[key].legs[1].segments[1];
      if (kek === undefined && kek2 !== undefined) {
        without.push(num) // туда - нет пересадок, а обратно - одна пересадка
      }
      if (kek2 === undefined && kek === undefined) {
        allWithoutStops.push(num) // и туда, и обратно - нет пересадок
      }
      if (kek !== undefined && kek2 !== undefined) {
        withOneStop.push(num) // и туда, и обратно - есть одна пересадка
      }
  }

  const tickets = []; // массив билетов (без пересадок/ с одной пересадкой обратно)
  tickets.push(...allWithoutStops)
  tickets.push(...without)

  const [byDuration, setByDuration] = useState(false); // создаем состояние на основе сортировки по времени
  const [byAscending, setByAscending] = useState(false); // создаем состояние на основе сортировки по возростанию цены
  const [byDescending, setByDescending] = useState(false); // создаем состояние на основе сортировки по убыванию цены

  // пушим разные массивы билетов в зависимости от фильтрации/сортировки
    useEffect(() => {
    if (btnWithoutStops) {
      setCurrentTickets(tickets)
    } else if (btnWithStops){
      setCurrentTickets(withOneStop)
    } else {
      setCurrentTickets(tickets2)
    }
    return function() {
      setCurrentTickets(tickets2)
    }
  }, [btnWithoutStops])

  // сортировка:
  useEffect(() => {
    // по времени
    if(byDuration) {
      const sortByDuration = currentTickets.sort(function(a, b) {
        return a.legs[0].duration - b.legs[0].duration;
      })
      setIterat(sortByDuration)

      return function() {
        setByDuration(false);
      }
      // по возростанию цены
    } else if(byAscending) {
      const sortByAscending = currentTickets.sort(function(a, b) {
        return a.price.total.amount - b.price.total.amount
      })
      setIterat(sortByAscending)

      return function() {
        setByAscending(false);
      }
      // по убыванию цены
    } else if(byDescending) {
      const sortByDescending = currentTickets.sort(function(a, b) {
        return b.price.total.amount - a.price.total.amount
      })
      setIterat(sortByDescending)

      return function() {
        setByDescending(false)
      }
    }
    return function() {
      setByDuration(false);
      setByAscending(false);
      setByDescending(false);
    }
  }, [byDuration, byAscending, byDescending, btnWithoutStops]);

  return (
    <AuthContext.Provider value={{
    allTickets,
    showMore,
    setShowMore,
    iterat,
    setByAscending,
    setByDuration,
    setByDescending,
    tickets,
    setBtnWithoutStops,
    btnWithoutStops,
    byDuration, 
    byAscending, 
    byDescending,
    withOneStop,
    btnWithStops,
    setBtnWithStops,
    priceFrom,
    setPriceFrom,
    priceUpTo,
    setPriceUpTo
    }}>
      <div className="App">
        <Sidebar />
        <TicketList />
      </div>
    </AuthContext.Provider>
  );
}

export default App;