import {getProject, getProjects} from '~/lib/data/projects'

describe('Books', () => {
  it('should find books', async () => {
    const projects = await getProjects()

    expect(await projects[0].data).toHaveProperty('title')

    const project = getProject(projects[0].file.path)

    expect((await project.data).title).toBe((await projects[0].data).title)

    const sortedProjects = await getProjects({
      orderBy: 'title',
      limit: 1
    })

    expect(sortedProjects).toHaveLength(1)

    const reverseSortedProjects = await getProjects({
      orderBy: 'title',
      order: 'DESC',
      limit: 1
    })

    expect((await reverseSortedProjects[0].data).title).not.toBe(
      (await sortedProjects[0].data).title
    )

    const allProjects = await getProjects({
      limit: false
    })

    expect(allProjects.length).toBeGreaterThan(1)
  })
})
