import fs from 'fs'
import {defaults, asyncMap, pick, ArrayElement, indexedBy} from '@arcath/utils'
import path from 'path'
import matter from 'gray-matter'

const {readdir, readFile} = fs.promises

const PROJECTS_DIRECTORY = path.join(process.cwd(), '_content', 'projects')

interface BaseProject{
  /** The posts slug, used for linking */
  slug: string[]
  slugString: string
  file: string
  href: string
  directory: string
}

interface Project extends BaseProject{
  title: string
  content: string
  year: string
  lead: string
}

interface ContentQueryParams{
  limit: number | false
  orderBy: keyof Project,
  order: 'ASC' | 'DESC'
}

const defaultQueryParams: ContentQueryParams = {
  limit: 5,
  orderBy: 'year',
  order: 'ASC'
}

const getProjectFiles = async (): Promise<BaseProject[]> => {
  const dirs = await readdir(PROJECTS_DIRECTORY)

  return dirs.map((dir) => {
    return {
      slug: ['projects', dir],
      slugString: ['projects', dir].join('-'),
      href: `/projects/${dir}`,
      file: path.join(PROJECTS_DIRECTORY, dir, 'index.mdx'),
      directory: path.join(PROJECTS_DIRECTORY, dir)
    }
  })
}

const getProject = async (baseProject: BaseProject): Promise<Project> => {
  const {file} = baseProject

  const contents = await readFile(file)

  const {data, content} = matter(contents)

  const project = {
    ...baseProject,
    ...data,
    content
  } as Project


  return project
}

export const getProjects = async <K extends (keyof Project)[]>(fields: K, options: Partial<ContentQueryParams> = {}): Promise<Pick<Project, ArrayElement<K>>[]> => {
  const {limit, orderBy, order} = defaults(options, defaultQueryParams)

  const baseProjects = await getProjectFiles()

  let sorted = baseProjects.sort((a, b) => a[orderBy] - b[orderBy])

  if(order === 'DESC'){
    sorted = sorted.reverse()
  }

  if(limit){
    sorted = sorted.slice(0, limit)
  }

  return asyncMap(sorted, async (baseProject) => {
    const project = await getProject(baseProject)

    return pick(project, fields)
  })
}

export const getProjectBySlug = async <K extends (keyof Project)[]>(slug: string[], fields: K): Promise<Pick<Project, ArrayElement<K>>> => {
  const baseProjects = await getProjectFiles()

  const index = indexedBy('slugString', baseProjects)

  const baseProject = index[slug.join('-')]

  const project = await getProject(baseProject)

  return pick(project, fields)
}