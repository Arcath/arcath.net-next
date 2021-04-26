import React from 'react'
import {GetStaticPropsContext, NextPage, GetStaticPaths, InferGetStaticPropsType} from 'next'
import Head from 'next/head'
import {pick} from '@arcath/utils'

import {getPageBySlug, getPages} from '~/lib/data/pages'

import {Content} from '~/lib/components/mdx'
import {Layout} from '~/lib/components/layout'
import {OpenGraph} from '~/lib/components/open-graph'


import {pageTitle} from '~/lib/functions/page-title'
import {prepareMDX} from '~/lib/functions/prepare-mdx'

export const getStaticProps = async ({params}: GetStaticPropsContext) => {
  if(params?.slug && Array.isArray(params.slug)){
    const page = await getPageBySlug(params.slug, ['slug', 'title', 'content', 'directory'])

    const source = await prepareMDX(page.content, {
      directory: page.directory,
      imagesUrl: `/img/pages/${params.slug.join('/')}/`
    })

    return {
      props: {
        page: pick(page, ['title', 'slug']),
        source
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getPages(['slug'], {limit: false})

  const paths = pages.map(({slug}) => {
    return {params: {slug}}
  })

  return {
    paths,
    fallback: false
  }
}

const MDXPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({page, source}) => {
  return <Layout>
    <Head>
      <title>{pageTitle(page.title)}</title>
    </Head>
    <OpenGraph title={page.title} description={page.title} />
    <Content source={source} heading={page.title} />
  </Layout>
}

export default MDXPage