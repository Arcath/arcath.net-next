import {NextPage} from 'next'
import Link from 'next/link'

import {getBooks} from '../lib/data/books'
import {getPosts} from '../lib/data/posts'

import {Layout} from '../lib/components/layout'

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T

import meta from '../_data/meta.json'

export const getStaticProps = async () => {
  const posts = await getPosts(['slug', 'title', 'href'])
  const books = await getBooks(['title', 'href'])

  return {
    props: {
      posts,
      books
    }
  }
}

const IndexPage: NextPage<ThenArg<ReturnType<typeof getStaticProps>>["props"]> = ({posts, books}) => (
  <Layout>
    <div className="grid grid-cols-content">
      <div className="col-start-3">
        <h2>Recent Posts</h2>
        {posts.map(({title, href}) => {
          return <div key={href}>
            <Link href={href}>{title}</Link>
          </div>
        })}
        <h2>Currently Watching</h2>
        <h2>Currently Playing</h2>
        <h2>Currently Reading</h2>
        {books.map(({href, title}) => {
          return <div key={href}>
            <Link href={href}>{title}</Link>
          </div>
        })}
        <h2>Featured Projects</h2>
      </div>
    </div>
  </Layout>
)

export default IndexPage