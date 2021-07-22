import React from 'react'

import {AppProps} from 'next/app'

import {TrackingProvider} from '../lib/contexts/ga'

import '../styles/index.css'
import 'fontsource-montserrat'

const App: React.FC<AppProps> = ({Component, pageProps}) => {
  return (
    <TrackingProvider>
      <Component {...pageProps} />
    </TrackingProvider>
  )
}

export default App
