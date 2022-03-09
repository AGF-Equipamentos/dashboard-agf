export const average3Months = (currentMonth, monthObj) => {
  let lastThreeMonthAverageReduce
  const month2DigArray = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12'
  ]
  const inverseMonths = ['10', '11', '12', '01', '02']

  if (currentMonth < 4) {
    lastThreeMonthAverageReduce = Number(
      (
        (monthObj?.[`Q${inverseMonths[currentMonth - 1]}`] +
          monthObj?.[`Q${inverseMonths[currentMonth]}`] +
          monthObj?.[`Q${inverseMonths[currentMonth + 1]}`]) /
        3
      ).toFixed(2)
    )
  } else {
    lastThreeMonthAverageReduce = Number(
      (
        (monthObj?.[`Q${month2DigArray[currentMonth - 2]}`] +
          monthObj?.[`Q${month2DigArray[currentMonth - 3]}`] +
          monthObj?.[`Q${month2DigArray[currentMonth - 4]}`]) /
        3
      ).toFixed(2)
    )
  }

  return lastThreeMonthAverageReduce
}
