import React, { forwardRef } from 'react'
import { InputProps, Mask } from './input.props'
import { useIMask } from 'react-imask'
import { useMergeRefs } from '@/hooks/use-merge-refs'

type MaskedInputProps = InputProps & Mask

const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  (props: MaskedInputProps, ref): JSX.Element => {
    const { options, onAccept, onComplete, ...rest } = props

    const { ref: imaskRef } = useIMask(options, {
      onComplete(value, maskRef) {
        onComplete && onComplete(value, maskRef)
      },
      onAccept(value, maskRef) {
        onAccept && onAccept(value, maskRef)
      },
    })

    const mergedRefs = useMergeRefs(imaskRef, ref)

    return <input {...rest} ref={mergedRefs} />
  },
)

MaskedInput.displayName = 'MaskedInput'

export { MaskedInput }
