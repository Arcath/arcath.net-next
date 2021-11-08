import fs from 'fs'
import path from 'path'
import {createCanvas, registerFont, loadImage} from 'canvas'
import {asyncForEach} from '@arcath/utils'

import {getPosts} from '../lib/data/posts'

import {formatAsDate} from '../lib/functions/format'

import meta from '../_data/meta.json'

const {writeFile, mkdir} = fs.promises

const SOCIAL_IMAGES_PATH = path.join(process.cwd(), 'public', 'img', 'social')

const WIDTH = 1280
const HEIGHT = 640

const main = async () => {
  const posts = await getPosts({limit: false})

  registerFont(
    path.join(process.cwd(), 'fonts', 'montserrat-latin-300-normal.ttf'),
    {family: 'Montserrat'}
  )

  asyncForEach(
    posts,
    async post => {
      const {title, date, href} = await post.data

      const canvas = createCanvas(WIDTH, HEIGHT)
      const context = canvas.getContext('2d')

      context.fillStyle = '#fff'
      context.fillRect(0, 0, WIDTH, HEIGHT)

      context.rotate(25)

      const grd = context.createLinearGradient(0, 0, WIDTH, HEIGHT * 0.75)
      grd.addColorStop(0, 'rgb(104, 109, 224)')
      grd.addColorStop(1, 'rgb(72, 52, 212)')

      context.fillStyle = grd

      context.fillRect(-100, 0, WIDTH + 200, HEIGHT * 0.75)

      context.rotate(-25)

      context.font = '50pt Montserrat'
      context.textAlign = 'left'
      context.fillStyle = '#fff'
      context.textBaseline = 'top'

      const lines: string[] = []
      const words = title.split(' ')
      let line: string[] = []
      while (words.length !== 0) {
        const nextLine = [...line, words[0]].join(' ')

        if (context.measureText(nextLine).width > WIDTH - 60) {
          lines.push(line.join(' '))
          line = []
        } else {
          line = [...line, words.shift()]

          if (words.length === 0) {
            lines.push(line.join(' '))
          }
        }
      }

      let cursor = 10

      lines.forEach(line => {
        context.fillText(line, 30, cursor)
        cursor += 80
      })

      cursor += 10

      context.font = '20pt Montserrat'
      context.fillText(formatAsDate(new Date(date)), 40, cursor)

      context.font = '25pt Montserrat'
      context.textBaseline = 'bottom'
      context.textAlign = 'right'
      context.fillStyle = '#000'
      context.fillText(meta.name, WIDTH - 40, HEIGHT - 10)

      const profile = await loadImage(
        path.join(process.cwd(), 'public', 'img', 'profile.jpg')
      )

      context.beginPath()
      context.moveTo(WIDTH - 305, HEIGHT - 55)
      context.arc(WIDTH - 315, HEIGHT - 30, 25, 0, 6.28)
      context.clip()

      context.drawImage(profile, WIDTH - 340, HEIGHT - 55, 50, 50)

      const buffer = canvas.toBuffer()

      await mkdir(path.join(SOCIAL_IMAGES_PATH, href), {recursive: true})
      await writeFile(path.join(SOCIAL_IMAGES_PATH, href, 'social.jpg'), buffer)
    },
    {inSequence: false}
  )

  const canvas = createCanvas(WIDTH, HEIGHT)
  const context = canvas.getContext('2d')

  context.fillStyle = '#fff'
  context.fillRect(0, 0, WIDTH, HEIGHT)

  context.rotate(25)

  const grd = context.createLinearGradient(0, 0, WIDTH, HEIGHT * 0.75)
  grd.addColorStop(0, 'rgb(104, 109, 224)')
  grd.addColorStop(1, 'rgb(72, 52, 212)')

  context.fillStyle = grd

  context.fillRect(-100, 0, WIDTH + 200, HEIGHT * 0.75)

  context.rotate(-25)

  context.font = '50pt Montserrat'
  context.textAlign = 'left'
  context.fillStyle = '#fff'
  context.textBaseline = 'top'

  const lines: string[] = []
  const words = meta.name.split(' ')
  let line: string[] = []
  while (words.length !== 0) {
    const nextLine = [...line, words[0]].join(' ')

    if (context.measureText(nextLine).width > WIDTH - 60) {
      lines.push(line.join(' '))
      line = []
    } else {
      line = [...line, words.shift()]

      if (words.length === 0) {
        lines.push(line.join(' '))
      }
    }
  }

  let cursor = 10

  lines.forEach(line => {
    context.fillText(line, 30, cursor)
    cursor += 80
  })

  cursor += 10

  context.font = '20pt Montserrat'
  context.fillText(meta.description, 30, cursor)

  const profile = await loadImage(
    path.join(process.cwd(), 'public', 'img', 'profile.jpg')
  )

  context.beginPath()
  context.moveTo(WIDTH - 405, HEIGHT - 405)
  context.arc(WIDTH - 280, HEIGHT - 210, 200, 0, 6.28)
  context.clip()

  context.drawImage(profile, WIDTH - 505, HEIGHT - 415, 450, 450)

  const buffer = canvas.toBuffer()
  await mkdir(path.join(SOCIAL_IMAGES_PATH), {recursive: true})
  await writeFile(path.join(SOCIAL_IMAGES_PATH, 'social.jpg'), buffer)
}

main()
