import fs from 'fs'
import path from 'path'
import {asyncForEach} from '@arcath/utils'

const {readdir, readFile} = fs.promises

interface Components{[file: string]: string}

export const getComponents = async (directory: string) => {
  const components: Components = {}

  const files = await readdir(directory)

  await asyncForEach(files, async (file) => {
    if(file.substr(-3) === 'tsx'){
      const fileBuffer = await readFile(path.join(directory, file))

      components[`./${file}`] = fileBuffer.toString().trim()
    }
  })

  return components
}