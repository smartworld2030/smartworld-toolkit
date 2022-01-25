import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <path d="M 18 13 H 6 C 5.45 13 5 12.55 5 12 C 5 11.45 5.45 11 6 11 H 18 C 18.55 11 19 11.45 19 12 C 19 12.55 18.55 13 18 13 Z M 6 7 H 6 C 5.45 7 5 6.55 5 6 C 5 5.45 5.45 5 6 5 H 18 C 18.55 5 19 5.45 19 6 C 19 6.55 18.55 7 18 7 Z" />
    </Svg>
  )
}

export default Icon
