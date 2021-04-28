import path from 'path'
import {bundleMDX} from 'mdx-bundler'
import remarkHighlight from 'remark-highlight.js'
import {remarkMdxImages} from 'remark-mdx-images'

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

  const {directory, imagesUrl} = options

  const {code} = await bundleMDX(source, {
    cwd: directory,
    xdmOptions: (input, options) => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkHighlight,
        remarkMdxImages
      ]
      
      return options
    },
    esbuildOptions: (options) => {
      // Temp, bundle images as dataurls
      options.outdir = path.join(process.cwd(), 'public', imagesUrl)
      options.loader = {
        ...options.loader,
        '.png': 'dataurl',
        '.jpg': 'dataurl',
        '.gif': 'dataurl'
      }
      options.publicPath = imagesUrl
      //options.write = true as any

      return options
    }
  })

  return code
}