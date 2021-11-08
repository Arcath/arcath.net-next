import {NextApiHandler} from 'next'
import {Octokit} from 'octokit'
import {asyncMap} from '@arcath/utils/lib/functions/async-map'
import matter from 'gray-matter'

const allPostsHandler: NextApiHandler = async (req, res) => {
  const octokit = new Octokit({
    auth: process.env.GH_TOKEN
  })

  const main = await octokit.request(
    'GET /repos/{owner}/{repo}/branches/{branch}',
    {owner: 'arcath', repo: 'arcath.net-next', branch: 'main'}
  )

  const tree_sha = main.data.commit.sha

  const tree = await octokit.request(
    'GET /repos/{owner}/{repo}/git/trees/{tree_sha}',
    {
      owner: 'arcath',
      repo: 'arcath.net-next',
      tree_sha,
      recursive: 'true'
    }
  )

  const files = tree.data.tree

  const postFiles = files.reduce((posts, file) => {
    if (file.path.match('_content/posts/.*/index.mdx')) {
      posts.push(file)
    }

    return posts
  }, [])

  const posts = await asyncMap(postFiles, async postFile => {
    const postContent = await octokit.request(
      'GET /repos/{owner}/{repo}/git/blobs/{file_sha}',
      {
        owner: 'arcath',
        repo: 'arcath.net-next',
        file_sha: postFile.sha
      }
    )

    const content = Buffer.from(postContent.data.content, 'base64').toString(
      'utf8'
    )

    const {data} = matter(content)

    return data
  })

  res.status(200).json(posts)
}

export default allPostsHandler
