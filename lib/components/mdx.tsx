import React from 'react'
import Image from 'next/image'

import hydrate from 'next-mdx-remote/hydrate'

import {CONTENT_COMPONENTS} from '../../_content/components'

const Img: React.FC<any> = (props) => {
  return <Image {...props} layout="fill" />
}

export const components = {
  ...CONTENT_COMPONENTS,
  img: Img
}

export const MDX: React.FC<{source: string}> = ({source}) => {
  return <>
    {hydrate(source, {components})}
  </>
}

export const Content: React.FC<{source: string, heading: string}> = ({source, heading}) => {
  return <div className="grid grid-cols-content content-positioning prose max-w-none">
    <h1>{heading}</h1>
    <MDX source={source} />
  </div>
}