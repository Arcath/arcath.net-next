import meta from '~/data/meta.json'

export const pageTitle = (title: string) => {
  return `${title} / ${meta.name}`
}