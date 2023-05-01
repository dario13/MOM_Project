import React from 'react'
import { Meta, Story } from '@/ioc/stories/story-types'
import { withTemplate } from '@/ioc/stories/with-template'
import { ConfettiParticle } from './confetti-particle'
import { ConfettiParticleProps } from './confetti-particle.props'

const meta: Meta<ConfettiParticleProps> = {
  title: 'Atoms/ConfettiParticle',
  component: ConfettiParticle,
}

type ConfettiParticleStory = Story<ConfettiParticleProps>

const ConfettiParticleTemplate: React.FC<ConfettiParticleProps> = (args) => (
  <ConfettiParticle {...args} />
)

const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const colors = ['#FFC700', '#FF4B4B', '#2296F3', '#4CAF50', '#FF9800']

export const Primary: ConfettiParticleStory = {
  render: withTemplate(ConfettiParticleTemplate),
  args: {
    x: getRandom(0, window.innerWidth),
    y: 0,
    size: getRandom(5, 15),
    color: colors[getRandom(0, colors.length - 1)],
    duration: getRandom(1000, 3000),
    delay: getRandom(0, 500),
  },
}

export default meta
