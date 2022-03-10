import { useEffect } from "react";

export function useFilterByPriceFromAndTo({setIterat,
    currentPriceFrom,
    ticketsPriceFrom,
    currentPriceUpTo,
    ticketsPriceUpTo,
    both,
    allTickets
    }) {
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
}