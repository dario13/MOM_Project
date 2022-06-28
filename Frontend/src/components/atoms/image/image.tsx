import React from 'react'
import { ImageProps } from './image.props'
import * as ImageNext from 'next/image'

const Image = (props: ImageProps) => {
  return <ImageNext.default {...props} data-testid="Image" />
}

Image.displayName = 'Image'

export { Image }
