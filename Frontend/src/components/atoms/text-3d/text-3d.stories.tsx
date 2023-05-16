import React from 'react'
import { Meta, Story } from '@/ioc/stories/story-types'
import { withTemplate } from '@/ioc/stories/with-template'
import { Text3D } from './text-3d'
import { Text3DProps } from './text-3d.props'
import { Canvas } from '@react-three/fiber'
import { FlexBox } from '../primitives'

const meta: Meta<Text3DProps> = {
  title: 'Atoms/Text3D',
  component: Text3D,
}

type Text3DStory = Story<Text3DProps>

const Text3DTemplate: React.FC<Text3DProps> = (args) => (
  <FlexBox width="100vw" height="100vh">
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <group position={[0, 0, 0]}>
        <Text3D {...args} />
      </group>
    </Canvas>
  </FlexBox>
)

export const Primary: Text3DStory = {
  render: withTemplate(Text3DTemplate),
  args: {
    text: 'Example Text',
  },
}

export default meta
