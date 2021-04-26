import React from 'react'
import {GetStaticPropsContext, NextPage, GetStaticPaths, InferGetStaticPropsType} from 'next'
import Link from 'next/link'
import Head from 'next/head'

import {getTag, getTags} from '~/lib/data/tags'

import {Layout} from '~/lib/components/layout'
import {PostDate} from '~/lib/components/post-date'
import {OpenGraph} from '~/lib/components/open-graph'


import {pageTitle} from '~/lib/functions/page-title'

export const getStaticProps = async ({params}: GetStaticPropsContext) => {
  if(params?.slug && Array.isArray(params.slug)){
    const tag = await getTag(params.slug[0], ['title', 'href', 'day', 'month', 'year', 'lead'])

    return {
      props: {
        tag
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await getTags([])

  const paths = tags.all().map(({slug}) => {
    return {params: {slug: [slug]}}
  })

  return {
    paths,
    fallback: false
  }
}

export const TagPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({tag}) => {
  return <Layout>
    <Head>
      <title>{pageTitle(`Tag / ${tag.name}`)}</title>
    </Head>
    <OpenGraph title={`Tag / ${tag.name}`} description={`Posts tagged ${tag.name}`} />
    <div className="grid grid-cols-content prose dark:prose-dark max-w-none">
      <h2 className="col-start-3">{tag.name}</h2>
      {tag.posts.map(({title, href, day, month, year, lead}) => {
        return [
          <div key={`${href}-meta`} className="col-start-2">
            <PostDate year={year} month={month} day={day} />
          </div>,
          <div key={`${href}-data`} className="col-start-3">
            <Link href={href}><h3 style={{marginTop: '0', cursor: 'pointer'}}><a>{title}</a></h3></Link>
            <p>{lead}</p>
          </div>
        ]
      })}
    </div>
  </Layout>
}

export default TagPage