import {pageTitle} from '~/lib/functions/page-title'

describe('Page Title', () => {
  it('should create a page title', () => {
    const title = pageTitle('Test')

    expect(title).toMatch(/Test \//)
  })
})
