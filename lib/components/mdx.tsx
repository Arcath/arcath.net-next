import React, {useMemo, ReactHTMLElement} from 'react'
import Image from 'next/image'
import {MDXProvider} from '@mdx-js/react'
import {getMDXComponent} from 'mdx-bundler/client'
import Link from 'next/link'

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

const Anchor: React.FC<Partial<ReactHTMLElement<HTMLAnchorElement>["props"]>> = (props) => {
  const {href, children} = props
  
  if(!href){
    return <a {...props} />
  }

  if(href!.substr(0, 4) === 'http'){
    return <a href={href!}>{children}</a>
  }

  return <Link href={href!}><a>{children}</a></Link>
}

export const components = {
  //img: Img,
  p: Paragraph,
  a: Anchor
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