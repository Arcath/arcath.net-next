import React from 'react'

import hydrate from 'next-mdx-remote/hydrate'

import {CONTENT_COMPONENTS} from '../../_content/components'

export const components = {
  ...CONTENT_COMPONENTS
}

export const MDX: React.FC<{source: string}> = ({source}) => {
  return <>
    {hydrate(source, {components})}
  </>
}