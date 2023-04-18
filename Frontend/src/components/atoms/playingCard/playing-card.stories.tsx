import React from 'react'
import { PlayingCard } from './playing-card'
import { PlayingCardProps } from './playing-card.props'
import { Meta, Story } from '@/stories/story-types'
import { withTemplate } from '@/stories/with-template'
import { Suit, Value } from '@/store/game/game.types'

const meta: Meta<PlayingCardProps> = {
  title: 'Atoms/PlayingCard',
  component: PlayingCard,
}

type PlayingCardStory = Story<PlayingCardProps>

const PlayingCardTemplate: React.FC<PlayingCardProps> = (args) => <PlayingCard {...args} />

export const Primary: PlayingCardStory = {
  render: withTemplate(PlayingCardTemplate),
  args: {
    card: { suit: Suit.hearts, value: Value.ace },
  },
}

export default meta
