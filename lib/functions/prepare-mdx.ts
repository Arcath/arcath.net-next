import renderToString from 'next-mdx-remote/render-to-string'

import {components} from '../components/mdx'

export const prepareMDX = async (source: string) => {
  const mdx = await renderToString(source, {
    components,
    mdxOptions: {
      remarkPlugins: [
        require('remark-prism')
      ]
    }
  })

  return mdx
}