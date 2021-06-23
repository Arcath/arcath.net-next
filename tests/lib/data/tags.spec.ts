import {getTags, getTag} from '~/lib/data/tags'

describe('Tag', () => {
  it('should get all tags', async () => {
    const tags = await getTags()

    expect(tags.count()).toBeGreaterThan(1)

    const tag = tags.findOne({name: 'Next.JS'})

    expect(tag.name).toBe('Next.JS')

    const foundTag = await getTag('Next.JS')

    expect(foundTag.name).toBe('Next.JS')
    expect(foundTag.posts).toHaveLength(tag.posts.length)
  })
})
