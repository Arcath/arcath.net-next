import React from 'react'
import {
  GetStaticPropsContext,
  NextPage,
  GetStaticPaths,
  InferGetStaticPropsType
} from 'next'
import {pick} from '@arcath/utils/lib/functions/pick'

import {getBooks, getBookFromSlug} from '~/lib/data/books'

import {MDX} from '~/lib/components/mdx'
import {Layout} from '~/lib/components/layout'
import {OpenGraph} from '~/lib/components/open-graph'

export const getStaticProps = async ({
  params
}: GetStaticPropsContext<{slug: string}>) => {
  if (params.slug) {
    const book = getBookFromSlug(params.slug)

    const source = await book.bundle

    return {
      props: {
        book: pick(await book.data, ['slug', 'title']),
        source
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const books = await getBooks({limit: false})

  const paths = books.map(({properties}) => {
    return {params: {slug: properties.slug}}
  })

  return {
    paths,
    fallback: false
  }
}

const MDXBook: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  book,
  source
}) => {
  return (
    <Layout>
      <h1>{book.title}</h1>
      <OpenGraph title={book.title} description={book.title} />
      <MDX source={source} />
    </Layout>
  )
}

export default MDXBook
