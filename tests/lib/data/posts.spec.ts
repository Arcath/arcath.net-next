import {getPostBySlug, getPosts} from '~/lib/data/posts'

describe('Books', () => {
  it('should find books', async () => {
    const posts = await getPosts(['title', 'slug'])

    expect(posts[0]).toHaveProperty('title')
    expect(posts[0]).not.toHaveProperty('author')

    const post = await getPostBySlug(posts[0].slug, ['title'])

    expect(post.title).toBe(posts[0].title)

    const sortedPosts = await getPosts(['title'], {
      orderBy: 'title',
      limit: 1,
      order: 'ASC'
    })

    expect(sortedPosts).toHaveLength(1)

    const reverseSortedPosts = await getPosts(['title'], {
      orderBy: 'title',
      order: 'DESC',
      limit: 1
    })

    expect(reverseSortedPosts[0].title).not.toBe(sortedPosts[0].title)

    const allPosts = await getPosts(['title'], {
      limit: false
    })

    expect(allPosts.length).toBeGreaterThan(1)
  })
})
