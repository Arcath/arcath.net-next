import {getBookBySlug, getBooks} from '~/lib/data/books'

describe('Books', () => {
  it('should find books', async () => {
    const books = await getBooks(['title', 'slug'])

    expect(books[0]).toHaveProperty('title')
    expect(books[0]).not.toHaveProperty('author')

    const book = await getBookBySlug(books[0].slug, ['title'])

    expect(book.title).toBe(books[0].title)

    const sortedBooks = await getBooks(['title'], {
      orderBy: 'title',
      limit: 1
    })

    expect(sortedBooks).toHaveLength(1)

    const reverseSortedBooks = await getBooks(['title'], {
      orderBy: 'title',
      order: 'DESC',
      limit: 1
    })

    expect(reverseSortedBooks[0].title).not.toBe(sortedBooks[0].title)

    const allBooks = await getBooks(['title'], {
      limit: false
    })

    expect(allBooks.length).toBeGreaterThan(1)
  })
})