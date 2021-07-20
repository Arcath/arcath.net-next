import {parameterize} from '@arcath/utils/lib/functions/parameterize'

export const tagHref = (name: string) => {
  return `/tags/${parameterize(name)}`
}
