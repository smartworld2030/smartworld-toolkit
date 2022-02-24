import styled from 'styled-components'

const ShadowSvg = styled.svg<{ $blur?: number | false; $shadowColor?: string }>`
  filter: drop-shadow(
    0 0 ${({ theme, $shadowColor, $blur }) => $blur && `${$blur}px ${$shadowColor || theme.colors.primary}`}
  );
`
export default ShadowSvg
