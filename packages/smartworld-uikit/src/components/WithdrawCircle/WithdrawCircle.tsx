import React from 'react'
import { useTheme } from 'styled-components'
import { Flex, RelativeFlex } from '../Box'
import { ProgressRing } from '../ProgressRing'
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
  borderSize,
  color,
  loading,
  borderColor,
  disabled = false,
}) => {
  const { colors } = useTheme()

  const sizeCalc = (divide = 1) => (size ? Number(size) : 150) / divide

  return (
    <ProgressRing
      progress={loading ? undefined : percent}
      size={sizeCalc()}
      circleWidth={borderSize || sizeCalc(30)}
      insideColor={color || colors.tertiary}
      circleColor={isWarning ? colors.warning : borderColor}
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
        <StyledFlex width={sizeCalc(1.3)} mt={sizeCalc(18)} justifyContent="end">
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
    </ProgressRing>
  )
}

export default WithdrawCircle
