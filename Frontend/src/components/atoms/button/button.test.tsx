import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Button } from './button'

describe('Button component', () => {
  test('renders button with given text', () => {
    render(<Button text="Test Button" />)
    expect(screen.getByText('Test Button')).toBeInTheDocument()
  })

  test('renders button with given children', () => {
    render(<Button>Test Button</Button>)
    expect(screen.getByText('Test Button')).toBeInTheDocument()
  })

  test('renders button with startIcon', () => {
    render(<Button text="Test Button" startIcon={<span data-testid="start-icon">Icon</span>} />)
    expect(screen.getByTestId('start-icon')).toBeInTheDocument()
  })

  test('renders button with endIcon', () => {
    render(<Button text="Test Button" endIcon={<span data-testid="end-icon">Icon</span>} />)
    expect(screen.getByTestId('end-icon')).toBeInTheDocument()
  })

  test('handles click event', () => {
    const handleClick = jest.fn()
    render(<Button text="Test Button" onClick={handleClick} />)
    fireEvent.click(screen.getByText('Test Button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('does not trigger onClick when disabled', () => {
    const handleClick = jest.fn()
    render(<Button text="Test Button" onClick={handleClick} disabled />)
    fireEvent.click(screen.getByText('Test Button'))
    expect(handleClick).toHaveBeenCalledTimes(0)
  })

  test('renders as a link when given an href', () => {
    render(<Button text="Test Button" href="/somepath" />)
    const linkElement = screen.getByTestId('Button')
    expect(linkElement.closest('a')).toHaveAttribute('href', '/somepath')
  })
})
