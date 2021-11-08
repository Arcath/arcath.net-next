import {NextApiHandler} from 'next'

import {getPosts} from '../../../lib/data/posts'

const allPostsHandler: NextApiHandler = async (req, res) => {
  const posts = await getPosts({limit: false})

  res.status(200).json(posts)
}

export default allPostsHandler
