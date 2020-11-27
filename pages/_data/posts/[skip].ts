import {GetServerSidePropsContext} from 'next'

import data from './data.json'

export async function getServerSideProps({res, params}: GetServerSidePropsContext<{skip: string}>){
  const {skip} = params

  const posts = data.slice(parseInt(skip), parseInt(skip) + 5)

  res.end(JSON.stringify(posts))
  return {props: {}}
}

export default function NullPage() {
  return 'null'
}