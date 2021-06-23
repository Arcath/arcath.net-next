import {getVideo, getVideos} from '~/lib/data/videos'

describe('Books', () => {
  it('should find books', async () => {
    const videos = await getVideos()

    expect(await videos[0].data).toHaveProperty('title')

    const video = getVideo(videos[0].file.path)

    expect((await video.data).title).toBe((await videos[0].data).title)

    const sortedVideos = await getVideos({
      orderBy: 'title',
      limit: 1
    })

    expect(sortedVideos).toHaveLength(1)

    const reverseSortedVideos = await getVideos({
      orderBy: 'title',
      order: 'DESC',
      limit: 1
    })

    expect((await reverseSortedVideos[0].data).title).not.toBe(
      (await sortedVideos[0].data).title
    )

    const allVideos = await getVideos({
      limit: false
    })

    expect(allVideos.length).toBeGreaterThan(0)
  })
})
