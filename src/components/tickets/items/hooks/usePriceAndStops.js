import { useEffect } from "react"

export function usePriceAndStops({btnWithoutStops,
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
    }) {
    useEffect(() => {
        // цена от и без пересадок
        if (btnWithoutStops && handlePressPriceFromBool) {
          setIterat(ticketsPriceFromAndWithoutStops)
        }
        // цена до и без пересадок
        if (btnWithoutStops && handlePressPriceUpToBool) {
          setIterat(ticketsPriceUpToAndWithoutStops)
        }
        // цена от и 1 пересадка
        if (btnWithStops && handlePressPriceFromBool) {
          setIterat(ticketsPriceFromAndWithOneStop)
        }
        // цена до и 1 пересадка
        if (btnWithStops && handlePressPriceUpToBool) {
          setIterat(ticketsPriceUpToAndWithOneStop)
        }
        // цена от и цена до и без пересадок
        if (btnWithoutStops && handlePressPriceFromBool && handlePressPriceUpToBool) {
          setIterat(bothPriceAndWithoutStops)
        }
        // цена от и цена до и 1 пересадка
        if (btnWithStops && handlePressPriceFromBool && handlePressPriceUpToBool) {
          setIterat(bothPriceAndWithStops)
        }
        return function() {
          setIterat(allTickets)
        }
      }, [btnWithoutStops, btnWithStops, handlePressPriceFromBool, handlePressPriceUpToBool])
}