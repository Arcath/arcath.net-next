import {GetStaticPropsContext, NextPage, GetStaticPaths, InferGetStaticPropsType} from 'next'
import Link from 'next/link'
import Head from 'next/head'

import {getPostBySlug, getPosts} from '~/lib/data/posts'

import {ContentContainer, MDX} from '~/lib/components/mdx'
import {Layout} from '~/lib/components/layout'
import {OpenGraph} from '~/lib/components/open-graph'
import {MONTH_FROM_STRING} from '~/lib/components/post-date'

import {pageTitle} from '~/lib/functions/page-title'
import {prepareMDX} from '~/lib/functions/prepare-mdx'
import {tagHref} from '~/lib/functions/tag-href'

import meta from '~/data/meta.json'

export const getStaticProps = async ({params}: GetStaticPropsContext) => {
  if(params?.slug && params.year && params.month){
    const post = await getPostBySlug([params.year as string, params.month as string, params.slug as string], ['slug', 'title', 'content', 'lead', 'href', 'tags', 'year', 'month', 'day'])
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
    <ContentContainer>
      <aside className="col-start-2 col-end-3 row-start-1 row-span-3">
      <div className="w-32 text-center mb-8 float-right">
          <div className="text-3xl">{post.day}</div>
          <div className="mt-0">{MONTH_FROM_STRING[post.month]}</div>
          <div>{post.year}</div>
          {post.tags.map((tag) => {
            return <Link key={tag} href={tagHref(tag)}>
              <a className="block my-2">{tag}</a>
            </Link>
          })}
        </div>
      </aside>
      <h1 className="mb-0 col-start-3">{post.title}</h1>
      <MDX source={source} />
    </ContentContainer>
  </Layout>
}

export default MDXPage