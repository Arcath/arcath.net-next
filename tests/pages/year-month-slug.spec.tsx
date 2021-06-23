import {getStaticPaths, getStaticProps} from '../../pages/[year]/[month]/[slug]'

describe('Post page', () => {
  it('should generate static paths', async () => {
    const paths = await getStaticPaths({})

    expect(paths.paths.length).toBeGreaterThan(50)
  })
})
