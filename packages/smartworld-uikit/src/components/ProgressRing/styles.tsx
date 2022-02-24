import styled, { css, Keyframes, keyframes } from 'styled-components'
import { variant } from 'styled-system'
import { ShadowSvg } from '../Svg'
import { colorVariant1, colorVariant2 } from './theme'

export const loading = (offset: number): Keyframes => keyframes`
  0%, 25% {
    stroke: #fe1d4d;
    stroke-dashoffset: ${offset};
    transform: rotate(-90deg);
  }
  50% {
    stroke-dashoffset: ${offset / 5};
    transform: rotate(-45deg);
  }
  75% {
    stroke: #19e285;
  }
  100% {
    stroke: #19e285;
    stroke-dashoffset: ${offset};
    transform: rotate(270deg);
  }
`

export const StyledRing = styled(ShadowSvg)<{ $animation: boolean; $offset: number }>`
  overflow: visible;
  & > circle:nth-child(3) {
    ${variant({
      variants: colorVariant1,
    })}
  }

  & > circle:nth-child(4) {
    ${({ $animation, $offset }) =>
      $animation
        ? css`
            animation: 1.5s ease-in-out infinite both ${loading($offset)};
          `
        : css`
            transform: rotate(-90deg);
          `};
    stroke-linecap: round;
    fill: transparent;
    transition: stroke-dashoffset 0.35s;
    transform-origin: 50% 50%;
    ${variant({
      variants: colorVariant2,
    })}
  }
`
