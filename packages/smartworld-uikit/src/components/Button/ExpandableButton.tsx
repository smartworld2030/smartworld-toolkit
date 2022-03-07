import React from 'react'
import styled, { keyframes } from 'styled-components'
import { variant } from 'styled-system'
import { IconButtonProps } from './types'
import { ChevronDownIcon, ChevronUpIcon } from '../Svg'
import Button from './Button'
import IconButton from './IconButton'
import { scaleVariants } from './theme'

const loading = keyframes`
  0%, 25% {
    border-color: #fe1d4d;
  }
  50% {
    border-style: solid;
  }
  75% {
    border-color: #19e285;
  }
  100% {
    border-color: #19e285;
  }
`

const pathLoading = keyframes`
  0%, 25% {
    stroke: #fe1d4d;
  }
  75% {
    stroke: #19e285;
  }
  100% {
    stroke: #19e285;
  }
`

const ProgressingIconBorder = styled(IconButton)<IconButtonProps>`
  animation: ${({ animation }) => animation && loading} 2s linear infinite both;
`

const UpAnimatedIcon = styled(ChevronUpIcon)<IconButtonProps>`
  animation: ${({ animation }) => animation && pathLoading} 2s linear infinite both;
`

const DownAnimatedIcon = styled(ChevronDownIcon)<IconButtonProps>`
  animation: ${({ animation }) => animation && pathLoading} 2s linear infinite both;
`

interface Props extends IconButtonProps {
  onClick?: () => void
  expanded?: boolean
  animation?: boolean
  iconAnimation?: boolean
}

export const ExpandableButton: React.FC<Props> = ({
  onClick,
  expanded,
  borderWidth,
  size,
  scale,
  children,
  animation,
  iconAnimation,
  ...rest
}) => {
  const { height, borderWidth: bw } = variant({
    prop: 'scale',
    variants: scaleVariants,
  })({ scale })

  const sizeCalc = size || height.replace('px', '')
  const s = borderWidth || bw.replace('px', '')

  return (
    <ProgressingIconBorder
      aria-label="Hide or show expandable content"
      onClick={onClick}
      blur={false}
      color="text"
      size={sizeCalc}
      borderWidth={s}
      scale={scale}
      animation={animation}
      icon={(w: number) =>
        expanded ? (
          <UpAnimatedIcon animation={iconAnimation} fill="none" width={w} />
        ) : (
          <DownAnimatedIcon animation={iconAnimation} fill="none" width={w} />
        )
      }
      {...rest}
    >
      {children}
    </ProgressingIconBorder>
  )
}
ExpandableButton.defaultProps = {
  expanded: false,
  scale: 'md',
}

export const ExpandableLabel: React.FC<Props> = ({ onClick, expanded, children }) => {
  return (
    <Button
      variant="text"
      aria-label="Hide or show expandable content"
      onClick={onClick}
      endIcon={expanded ? <ChevronUpIcon color="primary" /> : <ChevronDownIcon color="primary" />}
    >
      {children}
    </Button>
  )
}
ExpandableLabel.defaultProps = {
  expanded: false,
}
