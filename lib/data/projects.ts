import path from 'path'

import {getFiles, file, BaseProperties} from './file'

const PROJECTS_DIRECTORY = path.join(process.cwd(), '_content', 'projects')

export interface ProjectProperties extends BaseProperties {
  /** The posts slug, used for linking */
  slug: string
  slugString: string
  file: string
  href: string
  directory: string
}

export interface ProjectFrontmatter {
  title: string
  content: string
  year: string
  lead: string
}

const projectProperties = (filePath: string): ProjectProperties => {
  const directory = path.dirname(filePath)
  const dir = path.basename(directory)

  return {
    slug: dir,
    slugString: ['projects', dir].join('-'),
    href: `/projects/${dir}`,
    file: path.join(PROJECTS_DIRECTORY, dir, 'index.mdx'),
    directory: path.join(PROJECTS_DIRECTORY, dir),
    bundleDirectory: `/img/projects/${dir}/`
  }
}

export const getProjects = getFiles<ProjectFrontmatter, ProjectProperties>({
  directory: PROJECTS_DIRECTORY,
  getProperties: projectProperties,
  defaultQueryParams: {
    limit: 5,
    orderBy: 'year',
    order: 'ASC',
    skip: 0
  }
})

export const getProject = (filePath: string) => {
  return file<ProjectFrontmatter, ProjectProperties>(
    filePath,
    projectProperties(filePath)
  )
}

export const getProjectBySlug = (slug: string) => {
  const filePath = path.join(PROJECTS_DIRECTORY, slug, 'index.mdx')

  return getProject(filePath)
}
