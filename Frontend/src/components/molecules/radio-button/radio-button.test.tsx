import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RadioButton } from './radio-button'

describe('RadioButton', () => {
  const onChangeMock = jest.fn()

  it('should render the RadioButton component with default values', () => {
    // Given
    render(
      <RadioButton onChange={onChangeMock} value="test">
        <div>Content</div>
      </RadioButton>,
    )

    // When
    const radio = screen.getByRole('radio')
    const content = screen.getByText('Content')

    // Then
    expect(radio).toBeInTheDocument()
    expect(content).toBeInTheDocument()
    expect(radio).not.toBeChecked()
  })

  it('should call onChange with the value when the component is clicked', async () => {
    // Given
    render(
      <RadioButton onChange={onChangeMock} value="test" color="primary">
        <div>Content</div>
      </RadioButton>,
    )

    // When
    const flexBox = screen.getByRole('container')
    await userEvent.click(flexBox)

    // Then
    expect(onChangeMock).toHaveBeenCalledTimes(1)
    expect(onChangeMock).toHaveBeenCalledWith('test')
  })

  it('should render the RadioButton as checked when checked prop is true', () => {
    // Given
    render(
      <RadioButton onChange={onChangeMock} value="test" checked>
        <div>Content</div>
      </RadioButton>,
    )

    // When
    const radio = screen.getByRole('radio')

    // Then
    expect(radio).toBeChecked()
  })

  it('should render the RadioButton as disabled when disabled prop is true', () => {
    // Given
    render(
      <RadioButton onChange={onChangeMock} value="test" disabled>
        <div>Content</div>
      </RadioButton>,
    )

    // When
    const radio = screen.getByRole('radio')

    // Then
    expect(radio).toBeDisabled()
  })
})
