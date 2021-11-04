import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = ({ color, ...rest }) => {
  return (
    <Svg viewBox="0 0 20 17" {...rest}>
      <path d="M1.74842 16L10 1.97231L18.2516 16H1.74842Z" fill="none" stroke={color} strokeWidth="2" />
    </Svg>
  )
}

export default Icon
