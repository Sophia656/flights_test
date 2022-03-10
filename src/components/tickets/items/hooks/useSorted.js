import { useEffect } from "react";

export function useSorted({byDuration,
    byAscending,
    byDescending,
    btnWithoutStops,
    btnWithStops,
    iterat,
    setByDescending,
    setByAscending,
    setByDuration,
    setIterat
    }) {
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
          // по возрастанию цены
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
}