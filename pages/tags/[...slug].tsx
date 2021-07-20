import React from 'react'
import {
  GetStaticPropsContext,
  NextPage,
  GetStaticPaths,
  InferGetStaticPropsType
} from 'next'
import Link from 'next/link'
import Head from 'next/head'
import {replaceProperty} from '@arcath/utils/lib/functions/replace-property'
import {asyncMap} from '@arcath/utils/lib/functions/async-map'
import {pick} from '@arcath/utils/lib/functions/pick'

import {getTag, getTags} from '~/lib/data/tags'

import {Layout} from '~/lib/components/layout'
import {PostDate} from '~/lib/components/post-date'
import {OpenGraph} from '~/lib/components/open-graph'

import {pageTitle} from '~/lib/functions/page-title'

export const getStaticProps = async ({params}: GetStaticPropsContext) => {
  if (params?.slug && Array.isArray(params.slug)) {
    const tag = await getTag(params.slug[0])

    return {
      props: {
        tag: pick(tag, ['name']),
        posts: await asyncMap(tag.posts, async post => {
          const data = await post.data

          return replaceProperty(
            pick(data, ['title', 'href', 'date', 'lead']),
            'date',
            date => date.toISOString()
          )
        })
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await getTags()

  const paths = tags.all().map(({slug}) => {
    return {params: {slug: [slug]}}
  })

  return {
    paths,
    fallback: false
  }
}

export const TagPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> =
  ({tag, posts}) => {
    return (
      <Layout>
        <Head>
          <title>{pageTitle(`Tag / ${tag.name}`)}</title>
        </Head>
        <OpenGraph
          title={`Tag / ${tag.name}`}
          description={`Posts tagged ${tag.name}`}
        />
        <div className="grid grid-cols-content prose dark:prose-dark max-w-none">
          <h2 className="col-start-3">{tag.name}</h2>
          {posts.map(({title, href, date, lead}) => {
            return [
              <div key={`${href}-meta`} className="col-start-2">
                <PostDate date={date} />
              </div>,
              <div key={`${href}-data`} className="col-start-3">
                <Link href={href}>
                  <h3 style={{marginTop: '0', cursor: 'pointer'}}>
                    <a>{title}</a>
                  </h3>
                </Link>
                <p>{lead}</p>
              </div>
            ]
          })}
        </div>
      </Layout>
    )
  }

export default TagPage
