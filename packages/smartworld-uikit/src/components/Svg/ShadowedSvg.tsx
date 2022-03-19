import styled from 'styled-components'
import { SpaceSvg } from './Svg'
import { getBoxShadows } from '../../theme/base'
import { ShadowSvgProps } from './types'

const ShadowSvg = styled(SpaceSvg)<ShadowSvgProps>`
  filter: drop-shadow(
    ${({ shadow, shadowSize, shadowColor, theme }) =>
      shadow && getBoxShadows(shadowColor || theme.colors.primary, shadowSize || 2)}
  );

  &:hover:not(:active):not(:disabled):not(.smartworld-svg--disabled):not(.smartworld-svg--no-slider):not(.smartworld-svg--loading) {
    filter: saturate(1.5)
      drop-shadow(${({ shadow, shadowSize, theme }) => shadow && getBoxShadows(theme.colors.primary, shadowSize || 2)});
  }

  &:active:not(:disabled):not(.smartworld-svg--disabled):not(.smartworld-svg--no-slider):not(.smartworld-svg--loading) {
    transform: translateY(1px);
    filter: saturate(1.5);
  }

  &.smartworld-svg--disabled {
    filter: grayscale(1);
  }
`
export default ShadowSvg
