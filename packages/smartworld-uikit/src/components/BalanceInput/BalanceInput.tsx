import { debounce } from 'lodash'
import React, { ReactText } from 'react'
import { useTheme } from 'styled-components'
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
  value,
  maxValue = '0',
  placeholder = '0.0',
  onUserInput,
  onUnitClick,
  onLogoClick,
  onImageError,
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
  borderColor = 'white',
  progressColor,
  position,
  disabled = false,
  disabledKnob = false,
  debounceTime = 100,
  maxWait = 100,
  ...props
}) => {
  const { colors } = useTheme()

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      onUserInput(e.currentTarget.value.replace(/,/g, '.'))
    }
  }
  const handleChangeRange = (val: any) => {
    onUserInput(percentToValue(val, maxValue))
  }

  const percentToValue = (val: ReactText, per: ReactText = 0) => ((+val * +per) / 100).toFixed(decimals)

  const valueToPercent = () => +((+value / +maxValue) * 100)

  const maxButtonHandler = () => {
    if (maxValue) onUserInput(maxValue.toString())
  }

  const sizeCalc = (divide: number = 1, minus: number = 0) => (size ? Number(size) : 150) / divide - minus

  return (
    <RelativeFlex width={sizeCalc()} height={sizeCalc(0.95)} {...props}>
      <AbsoluteFlex top={0} left={0} width={sizeCalc()} height={sizeCalc(0.95)}>
        <RelativeFlex
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          width={sizeCalc(3)}
          margin="auto"
          height={sizeCalc(1.7)}
        >
          <AbsoluteFlex top={-sizeCalc(30) + 'px'}>
            <UnitContainer
              shadowSize={sizeCalc(100) + 'px'}
              onClick={onUnitClick}
              zIndex={2}
              fontWeight="bold"
              fontSize={sizeCalc(12) + 'px'}
            >
              {unit}
            </UnitContainer>
          </AbsoluteFlex>
          <AbsoluteFlex top={sizeCalc(5) + 'px'} width={sizeCalc(1.4)}>
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
                  pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
                  inputMode="decimal"
                  min="0"
                  height={sizeCalc(6.5)}
                  value={value ? value : ''}
                  onChange={handleOnChange}
                  placeholder={placeholder}
                  ref={innerRef}
                  disabled={disabled}
                  {...inputProps}
                />
              </InputGroup>
              <Flex zIndex={2} justifyContent="flex-end">
                <ShadowedText shadowSize={sizeCalc(100) + 'px'} fontSize={sizeCalc(15) + 'px'}>
                  {currencyValue ?? currencyValue}
                </ShadowedText>
                <ShadowedText
                  shadowSize={sizeCalc(100) + 'px'}
                  fontWeight="bold"
                  ml="3px"
                  fontSize={sizeCalc(15) + 'px'}
                >
                  {currencyUnit ?? currencyUnit}
                </ShadowedText>
              </Flex>
            </Flex>
          </AbsoluteFlex>
          {maxValue && (
            <AbsoluteFlex bottom={-sizeCalc(15) + 'px'}>
              <ShadowedButton
                shadowSize={sizeCalc(100) + 'px'}
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
          )}
        </RelativeFlex>
      </AbsoluteFlex>
      <StyledCircleSlider
        value={valueToPercent()}
        size={sizeCalc()}
        progressWidth={progressSize ? progressSize : sizeCalc(25)}
        knobWidth={progressSize ? progressSize : sizeCalc(30)}
        circleWidth={borderSize ? borderSize : sizeCalc(25)}
        knobRadius={disabledKnob || disabled ? 0 : knobSize ? knobSize : sizeCalc(17)}
        onInputChange={debounce(handleChangeRange, debounceTime, { maxWait })}
        knobColor={knobColor ? knobColor : 'white'}
        progressColor={isWarning ? colors.failure : progressColor ? progressColor : colors.primary}
        insideColor={color ? color : colors.tertiary}
        circleColor={isWarning ? colors.failure : borderColor}
        disabled={disabledKnob || disabled}
        image={image}
        onImageError={onImageError}
      />
    </RelativeFlex>
  )
}

export default BalanceInput
