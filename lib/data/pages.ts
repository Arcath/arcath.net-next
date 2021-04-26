import fs from 'fs'
import {defaults, asyncMap, pick, ArrayElement, indexedBy} from '@arcath/utils'
import path from 'path'
import matter from 'gray-matter'

const {readdir, readFile} = fs.promises

const PAGES_DIRECTORY = path.join(process.cwd(), '_content', 'pages')

interface BasePage{
  /** The posts slug, used for linking */
  slug: string[]
  slugString: string
  file: string
  href: string
  directory: string
}

interface Page extends BasePage{
  title: string
  content: string
}

interface ContentQueryParams{
  limit: number | false
  orderBy: keyof Page,
  order: 'ASC' | 'DESC'
}

const defaultQueryParams: ContentQueryParams = {
  limit: 5,
  orderBy: 'slug',
  order: 'ASC'
}

const getPageFiles = async (): Promise<BasePage[]> => {
  const dirs = await readdir(PAGES_DIRECTORY)

  return dirs.map((dir) => {
    return {
      slug: ['page', dir],
      slugString: ['page', dir].join('-'),
      href: `/page/${dir}`,
      file: path.join(PAGES_DIRECTORY, dir),
      directory: PAGES_DIRECTORY
    }
  })
}

const getPage = async (basePage: BasePage): Promise<Page> => {
  const {file} = basePage

  const contents = await readFile(file)

  const {data, content} = matter(contents)

  const slug = data.permalink.split('/')
  slug.shift()

  basePage.slug = slug
  basePage.slugString = basePage.slug.join('-')
  basePage.href = data.permalink


  const page = {
    ...basePage,
    ...data,
    content
  } as Page


  return page
}

export const getPages = async <K extends (keyof Page)[]>(fields: K, options: Partial<ContentQueryParams> = {}): Promise<Pick<Page, ArrayElement<K>>[]> => {
  const {limit, orderBy, order} = defaults(options, defaultQueryParams)

  const basePages = await getPageFiles()

  let sorted = basePages.sort((a, b) => a[orderBy] - b[orderBy])

  if(order === 'DESC'){
    sorted = sorted.reverse()
  }

  if(limit){
    sorted = sorted.slice(0, limit)
  }

  return asyncMap(sorted, async (basePage) => {
    const page = await getPage(basePage)

    return pick(page, fields)
  })
}

export const getPageBySlug = async <K extends (keyof Page)[]>(slug: string[], fields: K): Promise<Pick<Page, ArrayElement<K>>> => {
  const basePages = await getPageFiles()
  const pages = await asyncMap(basePages, async (basePage) => {
    const page = await getPage(basePage)

    return page
  })

  const index = indexedBy('slugString', pages)

  const page = index[slug.join('-')]

  return pick(page, fields)
}