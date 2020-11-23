import renderToString from 'next-mdx-remote/render-to-string'

import {components} from '../components/mdx'

export const prepareMDX = async (source: string) => {
  const mdx = await renderToString(source, {components})

  return mdx
}