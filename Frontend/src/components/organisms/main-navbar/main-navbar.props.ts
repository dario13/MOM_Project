import React from 'react'
import { Menu } from '@/components/atoms/dropdown/dropdown.props'
import { IComponentBaseProps } from '@/components/types'

export type MainNavbarProps = IComponentBaseProps & {
  menuItems: Menu
  logo: React.ReactNode
}
