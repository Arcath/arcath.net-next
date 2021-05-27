import {getTags, getTag} from '~/lib/data/tags'

describe('Tag', () => {
  it('should get all tags', async () => {
    const tags = await getTags(['title'])

    expect(tags.count()).toBeGreaterThan(1)

    const tag = tags.findOne({name: 'Next.JS'})

    expect(tag.name).toBe('Next.JS')

    const foundTag = await getTag('Next.JS', ['title'])

    expect(foundTag.name).toBe('Next.JS')
    expect(foundTag.posts).toHaveLength(tag.posts.length)
  })
})
