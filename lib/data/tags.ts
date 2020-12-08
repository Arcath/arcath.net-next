import {ArrayElement, parameterize} from '@arcath/utils'
import {db} from 'sodb'

import {getPosts, Post} from './posts'

import {tagHref} from '~/lib/functions/tag-href'

interface Tag<K extends keyof Post>{
  name: string
  slug: string
  href: string
  posts: Pick<Post, K>[]
}

export const getTags = async <K extends (keyof Post)[]>(postFields: K) => {
  const posts = await getPosts([...postFields, 'tags', 'slug'], {limit: false})

  const tags = db<Tag<ArrayElement<K>>>([], {
    index: 'name'
  })

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if(tags.lookup(tag)){
        const t = tags.lookup(tag)

        t.posts.push(post)

        tags.update(t)
      }else{
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

export const getTag = async <K extends (keyof Post)[]>(tag: string, postFields: K) => {
  const tags = await getTags(postFields)

  const slug = parameterize(tag)

  const t = tags.findOne({slug: {is: slug}})

  return t
}