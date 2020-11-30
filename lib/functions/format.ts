import {format} from 'date-fns'

const DATE_FORMAT = 'EEEE do MMMM y'

export const formatAsDate = (date: Date) => {
  return format(date, DATE_FORMAT)
}