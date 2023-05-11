import React from 'react'
import { Text3D as Text3d, Center, Float } from '@react-three/drei'
import { Text3DProps } from './text-3d.props'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { useLoader } from '@react-three/fiber'

const Text3DComponent: React.FC<Text3DProps> = ({
  text,
  mainColor = 'black',
  emmisiveColor = '#202020',
  specularColor = 'gray',
  floatIntensity = 0.2,
  size = 1,
}) => {
  const font = useLoader(FontLoader, '/fonts/helvetiker_regular.typeface.json')

  return (
    <mesh position={[0, 0, 0]}>
      <Center>
        <Float floatIntensity={floatIntensity} speed={4}>
          <Text3d font={font.data} isObject3D={true} size={size}>
            {text}
            <meshPhongMaterial
              reflectivity={1}
              refractionRatio={0.98}
              color={mainColor}
              emissive={emmisiveColor}
              specular={specularColor}
              fog
              shininess={30}
            />
          </Text3d>
        </Float>
      </Center>
    </mesh>
  )
}

Text3DComponent.displayName = 'Text3DWithOutline'

export const Text3D = React.memo(Text3DComponent)
