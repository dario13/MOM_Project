import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import { Input } from './input'

describe('Input component', () => {
  test('renders input with given placeholder', () => {
    render(<Input placeholder="Test Placeholder" />)
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument()
  })

  test('renders input with given label', () => {
    render(<Input label="Test Label" />)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  test('renders input with prefix', () => {
    render(<Input prefix="Test Prefix" />)
    expect(screen.getByText('Test Prefix')).toBeInTheDocument()
  })

  test('renders input with suffix', () => {
    render(<Input suffix="Test Suffix" />)
    expect(screen.getByText('Test Suffix')).toBeInTheDocument()
  })

  test('handles change event', () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} />)
    const inputElement = screen.getByTestId('Input')
    fireEvent.change(inputElement, { target: { value: 'Test Value' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(inputElement).toHaveValue('Test Value')
  })

  test('renders MaskedInput with given mask', async () => {
    const maskOptions = { mask: '00/00/0000' }
    render(<Input mask={{ options: maskOptions }} />)
    userEvent.type(screen.getByTestId('Input'), '12052021')
    await waitFor(() => expect(screen.getByDisplayValue('12/05/2021')).toBeInTheDocument())
  })
})
