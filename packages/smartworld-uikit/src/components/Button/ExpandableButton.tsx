import React from 'react'
import styled, { keyframes } from 'styled-components'
import { IconButtonProps } from './types'
import { ChevronDownIcon, ChevronUpIcon } from '../Svg'
import Button from './Button'
import IconButton from './IconButton'

const loading = keyframes`
  0%, 25% {
    border-color: #fe1d4d;
    border-style: dotted;
  }
  50% {
    border-style: solid;
  }
  75% {
    border-color: #19e285;
  }
  100% {
    border-color: #19e285;
    border-style: dotted;
  }
`

const ProgressingIconBorder = styled(IconButton)<IconButtonProps>`
  animation: ${loading} 2s linear infinite both;
`

interface Props extends IconButtonProps {
  onClick?: () => void
  expanded?: boolean
}

export const ExpandableButton: React.FC<Props> = ({ onClick, expanded, children, ...rest }) => {
  return (
    <ProgressingIconBorder
      aria-label="Hide or show expandable content"
      onClick={onClick}
      blur={false}
      color="text"
      icon={(w: number) => (expanded ? <ChevronUpIcon width={w} /> : <ChevronDownIcon width={w} />)}
      {...rest}
    >
      {children}
    </ProgressingIconBorder>
  )
}
ExpandableButton.defaultProps = {
  expanded: false,
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
