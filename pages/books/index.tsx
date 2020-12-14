import {GetStaticPropsContext, NextPage, InferGetStaticPropsType} from 'next'
import Link from 'next/link'
import Head from 'next/head'
import {asyncMap} from '@arcath/utils'

import {getBooks} from '~/lib/data/books'

import {Layout} from '~/lib/components/layout'
import {MDX} from '~/lib/components/mdx'

import {pageTitle} from '~/lib/functions/page-title'
import {prepareMDX} from '~/lib/functions/prepare-mdx'

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const books = await getBooks(['title', 'href', 'cover', 'content', 'link'], {limit: false})

  const booksWithSource = await asyncMap(books, async(book) => {
    const source = await prepareMDX(book.content)

    return {...book, source}
  })

  return {
    props: {
      books: booksWithSource
    }
  }
}

const BooksPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({books}) => {
  return <Layout>
    <Head>
      <title>{pageTitle('Books')}</title>
    </Head>
    <div className="grid grid-cols-content prose dark:prose-dark max-w-none">
      {books.map(({title, href, cover, source, link}, i) => {
        return <div key={href} className="col-start-2 col-end-5 grid grid-cols-3 gap-4">
          {i % 2 === 0 ? <div>
            <img src={cover} alt={title} />
          </div> : ""}
          <div className="col-span-2" >
            <Link href={href}><h3>{title}</h3></Link>
            <MDX source={source} />
          </div>
          {i % 2 === 0 ? "" : <div>
            <img src={cover} alt={title} />
          </div>}
          <div className="col-start-2">
            <a href={link}>Buy on Amazon</a>
          </div>
        </div>
      })}
    </div>
  </Layout>
}

export default BooksPage