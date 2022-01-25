import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps & { shadow?: boolean }> = ({ shadow, id, ...rest }) => {
  return (
    <Svg viewBox="0 0 20 17" {...rest} overflow="visible">
      {shadow && (
        <defs>
          <filter id={id} filterUnits="userSpaceOnUse">
            <feGaussianBlur in="SourceAlpha" stdDeviation="0.5" />
            <feOffset dx="0" dy="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}
      <path d="M1.74842 16L10 1.97231L18.2516 16H1.74842Z" strokeWidth="2" filter={shadow ? `url(#${id})` : 'none'} />
    </Svg>
  )
}

export default Icon
