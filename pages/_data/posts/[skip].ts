import {GetServerSidePropsContext} from 'next'

import {getPosts} from '../../../lib/data/posts'

export async function getServerSideProps({res, params}: GetServerSidePropsContext<{skip: string}>){
  const {skip} = params

  const posts = await getPosts(['title', 'href'], {limit: 5, skip: parseInt(skip)})

  res.end(JSON.stringify(posts))
  return {}
}

export default function NullPage() {
  return 'null'
}