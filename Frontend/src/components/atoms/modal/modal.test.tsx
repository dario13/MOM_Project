import React from 'react'
import { render, screen } from '@testing-library/react'
import { Modal } from './modal'
import { Button } from '../button'

describe('Modal', () => {
  it('should not show modal', () => {
    // Given
    render(
      <Modal>
        <Button>Do not click me</Button>
      </Modal>,
    )

    // When
    const renderedModalComponent = screen.queryByRole('button', { name: 'Do not click me' })

    // Then
    expect(renderedModalComponent).not.toBeInTheDocument()
  })

  it('should show modal', () => {
    // Given
    render(
      <Modal open={true}>
        <Button>Do not click me</Button>
      </Modal>,
    )

    // When
    const renderedModalComponent = screen.queryByRole('button', { name: 'Do not click me' })

    // Then
    expect(renderedModalComponent).toBeInTheDocument()
  })
})
