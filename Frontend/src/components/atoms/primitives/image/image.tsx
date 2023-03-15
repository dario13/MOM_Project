import React from 'react'
import { Props } from './image.props'
import NextImage from 'next/image'

const Image = ({ ...rest }: Props) => {
  return (
    <a>
      <NextImage {...rest} />
    </a>
  )
}

Image.displayName = 'Image'

export { Image }
