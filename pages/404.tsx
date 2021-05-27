import React from 'react'
import {NextPage} from 'next'
import Link from 'next/link'
import Head from 'next/head'

import {Layout} from '~/lib/components/layout'
import {ContentContainer} from '~/lib/components/mdx'

const NotFoundPage: NextPage = () => {
  return (
    <Layout>
      <ContentContainer>
        <Head>
          <title>Error 404 / Page Not Found</title>
        </Head>
        <h1>404</h1>
        <p>
          <i>This is not the page you are looking for.</i>
        </p>
        <p>
          <Link href="/">
            <a>Head home and try again</a>
          </Link>
        </p>
        <p>
          Or maybe it is and I've made a mistake. If you think this page should
          exist please{' '}
          <a href="https://github.com/Arcath/arcath.net-next/issues">
            open an issue on GitHub
          </a>{' '}
          and I'll have a look.
        </p>
      </ContentContainer>
    </Layout>
  )
}

export default NotFoundPage
