import React from 'react'
import { AppProps } from 'next/app'
import '@/styles/global.css'
import { useHydration } from '@/hooks/use-hydration'
import { FlexBox, Loader } from '@/components'

const App = ({ Component, pageProps }: AppProps) => {
  const hasHydrated = useHydration()

  const renderLoader = () => {
    return (
      <FlexBox
        alignItems="center"
        justifyContent="center"
        height="100vh"
        width="100%"
        padding="0"
        margin="0"
      >
        <Loader />
      </FlexBox>
    )
  }

  return hasHydrated ? <Component {...pageProps} /> : renderLoader()
}

export default App
