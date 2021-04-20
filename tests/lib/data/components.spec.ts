import {getComponents} from '~/lib/data/component'
import {getPostBySlug} from '~/lib/data/posts'

describe('Components', () => {
  it('should get components for a folder', async () => {
    const post = await getPostBySlug(['2020', '03', 'moving-to-mdx'], ['directory'])

    expect(post).not.toBeUndefined()

    const components = await getComponents(post.directory)

    expect(components['./demo.tsx']).not.toBeUndefined()
  })
})