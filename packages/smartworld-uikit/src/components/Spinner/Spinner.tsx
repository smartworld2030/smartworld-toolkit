import React from 'react'
import styled, { keyframes } from 'styled-components'
import SmartWorldIcon from './SmartWorldIcon'
import { SpinnerProps } from './types'

interface RotatingSmartWorld {
  left?: string
  top?: string
}

const rotateY = keyframes`
  0% {
    transform: rotateY(0deg) scale(1);
  }
  100% {
    transform: rotateY(360deg) scale(1.6);
  }
  0% {
    transform: rotateY(0deg) scale(1);
  }
`

const RotatingSmartWorldIcon = styled(SmartWorldIcon)<RotatingSmartWorld>`
  animation: ${rotateY} 1.5s alternate ease-in infinite;
  transform: translate3d(0, 0, 0);
`

const Spinner: React.FC<SpinnerProps> = ({ size = 128 }) => {
  return <RotatingSmartWorldIcon width={`${size * 0.8}px`} />
}

export default Spinner
