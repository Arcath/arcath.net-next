import React from 'react'
import Head from 'next/head'

import meta from '~/data/meta.json'

export const OpenGraph: React.FC = () => {
  return <Head>
    <meta property="og:site_name" content={meta.name} />
  </Head>
}