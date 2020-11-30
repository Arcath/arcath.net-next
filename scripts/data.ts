import fs from 'fs'
import path from 'path'
import {createCanvas} from 'canvas'
import {asyncForEach} from '@arcath/utils'

import {getPosts, Post} from '../lib/data/posts'

const POST_FIELDS: (keyof Post)[] = ['title', 'href', 'year', 'month', 'day', 'lead']

const {writeFile, mkdir} = fs.promises

const SOCIAL_IMAGES_PATH = path.join(process.cwd(), 'public', 'img', 'social')

const WIDTH = 1280
const HEIGHT = 640

const main = async () => {
  const posts = await getPosts(POST_FIELDS, {limit: false})

  await writeFile(path.join(process.cwd(), 'pages', '_data', 'posts', 'data.json'), JSON.stringify(posts))

  asyncForEach(posts, async (post) => {
    const canvas = createCanvas(WIDTH, HEIGHT)
    const context = canvas.getContext('2d')

    context.fillStyle = '#fff'
    context.fillRect(0, 0, WIDTH, HEIGHT)

    context.rotate(25)
    
    const grd = context.createLinearGradient(0, 0, WIDTH, HEIGHT *0.75)
    grd.addColorStop(0, 'rgb(104, 109, 224)')
    grd.addColorStop(1, 'rgb(72, 52, 212)')

    context.fillStyle = grd

    context.fillRect(-100,0,WIDTH + 200, HEIGHT * 0.75)

    context.rotate(-25)

    const buffer = canvas.toBuffer()

    await mkdir(path.join(SOCIAL_IMAGES_PATH, post.href), {recursive: true})
    await writeFile(path.join(SOCIAL_IMAGES_PATH, post.href, 'social.jpg'), buffer)
  })
}

main()