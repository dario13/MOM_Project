import React from 'react'
import { Meta, Story } from '@/ioc/stories/story-types'
import { withTemplate } from '@/ioc/stories/with-template'
import { ConfettiAnimation } from './confetti-animation'
import { ConfettiAnimationProps } from './confetti-animation.props'

const meta: Meta<ConfettiAnimationProps> = {
  title: 'Molecules/ConfettiAnimation',
  component: ConfettiAnimation,
}

type ConfettiAnimationStory = Story<ConfettiAnimationProps>

const ConfettiAnimationTemplate: React.FC<ConfettiAnimationProps> = (args) => (
  <ConfettiAnimation {...args} />
)

export const Primary: ConfettiAnimationStory = {
  render: withTemplate(ConfettiAnimationTemplate),
  args: {
    numParticles: 1000,
  },
}

export default meta
