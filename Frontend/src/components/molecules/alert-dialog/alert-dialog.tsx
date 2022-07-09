import { Button, FlexBox, Modal, Text } from '@/components/atoms'
import React from 'react'
import { AlertDialogProps } from './alert-dialog.props'

const AlertDialog = (props: AlertDialogProps) => {
  const { actions, visible = false, message, title, dataTheme } = props

  return (
    <Modal open={visible} dataTheme={dataTheme} data-testid="AlertDialog">
      <FlexBox>
        {title && (
          <Text size="lg" bold={true}>
            {title}
          </Text>
        )}
        {message && <Text>{message}</Text>}
        <FlexBox flexDirection="row" justifyContent="flex-end" gap="1rem">
          {actions.dismiss && (
            <Button
              color={actions.dismiss.color}
              text={actions.dismiss.text}
              onClick={actions.dismiss.onPress}
            />
          )}
          <Button
            color={actions.main.color}
            text={actions.main.text}
            onClick={actions.main.onPress}
          />
        </FlexBox>
      </FlexBox>
    </Modal>
  )
}

AlertDialog.displayName = 'AlertDialog'

export { AlertDialog }
