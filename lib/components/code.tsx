import React, {useState} from 'react'
import Highlight, {defaultProps, PrismTheme} from 'prism-react-renderer'
import copy from 'copy-to-clipboard'
import {OutboundLink} from 'react-ga'

const theme: PrismTheme = {
  plain: {
    color: '#e6e1dc',
    backgroundColor: '#232323'
  },
  styles: [
    {
      types: ['comment'],
      style: {
        color: '#676869'
      }
    },
    {
      types: ['variable'],
      style: {
        fontStyle: 'italic'
      }
    },
    {
      types: ['keyword', 'builtin', 'operator'],
      style: {
        color: '#DA4939'
      }
    },
    {
      types: ['number', 'string'],
      style: {
        color: '#A5C261'
      }
    },
    {
      types: ['constant'],
      style: {
        color: '#6D9CBE'
      }
    },
    {
      types: ['tag'],
      style: {
        color: '#CDA869'
      }
    },
    {
      types: ['attr-name'],
      style: {
        color: '#F5E1B6'
      }
    },
    {
      types: ['inserted'],
      style: {
        color: '#E6E1DC',
        backgroundColor: '#144212'
      }
    },
    {
      types: ['deleted'],
      style: {
        color: '#E6E1DC',
        backgroundColor: '#660000'
      }
    },
    {
      types: ['changed'],
      style: {
        color: '#967EFB'
      }
    },
    {
      types: ['function'],
      style: {
        color: '#FFC66D'
      }
    },
    {
      types: ['parameter'],
      style: {
        fontStyle: 'italic'
      }
    },
    {
      types: ['boolean'],
      style: {
        color: '#6E9CBE'
      }
    }
  ]
}

const RE = /([\d,-]+)/

const calculateLinesToHighlight = (meta: string) => {
  if (RE.test(meta)) {
    const lineNumbers = RE.exec(meta)[1]
      .split(',')
      .map(v => v.split('-').map(y => parseInt(y, 10)))
    return index => {
      const lineNumber = index + 1
      const inRange = lineNumbers.some(([start, end]) =>
        end ? lineNumber >= start && lineNumber <= end : lineNumber === start
      )
      return inRange
    }
  } else {
    return () => false
  }
}

export const Code: React.FC<{
  codeString: string
  language: any
  line?: string
  fileName?: string
  url?: string
}> = ({codeString, language, line, fileName, url}) => {
  const shouldHighlightLine = calculateLinesToHighlight(line)

  const [show, setShow] = useState(false)
  const [copied, setCopied] = useState(false)

  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={theme}
    >
      {({tokens, getLineProps, getTokenProps}) => (
        <div
          className="relative"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          {tokens.length > 2 ? (
            <div
              className={`absolute top-10 right-4 w-8 h-8 p-1 rounded border border-gray-200 transition-opacity cursor-pointer shadow ${
                show ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={() => {
                copy(codeString)
                setCopied(true)
                setTimeout(() => {
                  setCopied(false)
                }, 2500)
              }}
            >
              {copied ? (
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 80.588 61.158"
                >
                  <path
                    className="fill-current text-green-300"
                    d="M29.658,61.157c-1.238,0-2.427-0.491-3.305-1.369L1.37,34.808c-1.826-1.825-1.826-4.785,0-6.611
	c1.825-1.826,4.786-1.827,6.611,0l21.485,21.481L72.426,1.561c1.719-1.924,4.674-2.094,6.601-0.374
	c1.926,1.72,2.094,4.675,0.374,6.601L33.145,59.595c-0.856,0.959-2.07,1.523-3.355,1.56C29.746,61.156,29.702,61.157,29.658,61.157z
	"
                  />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    className="fill-current text-gray-200"
                    d="M21,8.94a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19.32.32,0,0,0-.09,0A.88.88,0,0,0,14.05,2H10A3,3,0,0,0,7,5V6H6A3,3,0,0,0,3,9V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V18h1a3,3,0,0,0,3-3V9S21,9,21,8.94ZM15,5.41,17.59,8H16a1,1,0,0,1-1-1ZM15,19a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V9A1,1,0,0,1,6,8H7v7a3,3,0,0,0,3,3h5Zm4-4a1,1,0,0,1-1,1H10a1,1,0,0,1-1-1V5a1,1,0,0,1,1-1h3V7a3,3,0,0,0,3,3h3Z"
                  />
                </svg>
              )}
            </div>
          ) : (
            ''
          )}
          <pre className="bg-gray-900 dark:bg-gray-700">
            {tokens.map((line, i) => {
              return (
                <div
                  key={i}
                  {...getLineProps({
                    line,
                    key: i,
                    className: shouldHighlightLine(i)
                      ? 'bg-brand-light bg-opacity-30 border-l-4 border-brand-dark'
                      : 'border-l-4 border-gray-900'
                  })}
                >
                  <span className="mr-4 text-right w-6 inline-block select-none text-gray-400">
                    {i + 1}
                  </span>
                  {line.map((token, key) => {
                    return <span key={key} {...getTokenProps({token, key})} />
                  })}
                </div>
              )
            })}
            <div className="border-l-4 border-gray-900 bg-gray-900">
              <span className="ml-10 mr-4 inline-block px-2 bg-brand-dark">
                Language {language}
              </span>
              {fileName ? (
                <span className="mr-4 inline-block px-2 bg-brand-dark">
                  {fileName}
                </span>
              ) : (
                ''
              )}
              {url ? (
                <span className="mr-4 inline-block px-2 bg-white">
                  <OutboundLink
                    to={url}
                    eventLabel="Click Code Link"
                    target="_BLANK"
                  >
                    View on Github
                  </OutboundLink>
                </span>
              ) : (
                ''
              )}
            </div>
          </pre>
        </div>
      )}
    </Highlight>
  )
}
