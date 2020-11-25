import fs from 'fs'
import {defaults, asyncMap, pick, ArrayElement, indexedBy} from '@arcath/utils'
import path from 'path'
import matter from 'gray-matter'

const {readdir, readFile} = fs.promises

const VIDEOS_DIRECTORY = path.join(process.cwd(), '_content', 'videos')

interface BaseVideo{
  /** The posts slug, used for linking */
  slug: string[]
  slugString: string
  file: string
  href: string
  year: string
  month: string
  day: string
}

interface Video extends BaseVideo{
  title: string
  content: string
  source: string
  sourceAddress: string
  videoId: string
}

interface ContentQueryParams{
  limit: number | false
  orderBy: keyof Video,
  order: 'ASC' | 'DESC'
}

const defaultQueryParams: ContentQueryParams = {
  limit: 5,
  orderBy: 'year',
  order: 'ASC'
}

const getVideoFiles = async (): Promise<BaseVideo[]> => {
  const dirs = await readdir(VIDEOS_DIRECTORY)

  

  return dirs.map((dir) => {
    const [year, month, day, ...slug] = dir.split('-')
    
    return {
      year, month, day,
      slug: ['videos', year, month, slug.join('-')],
      slugString: ['videos', year, month, slug.join('-')].join('-'),
      href: '/' + [year, month, slug.join('-')].join('/'),
      file: path.join(VIDEOS_DIRECTORY, dir, 'index.mdx')
    }
  })
}

const getVideo = async (baseVideo: BaseVideo): Promise<Video> => {
  const {file} = baseVideo

  const contents = await readFile(file)

  const {data, content} = matter(contents)

  const video = {
    ...baseVideo,
    ...data,
    content
  } as Video


  return video
}

export const getVideos = async <K extends (keyof Video)[]>(fields: K, options: Partial<ContentQueryParams> = {}): Promise<Pick<Video, ArrayElement<K>>[]> => {
  const {limit, orderBy, order} = defaults(options, defaultQueryParams)

  const baseVideos = await getVideoFiles()

  let sorted = baseVideos.sort((a, b) => a[orderBy] - b[orderBy])

  if(order === 'DESC'){
    sorted = sorted.reverse()
  }

  if(limit){
    sorted = sorted.slice(0, limit)
  }

  return asyncMap(sorted, async (baseProject) => {
    const project = await getVideo(baseProject)

    return pick(project, fields)
  })
}

export const getVideoBySlug = async <K extends (keyof Video)[]>(slug: string[], fields: K): Promise<Pick<Video, ArrayElement<K>>> => {
  const baseVideos = await getVideoFiles()

  const index = indexedBy('slugString', baseVideos)

  const baseVideo = index[slug.join('-')]

  const video = await getVideo(baseVideo)

  return pick(video, fields)
}