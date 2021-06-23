import {getBook, getBooks} from '~/lib/data/books'

describe('Books', () => {
  it('should find books', async () => {
    const books = await getBooks()

    expect(books[0]).toHaveProperty('index')
    expect(await books[0].data).toHaveProperty('author')

    const book = await getBook(books[0].file.path)

    expect((await book.data).title).toBe((await books[0].data).title)

    const sortedBooks = await getBooks({
      orderBy: 'title',
      limit: 1
    })

    expect(sortedBooks).toHaveLength(1)

    const reverseSortedBooks = await getBooks({
      orderBy: 'title',
      order: 'DESC',
      limit: 1
    })

    expect((await sortedBooks[0].data).title).not.toBe(
      (await reverseSortedBooks[0].data).title
    )

    const allBooks = await getBooks({
      limit: false
    })

    expect(allBooks.length).toBeGreaterThan(1)
  })
})
