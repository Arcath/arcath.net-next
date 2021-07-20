import React, {useState, useEffect} from 'react'
import {GetStaticPropsContext, NextPage, InferGetStaticPropsType} from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import Youtube from 'react-youtube'
import {useInView} from 'react-intersection-observer'
import {replaceProperty} from '@arcath/utils/lib/functions/replace-property'
import {asyncMap} from '@arcath/utils/lib/functions/async-map'
import {pick} from '@arcath/utils/lib/functions/pick'

import {getBooks} from '~/lib/data/books'
import {getPosts} from '~/lib/data/posts'
import {getProjects} from '~/lib/data/projects'
import {getVideos} from '~/lib/data/videos'

import {Layout} from '~/lib/components/layout'
import {MDX} from '~/lib/components/mdx'
import {PostDate} from '~/lib/components/post-date'
import {OpenGraph} from '~/lib/components/open-graph'

import meta from '~/data/meta.json'

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const posts = await asyncMap(await getPosts(), async post => {
    return replaceProperty(
      pick(await post.data, [
        'slug',
        'title',
        'href',
        'year',
        'month',
        'date',
        'lead'
      ]),
      'date',
      date => date.toISOString()
    )
  })
  const books = await asyncMap(await getBooks({limit: 2}), async book => {
    const data = pick(await book.data, [
      'title',
      'href',
      'cover',
      'content',
      'slug'
    ])
    const content = await book.bundle

    return {...data, content}
  })
  const projects = await asyncMap(
    await getProjects({order: 'DESC'}),
    async project => {
      return pick(await project.data, ['title', 'href', 'year'])
    }
  )
  const videos = await asyncMap(await getVideos({limit: 1}), async video => {
    const data = pick(await video.data, [
      'title',
      'videoId',
      'href',
      'source',
      'sourceAddress',
      'content',
      'directory',
      'slug'
    ])

    const content = await video.bundle

    return {...data, content}
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

const IndexPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
  books,
  projects,
  videos
}) => {
  const {ref: inViewRef, inView} = useInView()
  const [videoOpen, setVideoOpen] = useState(false)

  useEffect(() => {
    if (!videoOpen && inView) {
      setVideoOpen(true)
    }
  }, [videoOpen, setVideoOpen, inView])

  return (
    <Layout>
      <Head>
        <title>
          {meta.name} / {meta.description}
        </title>
      </Head>
      <OpenGraph title={meta.name} description={meta.description} />
      <div className="grid grid-cols-content prose dark:prose-dark max-w-none">
        <h2 className="col-start-3">{meta.name}</h2>
        <div className="col-start-3">
          <div className="mx-auto" style={{width: '300px'}}>
            <Image
              className="rounded-full mx-auto w-full"
              src="/img/profile.jpg"
              width={300}
              height={300}
              alt={meta.name}
            />
          </div>
        </div>
        <p className="col-start-3">{meta.description}</p>
        <h2 className="col-start-3">Recent Posts</h2>
        {posts.map(({title, href, date, month, year, lead}) => {
          return [
            <div key={`${href}-meta`} className="col-start-3 md:col-start-2">
              <PostDate date={date} />
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
        <div className="col-start-3">
          <Link href="/posts">More...</Link>
        </div>
        <h2 className="col-start-3">Currently Watching</h2>
        {videos.map(({title, videoId, content}) => {
          return [
            <h3 className="col-start-3" ref={inViewRef}>
              {title}
            </h3>,
            videoOpen ? (
              <Youtube
                videoId={videoId}
                className="w-full min-h-1/2"
                containerClassName="col-start-2 col-end-5"
              />
            ) : (
              <div className="w-full min-h-1/2" />
            ),
            <div className="col-start-3">
              <MDX source={content} />
            </div>
          ]
        })}
        <h2 className="col-start-3">Currently Reading</h2>
        {books.map(({href, title, cover, content}) => {
          return [
            <div
              key={`${href}-img`}
              className="col-start-3 m-auto md:col-start-2 pr-2 relative"
            >
              <Image
                src={cover}
                alt={title}
                className="mr-2 w-full h-full"
                width={200}
                height={300}
              />
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
        <div className="col-start-3">
          <Link href="/books">More...</Link>
        </div>
        <h2 className="col-start-3">Featured Projects</h2>
        {projects.map(({href, title, year}) => {
          return (
            <h3 key={href} className="col-start-3">
              <Link href={href}>
                <a>{title}</a>
              </Link>{' '}
              ({year})
            </h3>
          )
        })}
        <Link href="/projects">
          <a className="col-start-3">More...</a>
        </Link>
      </div>
    </Layout>
  )
}

export default IndexPage
