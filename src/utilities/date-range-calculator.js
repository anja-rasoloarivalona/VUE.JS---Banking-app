const dateRangeCalculator = (frequency, previousDate) => {
  const dayLength = 24 * 60 * 60 * 1000
  const prev = new Date(previousDate)
  const prevMonth = prev.getMonth()
  const prevYear = prev.getFullYear()
  let nbDaysBeforeNextDate
  const counterData = { once: 1, twice: 2, 'three times': 3, 'four times': 4, 'five times': 5, 'six times': 6 }
  const periodData = { 'a day': 1, 'a week': 7, 'every two weeks': 14, 'a month': 30, 'a year': prevYear % 400 === 0 || (prevYear % 100 !== 0 && prevYear % 4 === 0) ? 366 : 365 }
  if (frequency.period === 'a month') {
    nbDaysBeforeNextDate = new Date(prevYear, prevMonth + 1, 0).getDate()
  } else {
    const counter = counterData[frequency.counter]
    const period = periodData[frequency.period]
    nbDaysBeforeNextDate = Math.ceil(period / counter)
  }
  const nextDate = new Date(prev.getTime() + nbDaysBeforeNextDate * dayLength)
  return nextDate
}
export { dateRangeCalculator }
