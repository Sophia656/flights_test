import { useEffect } from "react"

export function useFilterAndSorted({setIterat,
    btnWithoutStops,
    ticketsWithoutStops,
    btnWithStops,
    withOneStop,
    allTickets
    }) {
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
}