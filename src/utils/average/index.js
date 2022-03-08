export const average3Months = (currentMonth, monthObj) => {
  let lastThreeMonthAverageReduce;
  const month2DigArray = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  const inverseMonths = ['10', '11', '12', '01', '02'];

  if(currentMonth < 4) {
    lastThreeMonthAverageReduce = Math.round((
      (monthObj?.[`Q${inverseMonths[currentMonth - 1]}`] +
      monthObj?.[`Q${inverseMonths[currentMonth]}`] +
      monthObj?.[`Q${inverseMonths[currentMonth + 1]}`]) / 3
      + Number.EPSILON) * 100) / 100;
  } else {
    lastThreeMonthAverageReduce = Math.round((
      (monthObj?.[`Q${month2DigArray[currentMonth - 2]}`] +
      monthObj?.[`Q${month2DigArray[currentMonth - 3]}`] +
      monthObj?.[`Q${month2DigArray[currentMonth - 4]}`]) / 3
      + Number.EPSILON) * 100) / 100;
  }

  return lastThreeMonthAverageReduce;
}
