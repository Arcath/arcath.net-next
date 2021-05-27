import {getVideoBySlug, getVideos} from '~/lib/data/videos'

describe('Books', () => {
  it('should find books', async () => {
    const videos = await getVideos(['title', 'slug'])

    expect(videos[0]).toHaveProperty('title')
    expect(videos[0]).not.toHaveProperty('author')

    const video = await getVideoBySlug(videos[0].slug, ['title'])

    expect(video.title).toBe(videos[0].title)

    const sortedVideos = await getVideos(['title'], {
      orderBy: 'title',
      limit: 1
    })

    expect(sortedVideos).toHaveLength(1)

    const reverseSortedVideos = await getVideos(['title'], {
      orderBy: 'title',
      order: 'DESC',
      limit: 1
    })

    expect(reverseSortedVideos[0].title).not.toBe(sortedVideos[0].title)

    const allVideos = await getVideos(['title'], {
      limit: false
    })

    expect(allVideos.length).toBeGreaterThan(0)
  })
})
