import { debounce } from 'lodash'
import React, { ReactText, useCallback, useMemo } from 'react'
import { useTheme } from 'styled-components'
import getFixedDecimals from '../../util/getFixedDecimals'
import { AbsoluteFlex, Flex, RelativeFlex } from '../Box'
import { InputGroup } from '../Input'
import { SwapVertIcon } from '../Svg'
import {
  UnitContainer,
  SwitchUnitsButton,
  StyledInput,
  StyledCircleSlider,
  ShadowedText,
  ShadowedButton,
} from './styles'
import { BalanceInputProps } from './types'

const BalanceInput: React.FC<BalanceInputProps> = ({
  id,
  token,
  value,
  maxValue = 0,
  balance = 0,
  placeholder = '0.0',
  onUserInput = () => null,
  onUnitClick,
  onLogoClick,
  onSelect,
  currencyValue,
  currencyUnit,
  inputProps,
  innerRef,
  isWarning = false,
  decimals = 8,
  unit,
  switchEditingUnits,
  size = 150,
  progressSize,
  borderSize,
  knobSize,
  color,
  logo,
  image,
  knobColor,
  borderColor,
  insideColor,
  progressColor = 'red',
  disabled = false,
  disabledKnob = false,
  debounceTime = 100,
  maxWait = 100,
  selectable,
  loading,
  logoURI,
  blur = 2,
  ...rest
}) => {
  const { colors } = useTheme()
  const tokenBalance = balance || maxValue

  const tokenDecimals = token?.decimals || decimals

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      onUserInput(e.currentTarget.value.replace(/,/g, '.'))
    }
  }
  const percentToValue = (val?: ReactText, per: ReactText = 0) =>
    val ? getFixedDecimals(((+val * +per) / 100).toFixed(decimals)) : '0'

  const handleChangeRange = (val?: ReactText) => {
    onUserInput(percentToValue(val, tokenBalance))
  }

  const valueToPercent = useMemo(() => +((+value / +tokenBalance) * 100), [tokenBalance, value])

  const maxButtonHandler = () => {
    if (tokenBalance) onUserInput(tokenBalance.toString())
  }

  const sizeCalc = useCallback(
    (divide = 1, minus = 0) => Number(((size ? Number(size) : 150) / divide - minus).toFixed(2)),
    [size],
  )

  const shadowSize = useMemo(() => sizeCalc(300), [sizeCalc])

  const isDisabled = disabledKnob || disabled || (!loading && !tokenBalance)

  const colorCompiler = useCallback(
    (item?: string, primary = false) => {
      if (isDisabled) return colors.disabled
      if (isWarning) return colors.failure
      return item || primary ? colors.primary : colors.input
    },
    [isDisabled, colors.disabled, colors.failure, colors.primary, colors.input, isWarning],
  )

  return (
    <RelativeFlex overflow="visible" width={sizeCalc()} height={sizeCalc(0.95)} {...rest}>
      <AbsoluteFlex overflow="visible" top={0} left={0} width={sizeCalc()} height={sizeCalc(0.95)}>
        <RelativeFlex
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          width={sizeCalc(3)}
          margin="auto"
          height={sizeCalc(1.7)}
        >
          <AbsoluteFlex top={`${-sizeCalc(30)}px`}>
            <UnitContainer
              shadowSize={shadowSize > 1 ? shadowSize : 1}
              onClick={onUnitClick}
              zIndex={2}
              fontWeight="bold"
              fontSize={`${sizeCalc(10)}px`}
            >
              {unit || token?.symbol}
            </UnitContainer>
          </AbsoluteFlex>
          <AbsoluteFlex top={`${sizeCalc(5)}px`} width={sizeCalc(1.4)}>
            <Flex zIndex={2} flexDirection="column" justifyContent="center">
              <InputGroup
                scale="none"
                startIcon={
                  logo && (
                    <SwitchUnitsButton variant="text" width={sizeCalc(9)} height={sizeCalc(6.5)} onClick={onLogoClick}>
                      {logo}
                    </SwitchUnitsButton>
                  )
                }
                maxWidth={sizeCalc(1.4)}
                endIcon={
                  switchEditingUnits && (
                    <SwitchUnitsButton
                      variant="text"
                      width={sizeCalc(9)}
                      height={sizeCalc(6.5)}
                      onClick={switchEditingUnits}
                      endIcon
                    >
                      <SwapVertIcon color="primary" width={sizeCalc(10)} />
                    </SwitchUnitsButton>
                  )
                }
              >
                <StyledInput
                  pattern={`^[0-9]*[.,]?[0-9]{0,${tokenDecimals}}$`}
                  inputMode="decimal"
                  min="0"
                  height={sizeCalc(6.5)}
                  value={value || ''}
                  onChange={handleOnChange}
                  placeholder={placeholder}
                  ref={innerRef}
                  disabled={disabled}
                  {...inputProps}
                />
              </InputGroup>
              <Flex zIndex={2} justifyContent="flex-end">
                <ShadowedText shadowSize={shadowSize > 1 ? shadowSize : 1} fontSize={`${sizeCalc(15)}px`}>
                  {currencyValue ?? currencyValue}
                </ShadowedText>
                <ShadowedText
                  shadowSize={shadowSize > 1 ? shadowSize : 1}
                  fontWeight="bold"
                  ml="3px"
                  fontSize={`${sizeCalc(15)}px`}
                >
                  {currencyUnit ?? currencyUnit}
                </ShadowedText>
              </Flex>
            </Flex>
          </AbsoluteFlex>
          {tokenBalance ? (
            <AbsoluteFlex bottom={`${-sizeCalc(18)}px`}>
              <ShadowedButton
                shadowSize={shadowSize > 1 ? shadowSize : 1}
                zIndex={2}
                disabled={disabled}
                variant="text"
                fontWeight="bold"
                onClick={maxButtonHandler}
                height={sizeCalc(8)}
                fontSize={sizeCalc(12)}
              >
                MAX
              </ShadowedButton>
            </AbsoluteFlex>
          ) : (
            selectable && (
              <AbsoluteFlex bottom={`${-sizeCalc(18)}px`}>
                <ShadowedButton
                  shadowSize={`${sizeCalc(100)}px`}
                  zIndex={2}
                  disabled={disabled}
                  variant="text"
                  fontWeight="bold"
                  onClick={onSelect}
                  height={sizeCalc(8)}
                  fontSize={sizeCalc(12)}
                >
                  SELECT
                </ShadowedButton>
              </AbsoluteFlex>
            )
          )}
        </RelativeFlex>
      </AbsoluteFlex>
      <StyledCircleSlider
        id={id}
        value={valueToPercent}
        size={sizeCalc()}
        blur={blur}
        progressWidth={progressSize || sizeCalc(25)}
        knobWidth={progressSize || sizeCalc(30)}
        circleWidth={borderSize || sizeCalc(25)}
        knobRadius={isDisabled ? 0 : knobSize || sizeCalc(17)}
        onInputChange={debounce((val) => handleChangeRange(val), debounceTime, { maxWait })}
        knobColor={knobColor}
        progressColor={colorCompiler(progressColor, true)}
        insideColor={insideColor || color || colors.tertiary}
        circleColor={colorCompiler(borderColor)}
        disabled={isDisabled}
        image={image || logoURI || token?.logoURI}
        loading={loading}
      />
    </RelativeFlex>
  )
}

export default BalanceInput
