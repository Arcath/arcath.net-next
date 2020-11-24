import React from 'react'
import useDarkMode from 'use-dark-mode'
import Link from 'next/link'

import meta from '../../_data/meta.json'

export const Layout: React.FC = ({children}) => {
  const {toggle, value: darkMode} = useDarkMode(false, {
    classNameDark: 'dark'
  })

  return <>
    <div className="w-8 absolute top-8 right-8 text-gray-300 dark:text-yellow-300" onClick={toggle}>
      {
        !darkMode
      ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      }
    </div>
    <div className="grid grid-cols-content">
      <header className="h-64 col-span-full grid grid-cols-content">
        <div className="col-start-2 col-end-3">
          <Link href="/"><h1 className="text-white text-3xl">{meta.name}</h1></Link>
          <h2>{meta.description}</h2>
        </div>
      </header>
      <div className="top-skew" />
      <div className="bg-white col-span-full z-10 dark:bg-gray-800 dark:text-gray-300">
        {children}
      </div>
      <div className="bottom-skew" />
      <div className="col-start-2 col-end-5 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 text-white mb-20">
        <div>
          <img src="/img/profile.jpg" className="rounded-full w-64 mx-auto" />
        </div>
        <div>
          <h2 className="text-2xl">{meta.name}</h2>
          <h3 className="text-xl mb-6">{meta.description}</h3>
          <p>All content is my own unless otherwise stated.</p>
          <p>My content is licensed under the <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC-BY-NC-SA 4.0</a> license</p>
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          bar
        </div>
      </div>
    </div>
  </>
}