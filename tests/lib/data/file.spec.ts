import path from 'path'

import {file} from '../../../lib/data/file'

describe('File', () => {
  it('should return a file', async () => {
    const fileDirectory = path.join(
      process.cwd(),
      '_content',
      'posts',
      '2013-08-expects'
    )
    const filePath = path.join(fileDirectory, 'index.mdx')

    const post = file<
      {
        title: string
      },
      {
        key: string
        slug: string
      }
    >(filePath, {
      key: '2013-08-expects',
      slug: '2013-08-expects'
    })

    expect(post.file.directory).toBe(fileDirectory)
    expect(post.file.extension).toBe('.mdx')

    const content = await post.contents

    expect(content).toMatch(/Expects is lightweight DSL/)

    post.clear()

    const data = await post.data

    expect(data.title).toBe('Expects')
    expect(data.slug).toBe('2013-08-expects')

    expect(post.index).toBe(0)

    const refetchedPost = file<
      {
        title: string
      },
      {
        key: string
        slug: string
      }
    >(filePath, {
      key: '2013-08-expects',
      slug: '2013-08-expects'
    })

    expect(refetchedPost.index).toBe(post.index)
  })

  it('should get a property', async () => {
    const filePath = path.join(
      process.cwd(),
      '_content',
      'books',
      'rhythm-of-war',
      'index.mdx'
    )

    const book = file<{title: string}, {slug: string}>(filePath, {
      slug: '/books/rythm-of-war'
    })

    expect(await book.getProperty('slug')).toBe('/books/rythm-of-war')
    expect(await book.getProperty('title')).toBe(
      'Rhythm Of War (Stormlight #4)'
    )
  })
})
