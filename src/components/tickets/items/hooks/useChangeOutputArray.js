import { useEffect } from "react"

export function useChangeOutputArray({setIterat, allTickets, checkedCarriers}) {
    useEffect(() => {
        if (checkedCarriers.length === 0) {
          setIterat(allTickets)
        } else {
          setIterat(checkedCarriers)
        }
    
    }, [checkedCarriers])
}