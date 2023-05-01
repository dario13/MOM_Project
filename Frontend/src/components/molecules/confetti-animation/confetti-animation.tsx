import React from 'react'
import { ConfettiAnimationProps } from './confetti-animation.props'
import { ConfettiParticle, ConfettiParticleProps } from '@/components/atoms'

const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const generateConfettiParticles = (numParticles: number): ConfettiParticleProps[] => {
  const particles = []
  const colors = ['#FFC700', '#FF4B4B', '#2296F3', '#4CAF50', '#FF9800']

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: getRandom(0, window.innerWidth),
      y: 0,
      size: getRandom(5, 15),
      color: colors[getRandom(0, colors.length - 1)],
      duration: getRandom(1000, 5000),
      delay: getRandom(0, 500),
    })
  }

  return particles
}

const ConfettiAnimationComponent: React.FC<ConfettiAnimationProps> = (
  props: ConfettiAnimationProps,
) => {
  const { numParticles } = props
  const confettiParticles = generateConfettiParticles(numParticles)

  return (
    <>
      {confettiParticles.map((particle, index) => (
        <ConfettiParticle key={index} {...particle} />
      ))}
    </>
  )
}

ConfettiAnimationComponent.displayName = 'ConfettiAnimation'

export const ConfettiAnimation = React.memo(ConfettiAnimationComponent)
