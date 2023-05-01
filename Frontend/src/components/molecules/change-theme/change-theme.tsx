import { Button, Swap } from '@/components/atoms'
import { MoonIcon, SunIcon } from '@/components/atoms/primitives/icons'
import { DataTheme } from '@/components/types'
import { useTheme } from '@/hooks/use-theme'
import debounce from 'lodash.debounce'
import React, { useEffect, useState } from 'react'

const ChangeTheme = () => {
  const { toggle, theme } = useTheme()
  const [active, setActive] = useState(theme === DataTheme.light)

  const handleClick = () => {
    toggle()
    setActive(theme === DataTheme.light)
  }

  useEffect(() => {
    setActive(theme === DataTheme.light)
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
