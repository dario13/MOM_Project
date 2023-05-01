import React from 'react'
import { useSpring, animated } from 'react-spring'
import { ConfettiParticleProps } from './confetti-particle.props'

const ConfettiParticleComponent: React.FC<ConfettiParticleProps> = (
  props: ConfettiParticleProps,
) => {
  const { x, y, size, color, duration, delay } = props

  const animationProps = useSpring({
    from: { x, y, opacity: 1 },
    to: { x, y: y + window.innerHeight, opacity: 0 },
    config: { duration },
    delay,
  })

  return (
    <animated.div
      data-testid="confetti-particle"
      style={{
        ...animationProps,
        position: 'fixed',
        width: size,
        height: size,
        zIndex: 1000,
        backgroundColor: color,
      }}
    />
  )
}

ConfettiParticleComponent.displayName = 'ConfettiParticle'

export const ConfettiParticle = React.memo(ConfettiParticleComponent)
