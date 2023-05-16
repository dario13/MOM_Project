import React from 'react'
import { PlayingCard3DProps } from './playing-card-3d.props'
import { PlayingCard } from '../playing-card/playing-card'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

const PlayingCard3DComponent: React.FC<PlayingCard3DProps> = ({ card }) => {
  const htmlProps = {
    distanceFactor: 11,
    transform: true,
  }

  // Solid material color for sides
  const materialColor = 'black' // Purple

  return (
    <group>
      {/* Front side of the card */}
      <Html {...htmlProps} position={[0, 0, 0.01]}>
        <PlayingCard card={card} isFaceUp={true} />
      </Html>

      {/* Back side of the card */}
      <Html {...htmlProps} position={[0, 0, -0.01]}>
        <PlayingCard isFaceUp={false} />
      </Html>
    </group>
  )
}

PlayingCard3DComponent.displayName = 'PlayingCard3D'

export const PlayingCard3D = React.memo(PlayingCard3DComponent)
