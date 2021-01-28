import React from 'react'
import Head from 'next/head'

import meta from '~/data/meta.json'

export const OpenGraph: React.FC<{title: string, description: string, image?: string}> = ({title, description, image}) => {
  return <Head>
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content={meta.name} />
    <meta name="description" content={description} />
    <meta property="og:image" content={image ? image : `${meta.productionUrl}/img/social/social.jpg`} />
  </Head>
}