import {parameterize} from '@arcath/utils'

export const tagHref = (name: string) => {
  return `/tags/${parameterize(name)}`
}