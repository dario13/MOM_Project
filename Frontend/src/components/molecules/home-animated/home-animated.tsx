import React, { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { FlexBox, Text3D, PlayingCard3D } from '@/components/atoms'
import { OrbitControls, Environment } from '@react-three/drei'
import { Card } from '@/store/game/game.types'
import { numberToCard } from '@/utils/number-to-card'
import { useFrame, useThree } from '@react-three/fiber'

// Generates a random card
const randomCard = (): Card => {
  const randomNumber = Math.floor(Math.random() * 52)
  return numberToCard(randomNumber)
}

// Handles card flipping logic
const CardFlip: React.FC = () => {
  const { camera } = useThree()
  const [card, setCard] = useState<Card>(randomCard())
  const lastYRotation = useRef(0)

  useFrame(() => {
    const deltaYRotation = Math.abs(camera.rotation.y - lastYRotation.current)

    if (deltaYRotation >= Math.PI / 2 - 0.09) {
      setCard(randomCard())
      lastYRotation.current = camera.rotation.y
    }
  })

  return <PlayingCard3D card={card} />
}

const HomeAnimatedComponent: React.FC = () => {
  return (
    <FlexBox
      style={{
        zIndex: 999,
      }}
    >
      <Canvas camera={{ position: [0, 1, 12], fov: 50 }}>
        <group position={[0, 3, 0]}>
          <Text3D text="GUESS" size={0.6} />
        </group>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <directionalLight position={[-10, -10, -10]} />

        <group position={[0, 0, 0]}>
          <CardFlip />
        </group>

        <Environment
          path={'/images/casino/'}
          files={[`px.png`, `nx.png`, `py.png`, `ny.png`, `pz.png`, `nz.png`]}
          background
          blur={0.04}
        />
        <group position={[0, -3, 0]}>
          <Text3D text="NEXT CARD" size={0.6} />
        </group>
        <OrbitControls autoRotate autoRotateSpeed={2} />
      </Canvas>
    </FlexBox>
  )
}

HomeAnimatedComponent.displayName = 'HomeAnimated'

export const HomeAnimated = React.memo(HomeAnimatedComponent)
