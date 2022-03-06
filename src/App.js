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




  // функция для создания массива только с уникальными значениями
  function unique(arr) {
    return Array.from(new Set(arr));
  }
  // массив билетов, отсортированный по возрастанию цены
  const price = allTickets.sort(function(a, b) {
    return a.price.total.amount - b.price.total.amount
  })
  // массив с названиями перевозчиков
  const carriers = [];
  for (const key of price) {
    const caption = key.carrier.caption;
    carriers.push(caption)
  }






  // находим совпадающие по категориям и 'цена от', и 'цена до' билеты 
  const both = [];
  ticketsPriceFrom.map(i => {
    ticketsPriceUpTo.map(j => {
      if (i === j) {
        both.push(i)
      }
    })
  })
  // пушим разные массивы билетов в зависимости от фильтрации по категориям 'цена от' и 'цена до'
  useEffect(() => {
    if (currentPriceFrom) {
      setIterat(ticketsPriceFrom)
    }
    if (currentPriceUpTo) {
      setIterat(ticketsPriceUpTo)
    }
    if (currentPriceFrom && currentPriceUpTo) {
      setIterat(both)
    }
    return function() {
      setIterat(allTickets)
    }
  }, [currentPriceFrom, currentPriceUpTo])

  const ticketsWithoutStops = []; // массив билетов (без пересадок && с одной пересадкой обратно)
  ticketsWithoutStops.push(...allWithoutStops)
  ticketsWithoutStops.push(...without)

  const [byDuration, setByDuration] = useState(false); // создаем состояние на основе сортировки по времени
  const [byAscending, setByAscending] = useState(false); // создаем состояние на основе сортировки по возростанию цены
  const [byDescending, setByDescending] = useState(false); // создаем состояние на основе сортировки по убыванию цены

  // пушим разные массивы билетов в зависимости от фильтрации/сортировки
    useEffect(() => {
    if (btnWithoutStops) {
      setIterat(ticketsWithoutStops)
    } else if (btnWithStops){
      setIterat(withOneStop)
    } else {
      setIterat(allTickets)
    }
    return function() {
      setIterat(allTickets)
    }
  }, [btnWithoutStops, btnWithStops])

  // цена от и без пересадок
  const ticketsPriceFromAndWithoutStops = [];
  ticketsPriceFrom.map(i => {
    ticketsWithoutStops.map(j => {
      if (i === j) {
        ticketsPriceFromAndWithoutStops.push(i)
      }
    })
  })
  // цена до и без пересадок
  const ticketsPriceUpToAndWithoutStops = [];
  ticketsPriceUpTo.map(i => {
    ticketsWithoutStops.map(j => {
      if (i === j) {
        ticketsPriceUpToAndWithoutStops.push(i)
      }
    })
  })
  // цена от и 1 пересадка
  const ticketsPriceFromAndWithOneStop = [];
  ticketsPriceFrom.map(i => {
    withOneStop.map(j => {
      if (i === j) {
        ticketsPriceFromAndWithOneStop.push(i)
      }
    })
  })
  // цена до и 1 пересадка
  const ticketsPriceUpToAndWithOneStop = [];
  ticketsPriceUpTo.map(i => {
    withOneStop.map(j => {
      if (i === j) {
        ticketsPriceUpToAndWithOneStop.push(i)
      }
    })
  })
  // цена от и цена до и без пересадок
  const bothPriceAndWithoutStops = [];
  both.map(i => {
    ticketsWithoutStops.map(j => {
      if (i === j) {
        bothPriceAndWithoutStops.push(i)
      }
    })
  })
  // цена от и цена до и 1 пересадка
  const bothPriceAndWithStops = [];
  both.map(i => {
    withOneStop.map(j => {
      if (i === j) {
        bothPriceAndWithStops.push(i)
      }
    })
  })

const [handlePressPriceFromBool, setHandlePressPriceFromBool] = useState(false)
  const handlePressPriceFrom = (event) => {
    if (event.key === "Enter") {
      setHandlePressPriceFromBool(true)
        let number = Number(event.target.value)
        setCurrentPriceFrom(number)
        setIterat(ticketsPriceFrom);
        
    }
  }
  const [handlePressPriceUpToBool, setHandlePressPriceUpToBool] = useState(false)
  const handlePressPriceUpTo = (event) => {
    if (event.key === "Enter") {
      setHandlePressPriceUpToBool(true)
        let number = Number(event.target.value)
        setCurrentPriceUpTo(number)
        setIterat(ticketsPriceUpTo)
    }
  }

  useEffect(() => {
    // цена от и без пересадок
    if (btnWithoutStops && handlePressPriceFromBool) {
      setIterat(ticketsPriceFromAndWithoutStops)
      console.log('without && from')
    }
    // цена до и без пересадок
    if (btnWithoutStops && handlePressPriceUpToBool) {
      setIterat(ticketsPriceUpToAndWithoutStops)
      console.log('without && up to')
    }
    // цена от и 1 пересадка
    if (btnWithStops && handlePressPriceFromBool) {
      setIterat(ticketsPriceFromAndWithOneStop)
      console.log('with && from')
    }
    // цена до и 1 пересадка
    if (btnWithStops && handlePressPriceUpToBool) {
      setIterat(ticketsPriceUpToAndWithOneStop)
      console.log('with && up to')
    }
    // цена от и цена до и без пересадок
    if (btnWithoutStops && handlePressPriceFromBool && handlePressPriceUpToBool) {
      setIterat(bothPriceAndWithoutStops)
      console.log('both && without')
    }
    // цена от и цена до и 1 пересадка
    if (btnWithStops && handlePressPriceFromBool && handlePressPriceUpToBool) {
      setIterat(bothPriceAndWithStops)
      console.log('both && with')
    }
    return function() {
      setIterat(allTickets)
    }
  }, [btnWithoutStops, btnWithStops, handlePressPriceFromBool, handlePressPriceUpToBool])
  // сортировка:
  useEffect(() => {
    // по времени
    if(byDuration) {
      const sortByDuration = iterat.sort(function(a, b) {
        return a.legs[0].duration - b.legs[0].duration;
      })
      setIterat(sortByDuration)

      return function() {
        setByDuration(false);
      }
      // по возростанию цены
    } else if(byAscending) {
      const sortByAscending = iterat.sort(function(a, b) {
        return a.price.total.amount - b.price.total.amount
      })
      setIterat(sortByAscending)

      return function() {
        setByAscending(false);
      }
      // по убыванию цены
    } else if(byDescending) {
      const sortByDescending = iterat.sort(function(a, b) {
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
  }, [byDuration, byAscending, byDescending, btnWithoutStops, btnWithStops]);

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
    handlePressPriceUpTo
    }}>
      <div className="App">
        <Sidebar />
        <TicketList />
      </div>
    </AuthContext.Provider>
  );
}

export default App;