import { ComponentColor, IComponentBaseProps } from '@/components/types'

export type AlertDialogAction = {
  color?: ComponentColor
  text: string
  onPress?: () => void
}

export type AlertDialogProps = IComponentBaseProps & {
  title?: string
  message?: string
  actions: {
    main: AlertDialogAction
    dismiss?: AlertDialogAction
  }
  visible: boolean
}
