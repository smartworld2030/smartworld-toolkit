import React from 'react'
import { AbsoluteFlex, Flex, RelativeFlex } from '../Box'
import { ProgressRing } from '../ProgressRing'
import { UnitContainer, StyledInput, ShadowedText, ShadowedButton } from './styles'
import { SelectableTokenProps } from './types'

const SelectableToken: React.FC<SelectableTokenProps> = (props) => {
  const {
    text = '',
    value = '0',
    maxValue,
    variant,
    stroked = true,
    placeholder = '0.0',
    onSelect,
    currencyValue,
    currencyUnit,
    inputProps,
    innerRef,
    unit,
    size = 150,
    disabled = false,
    image,
    onImageError,
    loading,
    ...rest
  } = props
  const sizeCalc = (divide = 1, minus = 0) => (size ? Number(size) : 150) / divide - minus

  return (
    <RelativeFlex width={sizeCalc()} height={sizeCalc(0.95)} id={unit} {...rest}>
      <AbsoluteFlex top={0} left={0} width={sizeCalc()} height={sizeCalc(0.95)}>
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
              shadowSize={`${sizeCalc(100)}px`}
              zIndex={2}
              fontWeight="bold"
              fontSize={`${sizeCalc(10)}px`}
            >
              {unit}
            </UnitContainer>
          </AbsoluteFlex>
          <AbsoluteFlex top={`${sizeCalc(5)}px`} width={sizeCalc(1.4)}>
            <Flex zIndex={2} flexDirection="column" justifyContent="center">
              <StyledInput
                min="0"
                height={sizeCalc(6.5)}
                value={maxValue || value}
                placeholder={placeholder}
                ref={innerRef}
                disabled={disabled}
                onChange={() => null}
                {...inputProps}
              />
              <Flex zIndex={2} justifyContent="flex-end">
                <ShadowedText shadowSize={`${sizeCalc(100)}px`} fontSize={`${sizeCalc(15)}px`}>
                  {currencyValue ?? currencyValue}
                </ShadowedText>
                <ShadowedText
                  shadowSize={`${sizeCalc(100)}px`}
                  fontWeight="bold"
                  ml="3px"
                  fontSize={`${sizeCalc(15)}px`}
                >
                  {currencyUnit ?? currencyUnit}
                </ShadowedText>
              </Flex>
            </Flex>
          </AbsoluteFlex>
          <AbsoluteFlex bottom={`${-sizeCalc(30)}px`}>
            <ShadowedButton
              shadowSize={`${sizeCalc(150)}px`}
              zIndex={2}
              disabled={disabled}
              variant="text"
              fontWeight="bold"
              height={sizeCalc(8)}
              fontSize={sizeCalc(12)}
              onClick={onSelect}
            >
              {text}
            </ShadowedButton>
          </AbsoluteFlex>
        </RelativeFlex>
      </AbsoluteFlex>
      <ProgressRing
        variant={variant}
        stroke={stroked ? sizeCalc(60) : undefined}
        size={sizeCalc()}
        blur="5px"
        onImageError={onImageError}
        image={image}
        loading={loading}
      />
    </RelativeFlex>
  )
}

export default SelectableToken
