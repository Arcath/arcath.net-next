import {parameterize} from '@arcath/utils/lib/functions/parameterize'
import {asyncForEach} from '@arcath/utils/lib/functions/async-for-each'
import {db} from 'sodb'

import {getPosts, PostFrontmatter, PostProperties} from './posts'
import {File} from './file'

import {tagHref} from '~/lib/functions/tag-href'

interface Tag {
  name: string
  slug: string
  href: string
  posts: File<PostFrontmatter, PostProperties>[]
}

export const getTags = async () => {
  const posts = await getPosts({limit: false})

  const tags = db<Tag>([], {
    index: 'name'
  })

  await asyncForEach(posts, async post => {
    ;(await post.data).tags.forEach(tag => {
      if (tags.lookup(tag)) {
        const t = tags.lookup(tag)

        t.posts.push(post)

        tags.update(t)
      } else {
        const t = {
          name: tag,
          slug: parameterize(tag),
          posts: [post],
          href: tagHref(tag)
        }

        tags.add(t)
      }
    })
  })

  return tags
}

export const getTag = async (tag: string) => {
  const tags = await getTags()

  const slug = parameterize(tag)

  const t = tags.findOne({slug: {is: slug}})

  return t
}
