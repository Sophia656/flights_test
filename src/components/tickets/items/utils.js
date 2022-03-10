// функция для создания массива только с уникальными значениями
export function unique(arr) {
    return Array.from(new Set(arr));
}
// массив с названиями перевозчиков и цен
export const arrayOfCarriers = (allTickets) => {
    // массив билетов, отсортированный по возрастанию цены
    const price = allTickets.sort(function(a, b) {
        return a.price.total.amount - b.price.total.amount
    })
    // массив с названиями перевозчиков
    const carriers = [];
    for (const key of price) {
        const caption = [key.carrier.caption, key.price.total.amount];
        carriers.push(caption)
    }
    return carriers
}
 // массив уникальных билетов
export const arrayOfUniqueCarriers = ({carriers, names}) => {
    const uniqueCarriers = []; // массив уникальных билетов
    let matchCounter = 0; // счетчик совпадений билетов
    let namesCounter = -1; // счетчик совпадения названий перевозчиков
    // ищем уникальные(по названиям первозчиков) билеты с минимальной ценой
    carriers.forEach(item => {
      for(let i = 0; i < names.length; i++) {
        if (item[0] === names[i]) {
          matchCounter++
          break
        }
      }
      if (matchCounter === 0) {
        namesCounter++
        names[namesCounter] = item[0]
        uniqueCarriers.push([item])
      }
      matchCounter = 0
    })
    return uniqueCarriers
}
// массив чисел для чекбоксов
export const arrayOfNumbers = (names) => {
    const numbers = [];
    for (let i = 0; i < names.length; i++) {
        numbers.push(i)
    }
    return numbers
}
  // массив билетов, совпадающих по категориям и 'цена от', и 'цена до' 
export const arrayOfBothPrice = ({ticketsPriceFrom, ticketsPriceUpTo}) => {
    const both = [];
    ticketsPriceFrom.map(from => {
      ticketsPriceUpTo.map(upto => {
        if (from === upto) {
          both.push(from)
        }
      })
    })
    return both
}
// массив билетов (без пересадок && с одной пересадкой обратно)
export const arrayOfWithoutStops = ({allWithoutStops, without}) => {
    const ticketsWithoutStops = []; // массив билетов (без пересадок && с одной пересадкой обратно)
    ticketsWithoutStops.push(...allWithoutStops)
    ticketsWithoutStops.push(...without)
    return ticketsWithoutStops
}
// цена от и без пересадок
export const arrayOfPriceFromAndWithoutStops = ({ticketsPriceFrom, ticketsWithoutStops}) => {
    const ticketsPriceFromAndWithoutStops = [];
    ticketsPriceFrom.map(fromPrice => {
        ticketsWithoutStops.map(fromStops => {
            if (fromPrice === fromStops) {
                ticketsPriceFromAndWithoutStops.push(fromPrice)
            }
        })
    })
    return ticketsPriceFromAndWithoutStops
}
// цена до и без пересадок
export const arrayOfPriceUpToAndWithoutStops = ({ticketsPriceUpTo, ticketsWithoutStops}) => {
    const ticketsPriceUpToAndWithoutStops = [];
    ticketsPriceUpTo.map(fromPrice => {
      ticketsWithoutStops.map(fromStops => {
        if (fromPrice === fromStops) {
          ticketsPriceUpToAndWithoutStops.push(fromPrice)
        }
      })
    })
    return ticketsPriceUpToAndWithoutStops
}
// цена от и 1 пересадка
export const arrayOfPriceFromAndWithOneStop = ({ticketsPriceFrom, withOneStop}) => {
    const ticketsPriceFromAndWithOneStop = [];
    ticketsPriceFrom.map(fromPrice => {
      withOneStop.map(fromStops => {
        if (fromPrice === fromStops) {
          ticketsPriceFromAndWithOneStop.push(fromPrice)
        }
      })
    })
    return ticketsPriceFromAndWithOneStop
}
// цена до и 1 пересадка
export const arrayOfPriceUpToAndWithOneStop = ({ticketsPriceUpTo, withOneStop}) => {
    const ticketsPriceUpToAndWithOneStop = [];
    ticketsPriceUpTo.map(fromPrice => {
      withOneStop.map(fromStops => {
        if (fromPrice === fromStops) {
          ticketsPriceUpToAndWithOneStop.push(fromPrice)
        }
      })
    })
    return ticketsPriceUpToAndWithOneStop
}
// цена от и цена до и без пересадок
export const arrayOfBothPriceAndWithoutStops = ({both, ticketsWithoutStops}) => {
    const bothPriceAndWithoutStops = [];
    both.map(fromPrice => {
      ticketsWithoutStops.map(fromStops => {
        if (fromPrice === fromStops) {
          bothPriceAndWithoutStops.push(fromPrice)
        }
      })
    })
    return bothPriceAndWithoutStops
}
// цена от и цена до и 1 пересадка
export const arrayOfBothPriceAndWithStops = ({both, withOneStop}) => {
    const bothPriceAndWithStops = [];
    both.map(fromPrice => {
      withOneStop.map(fromStops => {
        if (fromPrice === fromStops) {
          bothPriceAndWithStops.push(fromPrice)
        }
      })
    })
    return bothPriceAndWithStops
}
