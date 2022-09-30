import { Button, Swap } from '@/components/atoms'
import { MoonIcon, SunIcon } from '@/components/atoms/primitives/icons'
import { useTheme } from '@/hooks/use-theme'
import debounce from 'lodash.debounce'
import React, { useEffect, useState } from 'react'

const ChangeTheme = () => {
  const { toggle, theme } = useTheme()
  // const active = theme === 'light' // If theme is light, then active is true and the icon is the SunIcon
  const [active, setActive] = useState(theme === 'light')

  const handleClick = () => {
    toggle()
    setActive(theme === 'light')
  }

  useEffect(() => {
    setActive(theme === 'light')
  }, [theme])

  const debouncedHandleClick = debounce(handleClick, 50)

  return (
    <Button
      color="ghost"
      className="p-1"
      responsive={false}
      onClick={debouncedHandleClick}
      dataTheme={theme}
    >
      <Swap
        onElement={<SunIcon />}
        active={active}
        offElement={<MoonIcon />}
        rotate
        className="p-1"
      />
    </Button>
  )
}

ChangeTheme.displayName = 'ChangeTheme'

export { ChangeTheme }
