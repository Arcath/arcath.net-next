import fs from 'fs'
import path from 'path'

import {getPosts, Post} from '../lib/data/posts'

const POST_FIELDS: (keyof Post)[] = ['title', 'href', 'year', 'month', 'day', 'lead']

const {writeFile} = fs.promises

const main = async () => {
  const posts = await getPosts(POST_FIELDS, {limit: false})

  await writeFile(path.join(process.cwd(), 'pages', '_data', 'posts', 'data.json'), JSON.stringify(posts))
}

main()