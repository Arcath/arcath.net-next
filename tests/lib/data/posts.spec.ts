import {getPost, getPosts} from '~/lib/data/posts'

describe('Books', () => {
  it('should find books', async () => {
    const posts = await getPosts()

    expect(await posts[0].data).toHaveProperty('title')

    const post = await getPost(posts[0].file.path)

    expect((await post.data).title).toBe((await posts[0].data).title)

    const sortedPosts = await getPosts({
      orderBy: 'title',
      limit: 1,
      order: 'ASC'
    })

    expect(sortedPosts).toHaveLength(1)

    const reverseSortedPosts = await getPosts({
      orderBy: 'title',
      order: 'DESC',
      limit: 1
    })

    expect((await reverseSortedPosts[0].data).title).not.toBe(
      (await sortedPosts[0].data).title
    )

    const allPosts = await getPosts({
      limit: false
    })

    expect(allPosts.length).toBeGreaterThan(1)
  })
})
