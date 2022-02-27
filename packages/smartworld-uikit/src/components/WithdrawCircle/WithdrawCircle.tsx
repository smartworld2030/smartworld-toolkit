import React from 'react'
import { useTheme } from 'styled-components'
import { Flex, RelativeFlex } from '../Box'
import { CircleSlider } from '../CircleSlider'
import Text from '../Text/Text'
import { StyledFlex, StyledButton } from './styles'
import { WithdrawCircleProps } from './types'

const WithdrawCircle: React.FC<WithdrawCircleProps> = ({
  name,
  percent,
  onClick,
  totalValue,
  totalValueUnit,
  buttonProps,
  topElement,
  bottomElement,
  isWarning = false,
  size = 150,
  progressSize,
  borderSize,
  color,
  loading,
  borderColor,
  progressColor,
  disabled = false,
}) => {
  const { colors } = useTheme()

  const sizeCalc = (divide = 1) => (size ? Number(size) : 150) / divide

  return (
    <CircleSlider
      value={percent}
      size={sizeCalc()}
      progressWidth={progressSize || sizeCalc(30)}
      circleWidth={borderSize || sizeCalc(30)}
      knobRadius={0}
      progressColor={isWarning ? colors.failure : progressColor || colors.primary}
      insideColor={color || colors.tertiary}
      circleColor={isWarning ? colors.failure : borderColor}
      noSlider
      loading={loading}
      id="withdraw"
    >
      <RelativeFlex
        padding={sizeCalc(15)}
        height={sizeCalc()}
        width={sizeCalc()}
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        margin="auto"
      >
        <StyledFlex width={sizeCalc(1.3)} justifyContent="center">
          {topElement && topElement}
        </StyledFlex>
        <StyledFlex width={sizeCalc(1.3)} justifyContent="end">
          <Flex justifyContent="center">
            <StyledButton
              margin="2px"
              height={sizeCalc(6)}
              width={sizeCalc(1.3)}
              onClick={onClick}
              disabled={disabled}
              variant="secondary"
              {...buttonProps}
            >
              {name || 'WITHRAW'}
            </StyledButton>
          </Flex>
          <Flex zIndex={2} overflow="hidden" justifyContent="flex-end" mt="-2px">
            <Text color="secondary" fontSize={`${sizeCalc(16)}px`}>
              {totalValue ?? totalValue}
            </Text>
            <Text color="secondary" fontWeight="bold" ml="3px" fontSize={`${sizeCalc(16)}px`}>
              {totalValueUnit ?? totalValueUnit}
            </Text>
          </Flex>
        </StyledFlex>
        <StyledFlex width={sizeCalc(1.3)} justifyContent="center">
          {bottomElement && bottomElement}
        </StyledFlex>
      </RelativeFlex>
    </CircleSlider>
  )
}

export default WithdrawCircle
