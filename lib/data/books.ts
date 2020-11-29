import fs from 'fs'
import {defaults, asyncMap, pick, ArrayElement, indexedBy} from '@arcath/utils'
import path from 'path'
import matter from 'gray-matter'

const {readdir, readFile} = fs.promises

const BOOKS_DIRECTORY = path.join(process.cwd(), '_content', 'books')

interface BaseBook{
  /** The posts slug, used for linking */
  slug: string[]
  slugString: string
  file: string
  href: string
}

interface Book extends BaseBook{
  title: string
  content: string
  date: string
  author: string
  link: string
  cover: string
}

interface ContentQueryParams{
  limit: number | false
  orderBy: keyof Book,
  order: 'ASC' | 'DESC'
}

const defaultQueryParams: ContentQueryParams = {
  limit: 5,
  orderBy: 'date',
  order: 'ASC'
}

const getBookFiles = async (): Promise<BaseBook[]> => {
  const dirs = await readdir(BOOKS_DIRECTORY)

  return dirs.map((dir) => {
    return {
      slug: ['books', dir],
      slugString: ['books', dir].join('-'),
      href: `/books/${dir}`,
      file: path.join(BOOKS_DIRECTORY, dir, 'index.mdx')
    }
  })
}

const getBook = async (baseBook: BaseBook): Promise<Book> => {
  const {file} = baseBook

  const contents = await readFile(file)

  const {data, content} = matter(contents)

  const book = {
    ...baseBook,
    ...data,
    content
  } as Book


  return book
}

export const getBooks = async <K extends (keyof Book)[]>(fields: K, options: Partial<ContentQueryParams> = {}): Promise<Pick<Book, ArrayElement<K>>[]> => {
  const {limit, orderBy, order} = defaults(options, defaultQueryParams)

  const baseBooks = await getBookFiles()

  let sorted = baseBooks.sort((a, b) => a[orderBy] - b[orderBy])

  if(order === 'DESC'){
    sorted = sorted.reverse()
  }

  if(limit){
    sorted = sorted.slice(0, limit)
  }

  return asyncMap(sorted, async (baseBook) => {
    const book = await getBook(baseBook)

    return pick(book, fields)
  })
}

export const getBookBySlug = async <K extends (keyof Book)[]>(slug: string[], fields: K): Promise<Pick<Book, ArrayElement<K>>> => {
  const baseBooks = await getBookFiles()

  const index = indexedBy('slugString', baseBooks)

  const baseBook = index[slug.join('-')]

  const book = await getBook(baseBook)

  return pick(book, fields)
}