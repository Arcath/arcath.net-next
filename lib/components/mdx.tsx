import React from 'react'
import Image from 'next/image'
import hydrate from 'next-mdx-remote/hydrate'

import {CONTENT_COMPONENTS} from '../../_content/components'

const Img: React.FC<any> = (props) => {
  return <div className="relative w-full">
    <Image {...props} layout="fill" objectFit="none" />
  </div>
}

const Paragraph: React.FC<any> = (props) => {  
  if(props.children.props){
    if(props.children.props.originalType === 'img'){
      return <>{props.children}</>
    }
  }

  return <p {...props} />
}

export const components = {
  ...CONTENT_COMPONENTS,
  //img: Img,
  p: Paragraph
}

export const MDX: React.FC<{source: any}> = ({source}) => {
  return <>
    {hydrate(source, {components})}
  </>
}

export const Content: React.FC<{source: any, heading: string}> = ({source, heading}) => {
  return <ContentContainer>
    <h1>{heading}</h1>
    <MDX source={source} />
  </ContentContainer>
}

export const ContentContainer: React.FC = ({children}) => {
  return <div className="grid grid-cols-content content-positioning prose dark:prose-dark max-w-none">{children}</div>
}