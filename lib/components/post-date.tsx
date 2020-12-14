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

export const PostDate: React.FC<{year: number | string, month: number | string, day: number | string}> = ({year, month, day}) => {
  return <div className="w-full md:w-32 text-center mb-8 float-right">
    <div className="text-3xl">{day}</div>
    <div className="mt-0">{MONTH_FROM_STRING[month]}</div>
    <div>{year}</div>
  </div>
}