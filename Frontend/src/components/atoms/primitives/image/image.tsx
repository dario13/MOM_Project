import React from 'react'
import { Props } from './image.props'
import NextImage from 'next/image'

const Image = ({ ...rest }: Props) => {
  return <NextImage data-testid="Image" {...rest} />
}

Image.displayName = 'Image'

export { Image }
