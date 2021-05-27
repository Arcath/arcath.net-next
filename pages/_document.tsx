import React from 'react'
import Document, {Head, Html, Main, NextScript} from 'next/document'

export default class MainDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <script src="/noflash.js" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
