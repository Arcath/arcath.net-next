import React, {useMemo, ReactHTMLElement} from 'react'
import Image from 'next/image'
import {getMDXComponent} from 'mdx-bundler/client'
import Link from 'next/link'
import {omit} from '@arcath/utils/lib/functions/pick'
import {OutboundLink} from 'react-ga'

import {Code} from './code'

const Img: React.FC<any> = props => {
  return (
    <div className="relative w-full">
      <Image {...props} layout="fill" objectFit="none" />
    </div>
  )
}

const Paragraph: React.FC<any> = props => {
  if (typeof props.children !== 'string' && props.children.type === 'img') {
    return <>{props.children}</>
  }

  return <p {...props} />
}

const Anchor: React.FC<Partial<ReactHTMLElement<HTMLAnchorElement>['props']>> =
  props => {
    const {href, children} = props

    if (!href) {
      return <a {...props} />
    }

    if (href!.substr(0, 4) === 'http') {
      return (
        <OutboundLink eventLabel="Content Outbound Link" to={href!}>
          {children}
        </OutboundLink>
      )
    }

    return (
      <Link href={href!}>
        <a>{children}</a>
      </Link>
    )
  }

export const components = {
  //img: Img,
  p: Paragraph,
  a: Anchor,
  pre: (preProps: Partial<ReactHTMLElement<HTMLPreElement>['props']>) => {
    const props = preToCodeBlock(preProps)

    if (props) {
      return <Code {...props} />
    }

    return <pre {...preProps} />
  }
}

export const MDX: React.FC<{source: string}> = ({source}) => {
  const Component = useMemo(() => getMDXComponent(source), [source])

  return <Component components={components} />
}

export const Content: React.FC<{source: any; heading: string}> = ({
  source,
  heading
}) => {
  return (
    <ContentContainer>
      <h1>{heading}</h1>
      <MDX source={source} />
    </ContentContainer>
  )
}

export const ContentContainer: React.FC = ({children}) => {
  return (
    <div className="grid grid-cols-content content-positioning prose dark:prose-dark max-w-none">
      {children}
    </div>
  )
}

const preToCodeBlock = (
  preProps: any
): {
  language: string
  codeString: string
  metaString: string
  className: string
} => {
  if (
    // children is code element
    preProps.children &&
    // code props
    preProps.children.props &&
    // if children is actually a <code>
    preProps.children.type === 'code'
  ) {
    // we have a <pre><code> situation
    const {
      children: codeString,
      className = '',
      ...props
    } = preProps.children.props

    const matches = className.match(/language-(?<lang>.*)/)

    return {
      codeString: codeString.trim(),
      className,
      metaString:
        matches && matches.groups && matches.groups.lang
          ? matches.groups.lang.split('#')[1]
          : '',
      language:
        matches && matches.groups && matches.groups.lang
          ? matches.groups.lang.split('#')[0]
          : '',
      ...omit(props, ['children'])
    }
  }
}
