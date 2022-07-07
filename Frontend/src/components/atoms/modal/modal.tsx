import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { ModalProps } from './modal.props'

const Modal = forwardRef<HTMLDivElement, ModalProps>((modalProps: ModalProps, ref) => {
  const { children, open, onClickBackdrop, dataTheme, className, ...props } = modalProps

  const containerClasses = twMerge(
    'modal',
    clsx({
      'modal-open': open,
      'modal-bottom sm:modal-middle': true,
    }),
  )

  const contentClasses = twMerge('modal-box', className)

  return (
    <div
      aria-hidden={!open}
      aria-modal={open}
      data-theme={dataTheme}
      className={containerClasses}
      onClick={(e) => {
        e.stopPropagation()
        if (e.target === e.currentTarget) {
          e.stopPropagation()
          if (onClickBackdrop) {
            onClickBackdrop()
          }
        }
      }}
    >
      <div
        {...props}
        data-theme={dataTheme}
        data-testid="Modal"
        className={contentClasses}
        ref={ref}
      >
        {children}
      </div>
    </div>
  )
})

Modal.displayName = 'Modal'

export { Modal }
