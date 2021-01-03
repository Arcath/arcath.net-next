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
import {PostDate} from '~/lib/components/post-date'

import {prepareMDX} from '~/lib/functions/prepare-mdx'

import meta from '~/data/meta.json'

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const posts = await getPosts(['slug', 'title', 'href', 'year', 'month', 'day', 'lead'])
  let books = await getBooks(['title', 'href', 'cover', 'content'], {limit: 2})
  const projects = await getProjects(['title', 'href'], {order: 'DESC'})
  let videos = await getVideos(['title', 'videoId', 'href', 'source', 'sourceAddress', 'content'], {limit: 1})

  videos = await asyncMap(videos, async (video) => {
    const content = await prepareMDX(video.content)

    return {
      ...video,
      content
    }
  })

  books = await asyncMap(books, async (book) => {
    const content = await prepareMDX(book.content)

    return {
      ...book,
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
          <div key={`${href}-meta`} className="col-start-3 md:col-start-2">
            <PostDate year={year} month={month} day={day} />
          </div>,
          <div key={`${href}-data`} className="col-start-3">
            <Link href={href}><h3 style={{marginTop: '0', cursor: 'pointer'}}><a>{title}</a></h3></Link>
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
      {books.map(({href, title, cover, content}) => {
        return [
          <div key={`${href}-img`} className="col-start-3 m-auto md:col-start-2 pr-2">
            <img src={cover} alt={title} className="mr-2" />
          </div>,
          <div key={`${href}-link`} className="col-start-3">
            <Link href={href}>
              <h3><a>{title}</a></h3>
            </Link>
            <MDX source={content} />
          </div>
        ]
      })}
      <div className="col-start-3"><Link href="/books">More...</Link></div>
      <div className="col-start-3">
        <h2>Featured Projects</h2>
        {projects.map(({href, title}) => {
          return <div key={href}>
            <Link href={href}>{title}</Link>
          </div>
        })}
        <Link href="/projects">
          <a>More...</a>
        </Link>
      </div>
    </div>
  </Layout>
)

export default IndexPage