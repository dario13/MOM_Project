import React, { Suspense } from 'react'
import { AppProps } from 'next/app'
import '@/styles/global.css'
import { FlexBox, Loader } from '@/components'

const App = ({ Component, pageProps }: AppProps) => {
  const renderLoader = () => {
    return (
      <FlexBox alignItems="center" justifyContent="center" height="100vh" width="100vw">
        <Loader />
      </FlexBox>
    )
  }

  return (
    <Suspense fallback={renderLoader()}>
      <Component {...pageProps} />
    </Suspense>
  )
}

export default App
