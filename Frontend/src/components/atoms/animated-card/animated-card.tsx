import React from 'react'
import { AnimatedCardProps } from './animated-card.props'
import { useSpring, animated } from '@react-spring/web'
import { PlayingCard } from '../playing-card'

const AnimatedCard: React.FC<AnimatedCardProps> = ({ card }) => {
  const [isFlipped, setIsFlipped] = React.useState(false)

  const frontCardSpring = useSpring({
    transform: `rotateY(${isFlipped ? 0 : -180}deg)`,
    opacity: isFlipped ? 1 : 0,
  })

  const backCardSpring = useSpring({
    transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
    opacity: isFlipped ? 0 : 1,
  })

  React.useEffect(() => {
    const randomTimeout = Math.floor(Math.random() * 1000) + 1000 // random timeout between 1s and 3s
    const flipTimer = setTimeout(() => setIsFlipped(true), randomTimeout)
    return () => clearTimeout(flipTimer)
  }, [])

  return (
    <>
      {isFlipped ? (
        <animated.div
          style={{
            ...frontCardSpring,
          }}
        >
          <PlayingCard isFaceUp card={card} ariaLabel="playing-card-face-up" />
        </animated.div>
      ) : (
        <animated.div
          style={{
            ...backCardSpring,
          }}
        >
          <PlayingCard isFaceUp={false} ariaLabel="playing-card-face-down" />
        </animated.div>
      )}
    </>
  )
}

AnimatedCard.displayName = 'AnimatedCard'

export { AnimatedCard }
