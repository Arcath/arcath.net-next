import fs from 'fs'
import {defaults, asyncMap, pick, ArrayElement, indexedBy} from '@arcath/utils'
import path from 'path'
import matter from 'gray-matter'

const {readdir, readFile} = fs.promises

const POSTS_DIRECTORY = path.join(process.cwd(), '_content', 'posts')

interface BasePost{
  /** `year-month-day` for sorting */
  internalDate: string
  /** The posts slug, used for linking */
  slug: string[]
  slugString: string
  year: string
  month: string
  day: string
  file: string
  href: string
}

export interface Post extends BasePost{
  title: string
  content: string
  date: string
  lead: string
  tags: string[]
}

export interface ContentQueryParams{
  limit: number | false
  orderBy: keyof Post
  skip: number
}

const defaultQueryParams: ContentQueryParams = {
  limit: 5,
  orderBy: 'internalDate',
  skip: 0
}

const getPostFiles = async (): Promise<BasePost[]> => {
  const dirs = await readdir(POSTS_DIRECTORY)

  return dirs.map((dir) => {
    const [year, month, day, ...slug] = dir.split('-')

    return {
      year, month, day,
      slug: [year, month, slug.join('-')],
      slugString: [year, month, slug.join('-')].join('-'),
      href: '/' + [year, month, slug.join('-')].join('/'),
      internalDate: `${year}-${month}-${day}`,
      file: path.join(POSTS_DIRECTORY, dir, 'index.mdx')
    }
  })
}

const getPost = async (basePost: BasePost): Promise<Post> => {
  const {file, year, month, day} = basePost

  const contents = await readFile(file)

  const {data, content} = matter(contents)

  const post = {
    ...basePost,
    ...data,
    content
  } as Post

  post.date = new Date(`${year}-${month}-${day}`).toISOString()

  return post
}

export const getPosts = async <K extends (keyof Post)[]>(fields: K, options: Partial<ContentQueryParams> = {}): Promise<Pick<Post, ArrayElement<K>>[]> => {
  const {limit, orderBy, skip} = defaults(options, defaultQueryParams)

  const basePosts = await getPostFiles()

  let sorted = basePosts.sort((a, b) => a[orderBy] - b[orderBy]).reverse()

  if(limit){
    sorted = sorted.slice(skip, skip + limit)
  }

  return asyncMap(sorted, async (basePost) => {
    const post = await getPost(basePost)

    return pick(post, fields)
  })
}

export const getPostBySlug = async <K extends (keyof Post)[]>(slug: string[], fields: K): Promise<Pick<Post, ArrayElement<K>>> => {
  const basePosts = await getPostFiles()

  const index = indexedBy('slugString', basePosts)

  const basePost = index[slug.join('-')]

  const post = await getPost(basePost)

  return pick(post, fields)
}