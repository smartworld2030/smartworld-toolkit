import React, { FC } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { space } from 'styled-system'
import getThemeValue from '../../util/getThemeValue'
import { SvgEffectedProps, SvgProps } from './types'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const spinStyle = css`
  animation: ${rotate} 2s linear infinite;
`

export const SvgEffects: FC<SvgEffectedProps> = ({ radius, center, blur, ...rest }) => (
  <svg {...rest}>
    <defs>
      <filter id="sg-blur-2">
        <feGaussianBlur in="SourceGraphic" stdDeviation={blur} />
      </filter>
      <clipPath id={radius.toString()}>
        <circle r={radius} cx={center} cy={center} />
      </clipPath>
    </defs>
  </svg>
)

export const SpaceSvg = styled.svg<SvgProps>`
  align-self: center; // Safari fix
  fill: ${({ theme, color }) => getThemeValue(`colors.${color}`, color)(theme)};
  flex-shrink: 0;
  ${({ spin }) => spin && spinStyle}
`

const Svg = styled.svg<SvgProps>`
  align-self: center; // Safari fix
  fill: ${({ theme, color }) => getThemeValue(`colors.${color}`, color)(theme)};
  flex-shrink: 0;
  ${({ spin }) => spin && spinStyle}
  ${space}
`

Svg.defaultProps = {
  color: 'text',
  width: '20px',
  xmlns: 'http://www.w3.org/2000/svg',
  spin: false,
}

export default Svg
