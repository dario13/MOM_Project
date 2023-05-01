import React from 'react'
import { FlexBox } from '@/components'
import { PageLayout } from '@/components/layouts/page-layout'
import { ConnectYourWallet } from '@/components/molecules/connect-your-wallet'
import { useWallet } from '@/hooks/use-wallet'
import { ChooseDifficulty } from '@/components/organisms'
import { useMedia } from '@/hooks/use-media'

const Difficulty = () => {
  const { isAccountConnected } = useWallet()
  const { isMobile } = useMedia()

  const showConnectWallet = () => {
    return <ConnectYourWallet />
  }

  const renderDifficulty = () => {
    return (
      <FlexBox maxHeight={isMobile ? '0' : '40vh'} alignItems="center">
        <ChooseDifficulty />
      </FlexBox>
    )
  }

  const renderContent = () => {
    return <FlexBox>{isAccountConnected ? renderDifficulty() : showConnectWallet()}</FlexBox>
  }

  return <PageLayout content={renderContent()} />
}

export default Difficulty
