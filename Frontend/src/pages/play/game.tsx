import React, { useEffect, useState } from 'react'
import { FlexBox } from '@/components'
import { PageLayout } from '@/components/layouts/page-layout'
import { ConnectYourWallet } from '@/components/molecules/connect-your-wallet'
import { useWallet } from '@/hooks/use-wallet'
import { PlayCard } from '@/components/organisms'
import { ConfettiAnimation } from '@/components/molecules'
import { useGame } from '@/hooks/use-game'

const Game = () => {
  const { isAccountConnected } = useWallet()
  const { isGameWon } = useGame()
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    if (isGameWon) {
      const timer = setTimeout(() => {
        setShowAnimation(true)
      }, 3000)

      return () => clearTimeout(timer)
    } else {
      setShowAnimation(false)
    }
  }, [isGameWon])

  const showConnectWallet = () => {
    return <ConnectYourWallet />
  }

  const renderGame = () => {
    return <PlayCard />
  }

  const renderContent = () => {
    return <FlexBox>{isAccountConnected ? renderGame() : showConnectWallet()}</FlexBox>
  }

  return (
    <>
      {showAnimation && <ConfettiAnimation numParticles={1500} />}
      <PageLayout content={renderContent()} />
    </>
  )
}

export default Game
