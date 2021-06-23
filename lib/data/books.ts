import path from 'path'

import {file, getFiles, BaseProperties} from './file'

const BOOKS_DIRECTORY = path.join(process.cwd(), '_content', 'books')

interface BookFrontmatter {
  title: string
  content: string
  date: string
  author: string
  link: string
  cover: string
}

interface BookProperties extends BaseProperties {
  slug: string
  slugString: string
  href: string
}

const bookProperties = (filePath: string): BookProperties => {
  const directory = path.dirname(filePath)
  const dir = path.basename(directory)

  return {
    slug: dir,
    slugString: ['books', dir].join('-'),
    href: `/books/${dir}`,
    bundleDirectory: `/img/books/${dir}/`
  }
}

export const getBooks = getFiles<BookFrontmatter, BookProperties>({
  getProperties: bookProperties,
  directory: BOOKS_DIRECTORY,
  defaultQueryParams: {
    limit: 5,
    orderBy: 'date',
    order: 'ASC',
    skip: 0
  }
})

export const getBook = (filePath: string) => {
  return file<BookFrontmatter, BookProperties>(
    filePath,
    bookProperties(filePath)
  )
}

export const getBookFromSlug = (slug: string) => {
  const filePath = path.join(BOOKS_DIRECTORY, slug, 'index.mdx')

  return getBook(filePath)
}
