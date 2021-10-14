import path from 'path'
import {remarkMdxImages} from 'remark-mdx-images'

const getRehypeMdxCodeMeta = async () => {
  const {visit} = await import('unist-util-visit')

  return (options = {}) => {
    return tree => {
      visit(tree, 'element', visitor)
    }

    function visitor(node, index, parentNode) {
      if (node.tagName === 'code' && node.data && node.data.meta) {
        const blocks = node.data.meta.split(' ') as string[]

        node.properties = blocks.reduce((props, block) => {
          const [prop, value] = block.split('=')

          if (typeof value === 'undefined') {
            props.line = prop

            return props
          }

          props[prop] = value

          return props
        }, node.properties)
      }
    }
  }
}

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
      'esbuild-windows-64',
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

  const {bundleMDX} = await import('mdx-bundler')

  const {directory, imagesUrl} = options

  const gfm = (await import('remark-gfm')) as any

  const rehypeMdxCodeMeta = await getRehypeMdxCodeMeta()

  const {code, errors} = await bundleMDX(source, {
    cwd: directory,
    xdmOptions: options => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        gfm,
        remarkMdxImages
      ]

      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeMdxCodeMeta
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

  if (errors.length > 0) {
    console.dir(errors.map(({detail}) => detail))
  }

  return code
}
