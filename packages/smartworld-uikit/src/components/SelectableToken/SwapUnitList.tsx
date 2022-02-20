import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BalanceInput } from '../BalanceInput'
import { Flex } from '../Box'
import { ExpandableButton } from '../Button'
import SelectableToken from './SelectableToken'
import { StyledFlex } from './styles'
import { SwapUnitListProps } from './types'

const SwapUnitList: React.FC<SwapUnitListProps> = ({
  width = 200,
  height = 400,
  background = 'background',
  unit,
  topElement,
  bottomElement,
  selectedUnit,
  tokenList,
  ...rest
}) => {
  const tokenRef = useRef<HTMLCollection>()
  const defaultSelected = useMemo(() => tokenList.findIndex((item) => item.unit === unit), [tokenList, unit])

  const [inSelection, setInSelection] = useState(false)
  const [selected, setSelected] = useState(defaultSelected)

  useEffect(() => {
    if (tokenRef.current)
      tokenRef.current[selected]?.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center',
      })
  }, [inSelection, selected])

  return (
    <Flex width={width} position="relative" alignItems="center" justifyContent="space-between">
      {inSelection && (
        <StyledFlex
          ref={(ref) => {
            tokenRef.current = ref?.children
          }}
          variant={background}
          width={width}
          height={height}
        >
          {topElement && topElement}
          {tokenList.map((item, i) => (
            <SelectableToken
              loading
              size={Number(width) - 40}
              onClick={() => {
                setSelected(i)
                selectedUnit(item.unit)
                setInSelection(false)
              }}
              key={`${item.unit + i}`}
              inputProps={{ inputMode: 'numeric' }}
              mb="5px"
              borderColor="orange"
              {...item}
            />
          ))}
          {bottomElement && bottomElement}
        </StyledFlex>
      )}
      <BalanceInput
        size={Number(width) - 30}
        onUnitClick={() => {
          setInSelection(true)
        }}
        key={selected}
        {...tokenList[selected]}
        unit={
          <Flex alignItems="center">
            {unit || tokenList[selected]?.unit || 'Select'}
            <ExpandableButton size="13" borderWidth={2} scale="xs" ml={1} />
          </Flex>
        }
        {...rest}
      />
    </Flex>
  )
}

export default SwapUnitList
