import {GetStaticPropsContext, NextPage, GetStaticPaths, InferGetStaticPropsType} from 'next'
import Head from 'next/head'

import {getPostBySlug, getPosts} from '~/lib/data/posts'

import {Content} from '~/lib/components/mdx'
import {Layout} from '~/lib/components/layout'
import {OpenGraph} from '~/lib/components/open-graph'

import {pageTitle} from '~/lib/functions/page-title'
import {prepareMDX} from '~/lib/functions/prepare-mdx'

import meta from '~/data/meta.json'

export const getStaticProps = async ({params}: GetStaticPropsContext) => {
  if(params?.slug && params.year && params.month){
    const post = await getPostBySlug([params.year as string, params.month as string, params.slug as string], ['slug', 'title', 'content', 'lead', 'href'])
    const source = await prepareMDX(post.content)

    return {
      props: {
        post,
        source
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts(['slug', 'year', 'month'], {limit: false})

  const paths = posts.map(({slug, year, month}) => {
    return {params: {slug: slug.pop(), year, month}}
  })

  return {
    paths,
    fallback: false
  }
}

const MDXPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({post, source}) => {
  return <Layout>
    <Head>
      <title>{pageTitle(post.title)}</title>
    </Head>
    <OpenGraph title={post.title} description={post.lead} image={`${meta.productionUrl}/img/social${post.href}/social.jpg`} />
    <Content source={source} heading={post.title} />
  </Layout>
}

export default MDXPage