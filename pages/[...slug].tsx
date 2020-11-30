import {GetStaticPropsContext, NextPage, GetStaticPaths, InferGetStaticPropsType} from 'next'
import Head from 'next/head'

import {getPageBySlug, getPages} from '~/lib/data/pages'

import {Content} from '~/lib/components/mdx'
import {Layout} from '~/lib/components/layout'

import {pageTitle} from '~/lib/functions/page-title'
import {prepareMDX} from '~/lib/functions/prepare-mdx'

export const getStaticProps = async ({params}: GetStaticPropsContext) => {
  if(params?.slug && Array.isArray(params.slug)){
    const page = await getPageBySlug(params.slug, ['slug', 'title', 'content'])
    const source = await prepareMDX(page.content)

    return {
      props: {
        page,
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
    <Content source={source} heading={page.title} />
  </Layout>
}

export default MDXPage