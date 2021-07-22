import React, {useState} from 'react'
import useDarkMode from 'use-dark-mode'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import {OutboundLink} from 'react-ga'

import meta from '~/data/meta.json'

export const Layout: React.FC = ({children}) => {
  const {toggle, value: darkMode} = useDarkMode(false, {
    classNameDark: 'dark'
  })

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/img/512.png" />
      </Head>
      <div
        className="w-8 absolute top-8 right-8 text-gray-300 dark:text-yellow-300"
        onClick={toggle}
      >
        {!darkMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )}
      </div>
      <div className="grid grid-cols-content">
        <header className="h-64 col-span-full grid grid-cols-content">
          <div className="grid grid-cols-2 col-start-2 col-end-5">
            <div>
              <Link href="/">
                <a>
                  <h1 className="text-white text-3xl hover:text-brand-light">
                    {meta.name}
                  </h1>
                </a>
              </Link>
              <h2>{meta.description}</h2>
            </div>
            <div className="text-right text-white">
              <Link href="/about">
                <a className="mx-2 my-8">About</a>
              </Link>
              <Link href="/uses">
                <a className="mx-2 my-8">Uses</a>
              </Link>
              <Link href="/contact">
                <a className="mx-2 my-8">Contact</a>
              </Link>
            </div>
          </div>
        </header>
        <div className="top-skew" />
        <div className="bg-white col-span-full z-10 dark:bg-gray-800 dark:text-gray-300 transition-all">
          {children}
        </div>
        <div className="bottom-skew" />
        <div className="col-start-2 col-end-5 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 text-white mb-20">
          <div className="w-64 mx-auto lg:ml-0">
            <Image
              src="/img/profile.jpg"
              className="rounded-full w-64"
              alt="Adam Laycock"
              width={256}
              height={256}
            />
          </div>
          <div>
            <h2 className="text-2xl">{meta.name}</h2>
            <h3 className="text-xl mb-6">{meta.description}</h3>
            <p>All content is my own unless otherwise stated.</p>
            <p>
              My content is licensed under the{' '}
              <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
                CC-BY-NC-SA 4.0
              </a>{' '}
              license
            </p>
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <OutboundLink
              eventLabel="Social Media Link"
              to={meta.author.social.twitter}
              className="fill-current text-white hover:text-brands-twitter"
              aria-label="Twitter"
            >
              <svg
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-16 m-auto"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </OutboundLink>
            <OutboundLink
              eventLabel="Social Media Link"
              to={meta.author.social.github}
              className="fill-current text-white hover:text-brands-github"
              aria-label="Github"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 m-auto"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </OutboundLink>
            <OutboundLink
              eventLabel="Social Media Link"
              to={meta.author.social.youtube}
              className="fill-current text-white hover:text-brands-youtube"
              aria-label="YouTube"
            >
              <svg
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-16 m-auto"
              >
                <path d="M23.499 6.203a3.008 3.008 0 00-2.089-2.089c-1.87-.501-9.4-.501-9.4-.501s-7.509-.01-9.399.501a3.008 3.008 0 00-2.088 2.09A31.258 31.26 0 000 12.01a31.258 31.26 0 00.523 5.785 3.008 3.008 0 002.088 2.089c1.869.502 9.4.502 9.4.502s7.508 0 9.399-.502a3.008 3.008 0 002.089-2.09 31.258 31.26 0 00.5-5.784 31.258 31.26 0 00-.5-5.808zm-13.891 9.4V8.407l6.266 3.604z" />
              </svg>
            </OutboundLink>
            <OutboundLink
              eventLabel="Social Media Link"
              to={meta.author.social.dev}
              className="fill-current text-white hover:text-brands-dev"
              aria-label="Dev.to"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="img"
                className="w-16 m-auto"
              >
                <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.3zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z" />
              </svg>
            </OutboundLink>
            <PolyworkIcon />
          </div>
        </div>
      </div>
    </>
  )
}

