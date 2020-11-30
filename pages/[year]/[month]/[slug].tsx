import {GetStaticPropsContext, NextPage, GetStaticPaths, InferGetStaticPropsType} from 'next'
import Head from 'next/head'

import {getPostBySlug, getPosts} from '~/lib/data/posts'

import {Content} from '~/lib/components/mdx'
import {Layout} from '~/lib/components/layout'

import {pageTitle} from '~/lib/functions/page-title'
import {prepareMDX} from '~/lib/functions/prepare-mdx'

export const getStaticProps = async ({params}: GetStaticPropsContext) => {
  if(params?.slug && params.year && params.month){
    const post = await getPostBySlug([params.year as string, params.month as string, params.slug as string], ['slug', 'title', 'content'])
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
    <Content source={source} heading={post.title} />
  </Layout>
}

export default MDXPage