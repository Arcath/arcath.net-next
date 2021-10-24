import React from 'react'
import {
  GetStaticPropsContext,
  NextPage,
  GetStaticPaths,
  InferGetStaticPropsType
} from 'next'
import {pick} from '@arcath/utils/lib/functions/pick'
import Image from 'next/image'
import {OutboundLink} from 'react-ga'

import {getBooks, getBookFromSlug} from '~/lib/data/books'

import {MDX, ContentContainer} from '~/lib/components/mdx'
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
        book: pick(await book.data, ['slug', 'title', 'cover', 'link']),
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
      <OpenGraph title={book.title} description={book.title} />
      <ContentContainer>
        <h1 className="mb-0 col-start-3">{book.title}</h1>
        <div className="text-center">
          <Image src={book.cover} alt={book.title} width={325} height={499} />
        </div>
        <MDX source={source} />
        <p>
          <OutboundLink eventLabel="Amazon link click" to={book.link}>
            Buy on Amazon
          </OutboundLink>
        </p>
      </ContentContainer>
    </Layout>
  )
}

export default MDXBook