const PolyworkIcon: React.FC = () => {
  const [hover, setHover] = useState(false)

  if (hover) {
    return (
      <OutboundLink
        eventLabel="Social Media Link"
        to={meta.author.social.polywork}
        aria-label="Polywork"
        onMouseLeave={() => setHover(false)}
      >
        <svg
          className="w-16 m-auto"
          viewBox="0 0 250 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0)">
            <path
              d="M85.9375 243.75V168.75H164.062V199.218C164.062 223.437 144.531 243.75 119.531 243.75H85.9375Z"
              fill="#88CFB0"
            />
            <path
              d="M165.625 167.187V87.4998H243.75V122.656C243.75 146.875 224.219 167.187 199.219 167.187H165.625Z"
              fill="#F2C94C"
            />
            <path
              d="M164.062 87.4998H85.9375V166.406H164.062V87.4998Z"
              fill="#BD83CE"
            />
            <path
              d="M6.25 85.9375V50.7812C6.25 26.5625 25.7812 6.25 50.7813 6.25H84.375V85.9375H6.25Z"
              fill="#40BE88"
            />
            <path
              d="M165.625 85.9375V6.25H199.219C223.437 6.25 243.75 25.7812 243.75 50.7812V85.9375H165.625Z"
              fill="#FF7474"
            />
            <path
              d="M164.062 6.25H85.9375V85.1562H164.062V6.25Z"
              fill="#6776F9"
            />
            <path
              d="M6.25 199.218V168.75H84.375V243.75H50.7813C25.7812 243.75 6.25 224.218 6.25 199.218Z"
              fill="#37C2E2"
            />
            <path
              d="M84.375 87.4998H6.25V166.406H84.375V87.4998Z"
              fill="#F2994A"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 199.219V50.7812C0 22.6562 22.6563 0 50.7813 0H199.219C227.344 0 250 22.6562 250 50.7812V122.656C250 150.781 227.344 173.437 199.219 173.437H170.312V199.219C170.312 227.344 147.656 250 119.531 250H50.7813C22.6563 250 0 227.344 0 199.219ZM78.125 78.9062H13.2813V50C13.2813 29.6875 29.6875 12.5 50.7813 12.5H78.125V78.9062ZM199.219 160.937H171.875V93.7497H236.719V123.437C236.719 143.75 220.313 160.937 199.219 160.937ZM119.531 237.5H92.1872V175.781H157.031V200C157.031 220.312 140.625 237.5 119.531 237.5ZM92.1872 160.937H157.031V93.7497H92.1872V160.937ZM171.875 78.9062H236.719V50.7812C236.719 29.6875 219.531 13.2812 199.219 13.2812H171.875V78.9062ZM157.031 78.9062H92.1872V12.5H157.031V78.9062ZM12.5 175V199.219C12.5 220.312 29.6875 236.719 50 236.719H78.125V175H12.5ZM78.125 160.937H12.5V93.7497H78.125V160.937Z"
              fill="#2F2F3A"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="250" height="250" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </OutboundLink>
    )
  }

  return (
    <OutboundLink
      eventLabel="Social Media Link"
      to={meta.author.social.polywork}
      className="fill-current text-white"
      aria-label="Polywork"
      onMouseEnter={() => setHover(true)}
    >
      <svg
        className="w-16 m-auto"
        viewBox="0 0 250 250"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 199.219V50.7813C0 22.6563 22.6562 0 50.7812 0H199.219C227.344 0 250 22.6563 250 50.7813V122.656C250 150.781 227.344 173.437 199.219 173.437H170.312V199.219C170.312 227.344 147.656 250 119.531 250H50.7812C22.6562 250 0 227.344 0 199.219ZM78.1249 78.9063H13.2812V50C13.2812 29.6875 29.6875 12.5 50.7812 12.5H78.1249V78.9063ZM199.219 160.937H171.875V93.7498H236.719V123.437C236.719 143.75 220.312 160.937 199.219 160.937ZM119.531 237.5H92.1871V175.781H157.031V200C157.031 220.312 140.625 237.5 119.531 237.5ZM92.1871 160.937H157.031V93.7498H92.1871V160.937ZM171.875 78.9063H236.719V50.7813C236.719 29.6875 219.531 13.2813 199.219 13.2813H171.875V78.9063ZM157.031 78.9063H92.1871V12.5H157.031V78.9063ZM12.5 175V199.219C12.5 220.312 29.6875 236.719 50 236.719H78.1249V175H12.5ZM78.1249 160.937H12.5V93.7498H78.1249V160.937Z"
        />
      </svg>
    </OutboundLink>
  )
}
