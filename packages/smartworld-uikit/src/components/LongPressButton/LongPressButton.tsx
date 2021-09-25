import React, { ReactNode, useState } from 'react'
import { useLongPress } from '../../hooks/useLongPress'
import { ButtonProps } from '../Button'
import AnimatedButton from './AnimatedButton'
import { Container } from './Component'

interface Props extends ButtonProps {
  onClick: () => void
  size?: number
  transition?: number
  successIcon?: ReactNode
}

const LongPressButton: React.FC<Props> = ({
  onClick,
  variant,
  successIcon,
  transition = 3000,
  size = 100,
  fontSize,
  children,
  ...rest
}) => {
  const [s, setStart] = useState(false)
  const startFunc = () => {
    setStart(true)
  }
  const endFunc = () => {
    setStart(false)
  }
  const doneFunc = () => {
    onClick()
  }
  let { done, props } = useLongPress(startFunc, endFunc, doneFunc, transition)
  return (
    <Container width={size * 2} height={size * 2}>
      <AnimatedButton
        done={done}
        size={size}
        transition={transition}
        animate={s}
        variant={done ? 'success' : variant}
        fontSize={fontSize ? fontSize : size / 10}
        {...props}
        {...rest}
      >
        {done ? (successIcon ? successIcon : children) : children}
      </AnimatedButton>
    </Container>
  )
}
LongPressButton.defaultProps = {
  variant: 'primary',
  shape: 'circle',
}

export default LongPressButton
