import React from 'react'
import { render, screen } from '@testing-library/react'
import { AlertDialog } from './alert-dialog'

describe('Alert Dialog', () => {
  it('should not show alert dialog', () => {
    // Given
    render(
      <AlertDialog
        message={'This is a message'}
        title={'This is a title'}
        visible={false}
        actions={{
          main: {
            color: 'success',
            text: 'OK',
            onPress: () => ({}),
          },
        }}
      />,
    )

    // When
    const renderedAlertDialogComponent = screen.queryByRole('button', { name: 'ok' })

    // Then
    expect(renderedAlertDialogComponent).not.toBeInTheDocument()
  })

  it('should show alert dialog', () => {
    // Given
    render(
      <AlertDialog
        message={'This is a message'}
        title={'This is a title'}
        visible={true}
        actions={{
          main: {
            color: 'success',
            text: 'OK',
            onPress: () => ({}),
          },
        }}
      />,
    )

    // When
    const renderedAlertDialogComponent = screen.queryByRole('button', { name: 'OK' })

    // Then
    expect(renderedAlertDialogComponent).toBeInTheDocument()
  })
})
