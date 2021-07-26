import React, {useState, useEffect, useRef} from 'react'
import {GetStaticPropsContext, NextPage, InferGetStaticPropsType} from 'next'
import Link from 'next/link'
import Head from 'next/head'
import useSWR from 'swr'
import {replaceProperty} from '@arcath/utils/lib/functions/replace-property'
import {pick} from '@arcath/utils/lib/functions/pick'
import {asyncMap} from '@arcath/utils/lib/functions/async-map'

import meta from '~/data/meta.json'

import {getPosts, PostFrontmatter, PostProperties} from '~/lib/data/posts'

import {Layout} from '~/lib/components/layout'
import {PostDate} from '~/lib/components/post-date'
import {OpenGraph} from '~/lib/components/open-graph'

export const POST_FIELDS: (keyof (PostFrontmatter & PostProperties))[] = [
  'slug',
  'title',
  'href',
  'date',
  'lead'
]

export type PostData = {
  title: string
  href: string
  date: string
  lead: string
}

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const postFiles = await getPosts({limit: false})

  const posts: PostData[] = await asyncMap(postFiles, async post => {
    return replaceProperty(pick(await post.data, POST_FIELDS), 'date', date =>
      date.toISOString()
    )
  })

  return {
    props: {
      posts
    }
  }
}

const PostsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts
}) => {
  return (
    <Layout>
      <Head>
        <title>{meta.name} / Posts</title>
      </Head>
      <OpenGraph
        title={`${meta.name} / Posts`}
        description={meta.description}
      />
      <div className="grid grid-cols-content prose dark:prose-dark max-w-none">
        <h2 className="col-start-3">Recent Posts</h2>
        {posts.map(({title, href, date, lead}) => {
          return [
            <div key={`${href}-meta`} className="col-start-2">
              <PostDate date={date} />
            </div>,
            <div key={`${href}-data`} className="col-start-3">
              <h3 style={{marginTop: '0'}}>
                <Link href={href}>
                  <a>{title}</a>
                </Link>
              </h3>
              <p>{lead}</p>
            </div>
          ]
        })}
      </div>
    </Layout>
  )
}

export default PostsPage
