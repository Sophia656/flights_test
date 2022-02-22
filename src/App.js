import { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import TicketList from './components/TicketList';
import { AuthContext } from './components/tickets/context/context';
import data from './flights.json';

function App() {
  const [showMore, setShowMore] = useState(false);
  const newData = data.result.flights;
  const iterator = newData.keys();
  let allTickets = [];
  for (const key of iterator) {
      let flight = newData[key].flight 
      allTickets.push(flight)
  }
  const [iterat, setIterat] = useState(allTickets);
  const iterator2 = allTickets.keys();
  const tickets2 = [];
  for(const key of iterator2) {
      let num = allTickets[key]
      tickets2.push(num)
  }
  const [byDuration, setByDuration] = useState(false);
  const [byAscending, setByAscending] = useState(false);
  const [byDescending, setByDescending] = useState(false);

  useEffect(() => {
    // sort by duration
    if(byDuration) {
      const sortByDuration = tickets2.sort(function(a, b) {
        console.log('сортировка по времени')
          return a.legs[0].duration - b.legs[0].duration;
      })
      setIterat(sortByDuration)
      console.log('по времени')
      return function() {
        setByDuration(false);
      }
      //sort by ascending price
    } else if(byAscending) {
      const sortByAscending = tickets2.sort(function(a, b) {
        console.log('сортировка по возр')
        return a.price.total.amount - b.price.total.amount
      })
      setIterat(sortByAscending)
      console.log('по возр')
      return function() {
        setByAscending(false);
      }
      //sort by descending price
    } else if(byDescending) {
      const sortByDescending = tickets2.sort(function(a, b) {
        console.log('сортировка по убыв')
        return b.price.total.amount - a.price.total.amount
      })
      setIterat(sortByDescending)
      console.log('по убыв')
      return function() {
        setByDescending(false)
      }
    }
    return function() {
      setByDuration(false);
      setByAscending(false);
      setByDescending(false);
      console.log('otrabotalo')
    }
  }, [byDuration, byAscending, byDescending])
  
  return (
    <AuthContext.Provider value={{
    allTickets,
    showMore,
    setShowMore,
    iterat,
    setByAscending,
    setByDuration,
    setByDescending
    }}>
      <div className="App">
        <Sidebar />
        <TicketList />
      </div>
    </AuthContext.Provider>
  );
}

export default App;