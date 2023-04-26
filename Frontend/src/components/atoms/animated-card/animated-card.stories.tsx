import React from 'react'
import { Meta, Story } from '@/ioc/stories/story-types'
import { AnimatedCard } from './animated-card'
import { AnimatedCardProps } from './animated-card.props'
import { Suit, Value } from '@/store/game/game.types'
import { Card } from '../card'

const meta: Meta<AnimatedCardProps> = {
  title: 'Atoms/AnimatedCard',
  component: AnimatedCard,
}

type AnimatedCardStory = Story<AnimatedCardProps>

export default meta

export const Primary: AnimatedCardStory = {
  render: () => {
    return (
      <Card>
        <AnimatedCard card={{ suit: Suit.hearts, value: Value.ace }} />{' '}
      </Card>
    )
  },
}
