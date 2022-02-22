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

  // sort by duration
  const [byDuration, setByDuration] = useState(false);
  // const sortByDuration = tickets2.sort(function(a, b) {
  //     return a.legs[0].duration - b.legs[0].duration
  // })

  //sort by ascending price
  const [byAscending, setByAscending] = useState(false);
  // const sortByAscending = tickets2.sort(function(a, b) {
  //   return a.price.total.amount - b.price.total.amount
  // })

  // //sort by descending price
  const [byDescending, setByDescending] = useState(false);
  // const sortByDescending = tickets2.sort(function(a, b) {
  //   return b.price.total.amount - a.price.total.amount
  // })

  useEffect(() => {
    tickets2.sort(function(a, b) {
      if(byDuration) {
        return a.legs[0].duration - b.legs[0].duration
      } else if (byAscending){
        return a.price.total.amount - b.price.total.amount
      } else if (byDescending) {
        return b.price.total.amount - a.price.total.amount
      }
    })
    // if (byDuration) {
    //   setByAscending(false);
    //   setByDescending(false);
    //   const sortByDuration = tickets2.sort(function(a, b) {
    //     return a.legs[0].duration - b.legs[0].duration
    // })
    //   setIterat(sortByDuration)
    // } else if (byAscending) {
    //   setByDuration(false);
    //   setByDescending(false);
    //   const sortByAscending = tickets2.sort(function(a, b) {
    //     return a.price.total.amount - b.price.total.amount
    //   })
    //   setIterat(sortByAscending)
    // } else if (byDescending) {
    //   setByAscending(false);
    //   setByDuration(false);
    //   const sortByDescending = tickets2.sort(function(a, b) {
    //     return b.price.total.amount - a.price.total.amount
    //   })
    //   setIterat(sortByDescending)
    // }
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