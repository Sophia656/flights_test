import { useEffect, useState } from "react"

export function useShowArrayOnClick({allTickets,
    currentNum,
    setChecked,
    checked,
    checkedCarriers,
    setCheckedCarriers,
    names
    }) {
    const [checkedNumbers, setCheckedNumbers] = useState([]); // массив кликнутых перевозчиков(нумерация)
    const currentCarrier = [];
    useEffect(() => {
        // ищем билеты соответствующие номеру чекбокса
        allTickets.forEach(ticket => {
          if (ticket.carrier.caption === names[currentNum]) {
            currentCarrier.push(ticket)
          }
        })
    
        if (checked) { // при клике пушим в массив чекнутых --->
          setCheckedCarriers([...checkedCarriers, ...currentCarrier]) // билетов
          setCheckedNumbers([...checkedNumbers, currentNum]) // номеров
          checkedNumbers.forEach(num => {
            if (num === currentNum) { // если нажали повторно:
              setChecked(false) // --- снимаем галочку при повторном клике
              setCheckedNumbers(checkedNumbers.filter(number => number !== num)) // --- убираем номера из массива кликнутых
              setCheckedCarriers(checkedCarriers.filter(carrier => !currentCarrier.includes(carrier))) // --- убираем из массива билеты
            }
          })
        }
    
      }, [checked, currentNum])
}