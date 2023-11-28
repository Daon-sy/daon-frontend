interface YearMonth {
  year: number
  month: number
}

export interface YearMonthDateCount {
  year: number
  month: number
  dateCount: number
}

/**
 * year년, month월의 일 수
 */
export const getDateCount = ({ year, month }: YearMonth): number =>
  new Date(year, month, 0).getDate()

// 6개월 전 후로 일자 수 가져옴
export const getDateCountArray = ({
  startDate,
  endDate,
}: {
  startDate: Date
  endDate: Date
}): YearMonthDateCount[] => {
  let startYear = startDate.getFullYear()
  let startMonth = startDate.getMonth() - 5
  if (startMonth < 1) {
    startYear -= 1
    startMonth += 12
  }

  // 최대 마감일로부터 반년 후 날짜
  let endYear = endDate.getFullYear()
  let endMonth = endDate.getMonth() + 7
  if (endMonth > 12) {
    endYear += 1
    endMonth -= 12
  }

  const start = {
    year: startYear,
    month: startMonth,
  }
  const end = {
    year: endYear,
    month: endMonth,
  }

  const arr: YearMonthDateCount[] = []

  let tmpYear = start.year
  let tmpMonth = start.month
  while (tmpYear !== end.year || tmpMonth !== end.month) {
    const dateCount = getDateCount({ year: tmpYear, month: tmpMonth })
    arr.push({
      year: tmpYear,
      month: tmpMonth,
      dateCount,
    })

    tmpMonth += 1
    if (tmpMonth > 12) {
      tmpMonth -= 12
      tmpYear += 1
    }
  }

  const lastDateCount = getDateCount({ year: tmpYear, month: tmpMonth })
  arr.push({
    year: tmpYear,
    month: tmpMonth,
    dateCount: lastDateCount,
  })

  return arr
}

export const todayDateToString = () => {
  const today = new Date()
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
}
