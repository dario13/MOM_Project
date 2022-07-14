import { Menu } from '@/components/atoms/dropdown/dropdown.props'
import { IComponentBaseProps } from '@/components/types'

export type DropdownHamburgerProps = IComponentBaseProps & {
  menuItems: Menu
  open?: boolean
}
