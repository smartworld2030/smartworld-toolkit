import { ReactText } from 'react'
import styled from 'styled-components'
import Input from '../Input/Input'
import Text from '../Text/Text'
import { Button } from '../Button'
import { buttonShadows } from '../../theme/base'
import { Flex } from '../Box'

export const StyledFlex = styled(Flex)<{ width: ReactText; height: ReactText }>`
  overflow:auto;
  position:absolute;
  justify-content:space-between;
  align-items:center;
  flex-direction:column;
  --scrollbar-width: 8px;
  --mask-height: 32px;
  overflow-y: auto;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  padding-top: var(--mask-height);
  padding-bottom: var(--mask-height);
  padding-right: 20px;
  --mask-image-content: linear-gradient(
    to bottom,
    transparent,
    black var(--mask-height),
    black calc(100% - var(--mask-height)),
    transparent
  );
  --mask-size-content: calc(100% - var(--scrollbar-width)) 100%;

  --mask-image-scrollbar: linear-gradient(black, black);
  --mask-size-scrollbar: var(--scrollbar-width) 100%;
  mask-image: var(--mask-image-content), var(--mask-image-scrollbar);
  mask-size: var(--mask-size-content), var(--mask-size-scrollbar);

  mask-position: 0 0, 100% 0;
  mask-repeat: no-repeat, no-repeat;

  z-index: 20;
}`

export const ShadowedText = styled(Text)<{ shadowSize: string }>`
  text-shadow: ${({ theme, shadowSize }) => buttonShadows(theme.colors.background, shadowSize)};
}`

export const ShadowedButton = styled(Button)<{ shadowSize: string }>`
  text-shadow: ${({ theme, shadowSize }) => buttonShadows(theme.colors.background, shadowSize)};
}`

export const UnitContainer = styled(Text)<{ shadowSize: string }>`
  text-align: center;
  text-shadow: ${({ theme, shadowSize }) => buttonShadows(theme.colors.background, shadowSize)};
  color: ${({ theme }) => theme.colors.text};
  z-index: ${({ zIndex }) => zIndex};
  white-space: nowrap;
`

export const StyledInput = styled(Input)`
  border-radius: 0;
  box-shadow: none;
  padding-left: 0;
  padding-right: 0;
  height: ${({ height }) => height}px;
  text-align: center;
  font-size: ${({ height }) => (height ? +height / 2.5 : undefined)}px;
  border: 1px solid ${({ theme, isWarning }) => theme.colors[isWarning ? 'warning' : 'textDisabled']};
  border-radius: ${({ theme }) => theme.radii.default};

  ::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
  }

  &:focus:not(:disabled) {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.primary};
  }
`
