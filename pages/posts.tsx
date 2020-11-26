import React, {useState} from 'react'
import {GetStaticPropsContext, NextPage, InferGetStaticPropsType} from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import {ArrayElement} from '@arcath/utils'

import {getPosts, Post} from '../lib/data/posts'

import {Layout} from '../lib/components/layout'

const MONTH_FROM_STRING = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December'
}

export const POST_FIELDS: (keyof Post)[] = ['slug', 'title', 'href', 'year', 'month', 'day', 'lead']

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const posts = await getPosts(POST_FIELDS)

  return {
    props: {
      posts
    }
  }
}

const fetcher = (resource, init) => fetch(resource, init).then(res => res.json())

const PostsBlock: React.FC<{i: number}> = ({i}) => {
  const {data: posts} = useSWR(`/_data/posts/${i * 5}.json`, fetcher)

  if(!posts){
    return <>Loading...</>
  }

  return <>
    {posts.map(({title, href, day, month, year, lead}) => {
      return [
        <div key={`${href}-meta`} className="col-start-2 grid grid-cols-2 gap-2">
          <div className="text-3xl text-center col-span-2">{day}</div>
          <div className="text-right">{MONTH_FROM_STRING[month]}</div>
          <div className="">{year}</div>
        </div>,
        <div key={`${href}-data`} className="col-start-3">
          <Link href={href}><h3 style={{marginTop: '0'}}>{title}</h3></Link>
          <p>{lead}</p>
        </div>
      ]
    })}
  </>
}

const PostsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = () => {
  const [page, setPage] = useState(0)
  
  const pages = []
  for(let i = 0; i <= page; i++){
    pages.push(<PostsBlock key={i} i={i} />)
  }

  return <Layout>
    <div className="grid grid-cols-content prose dark:prose-dark max-w-none">
      <h2 className="col-start-3">Recent Posts</h2>
      {pages}
      <button onClick={() => {
        setPage(page + 1)
      }}>Load More</button>
    </div>
  </Layout>
}

export default PostsPage