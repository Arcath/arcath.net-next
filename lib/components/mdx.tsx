import React, {useMemo} from 'react'
import Image from 'next/image'
import {MDXProvider} from '@mdx-js/react'
import {getMDXComponent} from 'mdx-bundler/client'

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
  //img: Img,
  p: Paragraph
}

export const MDX: React.FC<{source: any}> = ({source}) => {
  const Component = useMemo(() => getMDXComponent(source), [source])

  return <MDXProvider components={components}>
    <Component />
  </MDXProvider>
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