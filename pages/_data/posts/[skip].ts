import {GetServerSidePropsContext} from 'next'

import {Post} from '../../../lib/data/posts'

import data from './data.json'

export const POST_FIELDS: (keyof Post)[] = ['title', 'href', 'slug']

export async function getServerSideProps({res, params}: GetServerSidePropsContext<{skip: string}>){
  const {skip} = params

  const posts = data.slice(parseInt(skip), parseInt(skip) + 1)

  res.end(JSON.stringify(posts))
  return {}
}

export default function NullPage() {
  return 'null'
}