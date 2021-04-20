import {getPageBySlug, getPages} from '~/lib/data/pages'

describe('Books', () => {
  it('should find books', async () => {
    const pages = await getPages(['title', 'slug'])

    expect(pages[0]).toHaveProperty('title')
    expect(pages[0]).not.toHaveProperty('author')

    const page = await getPageBySlug(pages[0].slug, ['title'])

    expect(page.title).toBe(pages[0].title)

    const sortedPages = await getPages(['title'], {
      orderBy: 'title',
      limit: 1
    })

    expect(sortedPages).toHaveLength(1)

    const reverseSortedPages = await getPages(['title'], {
      orderBy: 'title',
      order: 'DESC',
      limit: 1
    })

    expect(reverseSortedPages[0].title).not.toBe(sortedPages[0].title)

    const allPages = await getPages(['title'], {
      limit: false
    })

    expect(allPages.length).toBeGreaterThan(1)
  })
})