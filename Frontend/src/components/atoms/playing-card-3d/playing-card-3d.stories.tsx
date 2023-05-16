import React from 'react'
import { Meta, Story } from '@/ioc/stories/story-types'
import { withTemplate } from '@/ioc/stories/with-template'
import { PlayingCard3D } from './playing-card-3d'
import { PlayingCard3DProps } from './playing-card-3d.props'
import { FlexBox } from '../primitives'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

const meta: Meta<PlayingCard3DProps> = {
  title: 'Atoms/PlayingCard3D',
  component: PlayingCard3D,
}

type PlayingCard3DStory = Story<PlayingCard3DProps>

const PlayingCard3DTemplate: React.FC<PlayingCard3DProps> = (args) => {
  return (
    <FlexBox width="100vw" height="100vh">
      <Canvas>
        <group position={[0, 0, 0]}>
          <PlayingCard3D {...args} />
        </group>
        <OrbitControls />
      </Canvas>
    </FlexBox>
  )
}

export const Primary: PlayingCard3DStory = {
  render: withTemplate(PlayingCard3DTemplate),
  args: {
    card: { suit: 0, value: 10 },
  },
}

export default meta
