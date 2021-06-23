import path from 'path'
import {bundleMDX} from 'mdx-bundler'
import {remarkMdxImages} from 'remark-mdx-images'
import gfm from 'remark-gfm'

export const prepareMDX = async (
  source: string,
  options: {
    files?: Record<string, string>
    directory?: string
    imagesUrl?: string
  }
) => {
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'esbuild.exe'
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'bin',
      'esbuild'
    )
  }

  const {directory, imagesUrl} = options

  const {code} = await bundleMDX(source, {
    cwd: directory,
    xdmOptions: options => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        //remarkHighlight,
        gfm,
        remarkMdxImages
      ]

      return options
    },
    esbuildOptions: options => {
      options.outdir = path.join(process.cwd(), 'public', imagesUrl)
      options.loader = {
        ...options.loader,
        '.png': 'file',
        '.jpg': 'file',
        '.gif': 'file'
      }
      options.publicPath = imagesUrl
      options.write = true

      return options
    }
  })

  return code
}
