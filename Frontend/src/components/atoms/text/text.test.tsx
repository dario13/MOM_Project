import React from 'react'
import { render, screen } from '@testing-library/react'
import { Text } from './text'
import { componentColors, componentSizes } from '../../constants'
import { TextAlignment } from './text.props'

describe('Text', () => {
  test('should render a Text component', () => {
    // Given
    const size = componentSizes[0]
    const color = componentColors[0]
    const align = TextAlignment[0]
    const exampleText = 'testing a text component'
    const bold = true
    const italic = true

    render(
      <Text
        text={exampleText}
        size={size}
        color={color}
        align={align}
        bold={bold}
        italic={italic}
      />,
    )

    // When
    const renderedTextComponent = screen.getByTestId('Text')
    const alignTextElement = renderedTextComponent.parentElement

    // Then
    expect(renderedTextComponent).toBeInTheDocument()
    expect(renderedTextComponent).toHaveTextContent(exampleText)
    expect(renderedTextComponent).toHaveClass(`text-${size} text-${color} font-bold italic`)
    expect(alignTextElement).toHaveClass(`text-${align}`)
  })
})
