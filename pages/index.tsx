import {GetStaticPropsContext, NextPage, InferGetStaticPropsType} from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Youtube from 'react-youtube'
import {asyncMap} from '@arcath/utils'

import {getBooks} from '~/lib/data/books'
import {getPosts} from '~/lib/data/posts'
import {getProjects} from '~/lib/data/projects'
import {getVideos} from '~/lib/data/videos'

import {Layout} from '~/lib/components/layout'
import {MDX} from '~/lib/components/mdx'

import {prepareMDX} from '~/lib/functions/prepare-mdx'

import meta from '~/data/meta.json'

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

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const posts = await getPosts(['slug', 'title', 'href', 'year', 'month', 'day', 'lead'])
  const books = await getBooks(['title', 'href'])
  const projects = await getProjects(['title', 'href'], {order: 'DESC'})
  let videos = await getVideos(['title', 'videoId', 'href', 'source', 'sourceAddress', 'content'], {limit: 1})

  videos = await asyncMap(videos, async (video) => {
    const content = await prepareMDX(video.content)

    return {
      ...video,
      content
    }
  })

  return {
    props: {
      posts,
      books,
      projects,
      videos
    }
  }
}

const IndexPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({posts, books, projects, videos}) => (
  <Layout>
    <Head>
      <title>{meta.name} / {meta.description}</title>
    </Head>
    <div className="grid grid-cols-content prose dark:prose-dark max-w-none">
      <h2 className="col-start-3">Recent Posts</h2>
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
      <div className="col-start-3"><Link href="/posts">More...</Link></div>
      <h2 className="col-start-3">Currently Watching</h2>
      {videos.map(({title, videoId, content}) => {
        return [
          <h3 className="col-start-3">{title}</h3>,
          <Youtube videoId={videoId} className="w-full min-h-1/2" containerClassName="col-start-2 col-end-5" />,
          <div className="col-start-3">
            <MDX source={content} />
          </div>
        ]
      })}
      <h2 className="col-start-3">Currently Reading</h2>
      {books.map(({href, title}, i) => {
        return <div key={href} className="col-start-3">
          <Link href={href}>{title}</Link>
        </div>
      })}
      <div className="col-start-3"><Link href="/books">More...</Link></div>
      <div className="col-start-3">
        <h2>Currently Playing</h2>
        <h2>Currently Reading</h2>
        {books.map(({href, title}) => {
          return <div key={href}>
            <Link href={href}>{title}</Link>
          </div>
        })}
        <h2>Featured Projects</h2>
        {projects.map(({href, title}) => {
          return <div key={href}>
            <Link href={href}>{title}</Link>
          </div>
        })}
      </div>
    </div>
  </Layout>
)

export default IndexPage