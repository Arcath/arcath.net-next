import {useState, useEffect} from 'react'
import {GetStaticPropsContext, NextPage, InferGetStaticPropsType} from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import Youtube from 'react-youtube'
import {asyncMap} from '@arcath/utils'
import {useInView} from 'react-intersection-observer'

import {getBooks} from '~/lib/data/books'
import {getPosts} from '~/lib/data/posts'
import {getProjects} from '~/lib/data/projects'
import {getVideos} from '~/lib/data/videos'

import {Layout} from '~/lib/components/layout'
import {MDX} from '~/lib/components/mdx'
import {PostDate} from '~/lib/components/post-date'
import {OpenGraph} from '~/lib/components/open-graph'

import {prepareMDX} from '~/lib/functions/prepare-mdx'

import meta from '~/data/meta.json'

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const posts = await getPosts(['slug', 'title', 'href', 'year', 'month', 'day', 'lead'])
  let books = await getBooks(['title', 'href', 'cover', 'content'], {limit: 2})
  const projects = await getProjects(['title', 'href', 'year'], {order: 'DESC'})
  let videos = await getVideos(['title', 'videoId', 'href', 'source', 'sourceAddress', 'content'], {limit: 1})

  videos = await asyncMap(videos, async (video) => {
    const content = await prepareMDX(video.content) as any

    return {
      ...video,
      content
    }
  })

  books = await asyncMap(books, async (book) => {
    const content = await prepareMDX(book.content) as any

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

const IndexPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({posts, books, projects, videos}) => {
  const {ref: inViewRef, inView} = useInView()
  const [videoOpen, setVideoOpen] = useState(false)

  useEffect(() => {
    if(!videoOpen && inView){
      setVideoOpen(true)
    }
  }, [videoOpen, setVideoOpen, inView])

  return <Layout>
    <Head>
      <title>{meta.name} / {meta.description}</title>
    </Head>
    <OpenGraph title={meta.name} description={meta.description} />
    <div className="grid grid-cols-content prose dark:prose-dark max-w-none">
      <h2 className="col-start-3">{meta.name}</h2>
      <div className="col-start-3">
        <div className="mx-auto" style={{width: '300px'}}>
          <Image className="rounded-full mx-auto w-full" src="/img/profile.jpg" width={300} height={300} alt={meta.name} />
        </div>
      </div>
      <p className="col-start-3">{meta.description}</p>
      <h2 className="col-start-3">Recent Posts</h2>
      {posts.map(({title, href, day, month, year, lead}) => {
        return [
          <div key={`${href}-meta`} className="col-start-3 md:col-start-2">
            <PostDate year={year} month={month} day={day} />
          </div>,
          <div key={`${href}-data`} className="col-start-3">
            <h3 style={{marginTop: '0', cursor: 'pointer'}}>
              <Link href={href}>
                <a>{title}</a>
              </Link>
            </h3>
            <p>{lead}</p>
          </div>
        ]
      })}
      <div className="col-start-3"><Link href="/posts">More...</Link></div>
      <h2 className="col-start-3">Currently Watching</h2>
      {videos.map(({title, videoId, content}) => {
        return [
          <h3 className="col-start-3" ref={inViewRef}>{title}</h3>,
          videoOpen ? <Youtube videoId={videoId} className="w-full min-h-1/2" containerClassName="col-start-2 col-end-5" /> : <div className="w-full min-h-1/2" />,
          <div className="col-start-3">
            <MDX source={content} />
          </div>
        ]
      })}
      <h2 className="col-start-3">Currently Reading</h2>
      {books.map(({href, title, cover, content}) => {
        return [
          <div key={`${href}-img`} className="col-start-3 m-auto md:col-start-2 pr-2 relative">
            <Image src={cover} alt={title} className="mr-2 w-full h-full" width={200} height={300} />
          </div>,
          <div key={`${href}-link`} className="col-start-3">
            <h3>
              <Link href={href}>
                <a>{title}</a>
              </Link>
            </h3>
            <MDX source={content} />
          </div>
        ]
      })}
      <div className="col-start-3"><Link href="/books">More...</Link></div>
      <h2 className="col-start-3">Featured Projects</h2>
      {projects.map(({href, title, year}) => {
        return <h3 key={href} className="col-start-3">
          <Link href={href}>
            <a>{title}</a>
          </Link> ({year})
        </h3>
      })}
      <Link href="/projects" >
        <a className="col-start-3">More...</a>
      </Link>
    </div>
  </Layout>
}

export default IndexPage