import {GetStaticPropsContext, NextPage, InferGetStaticPropsType} from 'next'
import Link from 'next/link'

import {getBooks} from '~/lib/data/books'

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const posts = await getBooks(['title', 'href'], {limit: false})

  return {
    props: {
      posts
    }
  }
}