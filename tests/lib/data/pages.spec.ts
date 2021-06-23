import path from 'path'

import {getPage, getPages, PAGES_DIRECTORY} from '~/lib/data/pages'

describe('Books', () => {
  it('should find books', async () => {
    const pages = await getPages()

    expect(await pages[0].data).toHaveProperty('title')

    const page = getPage(pages[0].file.path)

    expect((await page.data).title).toBe((await pages[0].data).title)

    const sortedPages = await getPages({
      orderBy: 'title',
      limit: 1
    })

    expect(sortedPages).toHaveLength(1)

    const reverseSortedPages = await getPages({
      orderBy: 'title',
      order: 'DESC',
      limit: 1
    })

    expect((await reverseSortedPages[0].data).title).not.toBe(
      (await sortedPages[0].data).title
    )

    const allPages = await getPages({
      limit: false
    })

    expect(allPages.length).toBeGreaterThan(1)
  })

  it('should have the right properties', () => {
    const filePath = path.join(PAGES_DIRECTORY, 'about.mdx')

    const page = getPage(filePath)

    expect(page.properties.href).toBe('/about')
    expect(page.properties.slug).toBe('about')
  })
})
