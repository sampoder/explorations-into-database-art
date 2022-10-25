import * as React from 'react'
import theme from '../lib/theme'
import { ThemeProvider } from 'theme-ui'
import Head from 'next/head'

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title> 
        ✨ 🌈 ⚡ Explorations Into Database Art
        </title>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
