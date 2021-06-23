import path from 'path'

import {file, getFiles, BaseProperties} from './file'

const VIDEOS_DIRECTORY = path.join(process.cwd(), '_content', 'videos')

export interface VideoProperties extends BaseProperties {
  /** The posts slug, used for linking */
  slug: string[]
  slugString: string
  file: string
  href: string
  year: string
  month: string
  day: string
  directory: string
}

interface VideoFrontmatter {
  title: string
  content: string
  source: string
  sourceAddress: string
  videoId: string
}

const videoProperties = (filePath: string): VideoProperties => {
  const directory = path.dirname(filePath)
  const dir = path.basename(directory)

  const [year, month, day, ...slug] = dir.split('-')

  const href = '/' + [year, month, slug.join('-')].join('/')

  return {
    year,
    month,
    day,
    slug: ['videos', year, month, slug.join('-')],
    slugString: ['videos', year, month, slug.join('-')].join('-'),
    href,
    file: path.join(VIDEOS_DIRECTORY, dir, 'index.mdx'),
    directory: path.join(VIDEOS_DIRECTORY, dir),
    bundleDirectory: `/img/videos${href}/`
  }
}

export const getVideos = getFiles<VideoFrontmatter, VideoProperties>({
  directory: VIDEOS_DIRECTORY,
  getProperties: videoProperties,
  defaultQueryParams: {
    limit: 5,
    orderBy: 'year',
    order: 'ASC',
    skip: 0
  }
})

export const getVideo = (filePath: string) => {
  return file<VideoFrontmatter, VideoProperties>(
    filePath,
    videoProperties(filePath)
  )
}
