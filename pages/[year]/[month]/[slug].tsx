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
import {pick} from '@arcath/utils/lib/functions/pick'

import {getPostFromSlug, getPosts} from '~/lib/data/posts'

import {ContentContainer, MDX} from '~/lib/components/mdx'
import {Layout} from '~/lib/components/layout'
import {OpenGraph} from '~/lib/components/open-graph'
import {MONTH_FROM_STRING} from '~/lib/components/post-date'
import {ShareButtons} from '~/lib/components/share-buttons'

import {log} from '~/lib/functions/log'
import {pageTitle} from '~/lib/functions/page-title'
import {tagHref} from '~/lib/functions/tag-href'

import meta from '~/data/meta.json'

export const getStaticProps = async ({
  params
}: GetStaticPropsContext<{year: string; month: string; slug: string}>) => {
  if (params.year && params.month && params.slug) {
    const post = getPostFromSlug(params.year, params.month, params.slug)

    log('post', `rendering post /${params.year}/${params.month}/${params.slug}`)

    const source = await post.bundle

    return {
      props: {
        post: replaceProperty(
          pick(await post.data, [
            'slug',
            'title',
            'lead',
            'href',
            'tags',
            'year',
            'month',
            'date'
          ]),
          'date',
          date => date.toISOString()
        ),
        source
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts({limit: false, orderBy: 'href'})

  const paths = posts.map(({properties}) => {
    return {
      params: {
        year: properties.year,
        month: properties.month,
        slug: properties.slug
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

const MDXPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
  source
}) => {
  return (
    <Layout>
      <Head>
        <title>{pageTitle(post.title)}</title>
      </Head>
      <OpenGraph
        title={post.title}
        description={post.lead}
        image={`${meta.productionUrl}/img/social${post.href}/social.jpg`}
      />
      <ContentContainer>
        <aside className="col-start-3 md:col-start-2 col-end-3 row-start-1 row-span-3">
          <div className="w-full md:w-32 text-center mb-8 float-right">
            <div className="text-3xl">{new Date(post.date).getDate()}</div>
            <div className="mt-0">{MONTH_FROM_STRING[post.month]}</div>
            <div>{post.year}</div>
            {post.tags.map(tag => {
              return (
                <Link key={tag} href={tagHref(tag)}>
                  <a className="block my-2">{tag}</a>
                </Link>
              )
            })}
          </div>
        </aside>
        <h1 className="mb-0 col-start-3">{post.title}</h1>
        <MDX source={source} />
        <aside className="col-start-3">
          <ShareButtons
            url={`${meta.productionUrl}${post.href}`}
            title={post.title}
          />
        </aside>
      </ContentContainer>
    </Layout>
  )
}

export default MDXPage
