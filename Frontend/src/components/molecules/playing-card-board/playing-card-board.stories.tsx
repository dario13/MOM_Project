import React from 'react'
import { Meta, Story } from '@/ioc/stories/story-types'
import { withTemplate } from '@/ioc/stories/with-template'
import { CardBoard } from './playing-card-board'
import { CardBoardProps } from './playing-card-board.props'
import { Suit, Value } from '@/store/game/game.types'

const meta: Meta<CardBoardProps> = {
  title: 'Molecules/CardBoard',
  component: CardBoard,
}

type CardBoardStory = Story<CardBoardProps>

export default meta

const CardBoardTemplate: React.FC<CardBoardProps> = (args) => <CardBoard {...args} />

export const Primary: CardBoardStory = {
  render: withTemplate<CardBoardProps>(CardBoardTemplate),
  args: {
    playingCards: [
      { card: undefined, isFaceUp: false },
      { card: undefined, isFaceUp: false },
      { card: undefined, isFaceUp: false },
      { card: { suit: Suit.hearts, value: Value.three }, isFaceUp: true },
    ],
  },
}

export const SixCards: CardBoardStory = {
  render: withTemplate<CardBoardProps>(CardBoardTemplate),
  args: {
    playingCards: [
      { card: undefined, isFaceUp: false },
      { card: undefined, isFaceUp: false },
      { card: undefined, isFaceUp: false },
      { card: { suit: Suit.clubs, value: Value.ace }, isFaceUp: true },
      { card: { suit: Suit.diamonds, value: Value.king }, isFaceUp: true },
      { card: { suit: Suit.hearts, value: Value.three }, isFaceUp: true },
    ],
  },
}
