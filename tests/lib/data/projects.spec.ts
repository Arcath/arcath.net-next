import {getProjectBySlug, getProjects} from '~/lib/data/projects'

describe('Books', () => {
  it('should find books', async () => {
    const projects = await getProjects(['title', 'slug'])

    expect(projects[0]).toHaveProperty('title')
    expect(projects[0]).not.toHaveProperty('author')

    const project = await getProjectBySlug(projects[0].slug, ['title'])

    expect(project.title).toBe(projects[0].title)

    const sortedProjects = await getProjects(['title'], {
      orderBy: 'title',
      limit: 1
    })

    expect(sortedProjects).toHaveLength(1)

    const reverseSortedProjects = await getProjects(['title'], {
      orderBy: 'title',
      order: 'DESC',
      limit: 1
    })

    expect(reverseSortedProjects[0].title).not.toBe(sortedProjects[0].title)

    const allProjects = await getProjects(['title'], {
      limit: false
    })

    expect(allProjects.length).toBeGreaterThan(1)
  })
})
