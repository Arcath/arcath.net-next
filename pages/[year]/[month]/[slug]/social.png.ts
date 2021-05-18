import {GetServerSidePropsContext} from 'next'
import {createCanvas, registerFont, loadImage} from 'canvas'
import path from 'path'

const WIDTH = 1280
const HEIGHT = 640

import {getPostBySlug} from '~/lib/data/posts'
import {formatAsDate} from '~/lib/functions/format'
import meta from '~/data/meta.json'

export async function getServerSideProps({res, params}: GetServerSidePropsContext<{year: string, month: string, slug: string}>){
  const {year, month, slug} = params

  if(params?.slug && params.year && params.month){
    registerFont(path.join(process.cwd(), 'fonts', 'montserrat-latin-300-normal.ttf'), {family: 'Montserrat'})


    const post = await getPostBySlug([year, month, slug], ['slug', 'title', 'date'])
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

    context.font = '50pt Montserrat'
    context.textAlign = 'left'
    context.fillStyle = '#fff'
    context.textBaseline = 'top'

    const lines: string[] = []
    const words = post.title.split(' ')
    let line: string[] = []
    while(words.length !== 0){
      const nextLine = [...line, words[0]].join(' ')

      if(context.measureText(nextLine).width > (WIDTH - 60)){
        lines.push(line.join(' '))
        line = []
      }else{
        line = [...line, words.shift()]

        if(words.length === 0){
          lines.push(line.join(' '))
        }
      }
    }

    let cursor = 10

    lines.forEach((line) => {
      context.fillText(line, 30, cursor)
      cursor += 80
    })

    cursor += 10

    context.font = '20pt Montserrat'
    context.fillText(formatAsDate(new Date(post.date)), 40, cursor)

    context.font = '25pt Montserrat'
    context.textBaseline = 'bottom'
    context.textAlign = 'right'
    context.fillStyle = '#000'
    context.fillText(meta.name, WIDTH - 40, HEIGHT - 10)

    const profile = await loadImage(path.join(process.cwd(), 'public', 'img', 'profile.jpg'))

    context.beginPath()
    context.moveTo(WIDTH - 305, HEIGHT - 55)
    context.arc(WIDTH - 315, HEIGHT - 30, 25, 0, 6.28)
    context.clip()

    context.drawImage(profile, WIDTH - 340, HEIGHT - 55, 50, 50)

    const buffer = canvas.toBuffer()

    res.end(buffer)
  }
  return {props: {}}
}

export default function NullPage() {
  return 'null'
}