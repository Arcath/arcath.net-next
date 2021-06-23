import React from 'react'

export const MONTH_FROM_STRING = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December'
}

const MONTH_FROM_NUMBER = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
}

export const PostDate: React.FC<{date: string}> = ({date}) => {
  const d = new Date(date)

  return (
    <div className="w-full md:w-32 text-center mb-8 float-right">
      <div className="text-3xl">{d.getDate()}</div>
      <div className="mt-0">{MONTH_FROM_NUMBER[d.getMonth() + 1]}</div>
      <div>{d.getFullYear()}</div>
    </div>
  )
}
