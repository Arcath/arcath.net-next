import {GetStaticPropsContext, NextPage, InferGetStaticPropsType} from 'next'
import Link from 'next/link'

import {getBooks} from '../lib/data/books'
import {getPosts} from '../lib/data/posts'
import {getProjects} from '../lib/data/projects'

import {Layout} from '../lib/components/layout'

import meta from '../_data/meta.json'

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

  return {
    props: {
      posts,
      books,
      projects
    }
  }
}

const IndexPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({posts, books, projects}) => (
  <Layout>
    <div className="grid grid-cols-content prose max-w-none">
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
      <div className="col-start-3">
        <h2>Currently Watching</h2>
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