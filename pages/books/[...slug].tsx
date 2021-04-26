import React from 'react'
import {GetStaticPropsContext, NextPage, GetStaticPaths, InferGetStaticPropsType} from 'next'
import {pick} from '@arcath/utils'

import {getBooks, getBookBySlug} from '~/lib/data/books'

import {MDX} from '~/lib/components/mdx'
import {Layout} from '~/lib/components/layout'
import {OpenGraph} from '~/lib/components/open-graph'
import {getComponents} from '~/lib/data/component'

import {prepareMDX} from '../../lib/functions/prepare-mdx'

export const getStaticProps = async ({params}: GetStaticPropsContext) => {
  if(params?.slug && Array.isArray(params.slug)){
    const book = await getBookBySlug(['books', ...params.slug], ['slug', 'title', 'content', 'directory'])

    const components = await getComponents(book.directory)

    const source = await prepareMDX(book.content, {
      files: components,
      directory: book.directory,
      imagesUrl: `/img/books/${params.slug.join('/')}/`
    })

    return {
      props: {
        book: pick(book, ['slug', 'title']),
        source
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const books = await getBooks(['slug'], {limit: false})

  const paths = books.map(({slug}) => {
    return {params: {slug: [slug[1]]}}
  })

  return {
    paths,
    fallback: false
  }
}

const MDXBook: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({book, source}) => {
  return <Layout>
    <h1>{book.title}</h1>
    <OpenGraph title={book.title} description={book.title} />
    <MDX source={source} />
  </Layout>
}

export default MDXBook