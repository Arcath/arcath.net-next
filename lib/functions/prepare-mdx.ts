import {bundleMDX} from 'mdx-bundler'
import remarkHighlight from 'remark-highlight.js'


export const prepareMDX = async (source: string, files?: Record<string, string>) => {
  const {code} = await bundleMDX(source, {
    files,
    remarkPlugins: [
      remarkHighlight
    ]
  })

  return code
}