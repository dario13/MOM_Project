import { Button, Card, FlexBox } from '@/components/atoms'
import { CardBoard } from '@/components/molecules'
import { useGame } from '@/hooks/use-game'
import { useMedia } from '@/hooks/use-media'
import { BetOptions } from '@/store/game/game.types'
import React, { useEffect, useState } from 'react'
import GameLostModal from './game-lost-modal'
import GameWinModal from './game-win-modal'

const PlayCard: React.FC = () => {
  const {
    bet,
    resetGame,
    claimPrize,
    dealtCards,
    rules,
    difficulty,
    operationInProgress,
    isGameLost,
    isGameWon,
  } = useGame()
  const { isMobile } = useMedia()
  const [showLostModal, setShowLostModal] = useState(false)
  const [showWinModal, setShowWinModal] = useState(false)

  useEffect(() => {
    if (isGameLost) {
      const timer = setTimeout(() => {
        setShowLostModal(true)
      }, 3000)

      return () => clearTimeout(timer)
    } else {
      setShowLostModal(false)
    }
  }, [isGameLost])

  useEffect(() => {
    if (isGameWon) {
      const timer = setTimeout(() => {
        setShowWinModal(true)
      }, 3000)

      return () => clearTimeout(timer)
    } else {
      setShowWinModal(false)
    }
  }, [isGameWon])

  const noCardsDeal = () => dealtCards.length === 0

  const getCards = () => {
    const totalCards = rules[difficulty].cardsToWin
    const cards = []
    for (let i = 0; i < totalCards; i++) {
      if (dealtCards[i]) cards.push({ card: dealtCards[i], isFaceUp: true })
      if (!dealtCards[i]) cards.push({ card: undefined, isFaceUp: false })
    }

    return cards.reverse()
  }

  const renderGame = () => {
    return (
      <FlexBox maxHeight={isMobile ? '0' : '50vh'} alignItems="center">
        <Card color="base100">
          <FlexBox flexDirection="row" justifyContent={isMobile ? 'space-between' : 'space-evenly'}>
            <FlexBox
              gap={'1rem'}
              alignItems="center"
              justifyContent="center"
              maxWidth={isMobile ? '100%' : '20%'}
            >
              <Button
                responsive={false}
                loading={operationInProgress || noCardsDeal()}
                onClick={async () => {
                  await bet(BetOptions.higher)
                }}
                disabled={operationInProgress || noCardsDeal()}
              >
                ↑ Higher
              </Button>
              <Button
                responsive={false}
                loading={operationInProgress || noCardsDeal()}
                onClick={async () => {
                  await bet(BetOptions.lower)
                }}
                disabled={operationInProgress || noCardsDeal()}
              >
                ↓ Lower
              </Button>
            </FlexBox>

            <FlexBox maxWidth={isMobile ? '60%' : '100%'}>
              <CardBoard playingCards={getCards()} />
            </FlexBox>
          </FlexBox>
        </Card>
      </FlexBox>
    )
  }

  return (
    <>
      <GameLostModal resetGame={resetGame} visible={showLostModal} />
      <GameWinModal claimPrize={claimPrize} resetGame={resetGame} visible={showWinModal} />
      {renderGame()}
    </>
  )
}

PlayCard.displayName = 'PlayCard'

export { PlayCard }
