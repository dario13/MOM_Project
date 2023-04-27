import React from 'react'
import { CardBoardProps } from './playing-card-board.props'
import { AnimatedCard } from '@/components/atoms/animated-card'
import { Card, FlexBox, PlayingCard } from '@/components/atoms'
import { PlayingCardProps } from '@/components/atoms/playing-card/playing-card.props'

const PlayingCardBoardComponent: React.FC<CardBoardProps> = ({ playingCards }) => {
  const firstFaceUpIndex = playingCards.findIndex((playingCard) => playingCard.isFaceUp)

  return (
    <FlexBox>
      <Card color="base300">
        <FlexBox
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          padding="1.5rem"
          gap="1rem"
        >
          {playingCards.map((playingCard: PlayingCardProps, index: number) => {
            if (firstFaceUpIndex === index) {
              if (!playingCard.card) return <></>
              return <AnimatedCard key={index} card={playingCard.card} />
            }
            return (
              <PlayingCard
                key={index}
                isFaceUp={playingCard.isFaceUp}
                card={playingCard.card}
                ariaLabel={playingCard.isFaceUp ? 'playing-card-face-up' : 'playing-card-face-down'}
              />
            )
          })}
        </FlexBox>
      </Card>
    </FlexBox>
  )
}

PlayingCardBoardComponent.displayName = 'CardBoard'

export const CardBoard = React.memo(PlayingCardBoardComponent)
