import path from 'path'
import {bundleMDX} from 'mdx-bundler'
import remarkHighlight from 'remark-highlight.js'
import {colocateImagesPlugin} from 'remark-plugin-colocate-images'

export const prepareMDX = async (source: string, options: {
  files?: Record<string, string>,
  directory?: string
  imagesUrl?: string
}) => { 
  if(process.platform === "win32"){
    process.env.ESBUILD_BINARY_PATH = path.join(process.cwd(), 'node_modules', 'esbuild', 'esbuild.exe')
  }else{
    process.env.ESBUILD_BINARY_PATH = path.join(process.cwd(), 'node_modules', 'esbuild', 'bin', 'esbuild')
  }

  const {files, directory, imagesUrl} = options

  const {code} = await bundleMDX(source, {
    files,
    xdmOptions: (input, options) => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkHighlight,
        /* Soon™ bundle images with esbuild!
        colocateImagesPlugin({
          handleImage: async (src) => {
            const imgSrc = import(src)

            return imgSrc
          }
        })*/
        colocateImagesPlugin({
          diskRoot: directory,
          urlReplace: imagesUrl ? imagesUrl : '/img/',
          diskReplace: imagesUrl ? path.join(process.cwd(), 'public', imagesUrl) : path.join(process.cwd(), 'public', 'img')
        })
      ]
      
      return options
    }
  })

  return code
}