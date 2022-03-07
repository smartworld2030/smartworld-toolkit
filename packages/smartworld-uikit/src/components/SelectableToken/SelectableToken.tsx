import React, { useCallback, useMemo } from 'react'
import { AbsoluteFlex, Flex, RelativeFlex } from '../Box'
import { PointerRelativeFlex } from '../Box/Flex'
import { ProgressRing } from '../ProgressRing'
import { UnitContainer, StyledInput, ShadowedText, ShadowedButton } from './styles'
import { SelectableTokenBoxProps } from './types'

const SelectableToken: React.FC<SelectableTokenBoxProps> = (props) => {
  const {
    token,
    address,
    text = '',
    value = '0',
    maxValue,
    balance,
    variant,
    stroked = true,
    placeholder = '0.0',
    onTextClick,
    currencyValue,
    currencyUnit,
    inputProps,
    innerRef,
    unit,
    symbol,
    size = 150,
    disabled = false,
    image,
    logoURI,
    loading,
    ...rest
  } = props
  const sizeCalc = useCallback((divide = 1, minus = 0) => (size ? Number(size) : 150) / divide - minus, [size])

  const shadowSize = useMemo(() => sizeCalc(300), [sizeCalc])
  return (
    <PointerRelativeFlex width={sizeCalc()} height={sizeCalc(0.95)} {...rest}>
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
              shadowSize={shadowSize > 1 ? shadowSize : 1}
              zIndex={2}
              fontWeight="bold"
              fontSize={`${sizeCalc(10)}px`}
            >
              {token?.symbol || symbol || unit}
            </UnitContainer>
          </AbsoluteFlex>
          <AbsoluteFlex top={`${sizeCalc(5)}px`} width={sizeCalc(1.4)}>
            <Flex zIndex={2} flexDirection="column" justifyContent="center">
              <StyledInput
                min="0"
                height={sizeCalc(6.5)}
                value={balance || maxValue || value}
                placeholder={placeholder}
                ref={innerRef}
                disabled={disabled}
                onChange={() => null}
                {...inputProps}
              />
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
          <AbsoluteFlex bottom={`${-sizeCalc(30)}px`}>
            <ShadowedButton
              shadowSize={shadowSize > 1 ? shadowSize : 1}
              zIndex={2}
              disabled={disabled}
              variant="text"
              fontWeight="bold"
              height={sizeCalc(8)}
              fontSize={sizeCalc(12)}
              onClick={onTextClick}
            >
              {text}
            </ShadowedButton>
          </AbsoluteFlex>
        </RelativeFlex>
      </AbsoluteFlex>
      <ProgressRing
        id={token?.address?.toLowerCase() || address?.toLowerCase() || symbol?.toLowerCase() || unit?.toLowerCase()}
        insideColor="white"
        variant={variant}
        stroke={stroked ? sizeCalc(60) : undefined}
        size={sizeCalc()}
        blur="5px"
        image={token?.logoURI || logoURI || image}
        loading={loading}
      />
    </PointerRelativeFlex>
  )
}

export default SelectableToken
