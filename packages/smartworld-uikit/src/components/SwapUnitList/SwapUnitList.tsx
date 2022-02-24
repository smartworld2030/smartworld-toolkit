import React, { useEffect, useRef, useState } from 'react'
import { uniqueId } from 'lodash'
import { BalanceInput } from '../BalanceInput'
import ListContainer from './styles'
import { Flex } from '../Box'
import { ExpandableButton } from '../Button'
import { SelectableToken, Token } from '../SelectableToken'
import { SwapUnitListProps } from './types'

const SwapUnitList: React.FC<SwapUnitListProps> = ({
  width = 200,
  height = 400,
  background = 'background',
  unit,
  defaultSelected = 0,
  topElement,
  bottomElement,
  selectedItem = () => null,
  selectedToken = () => null,
  tokenList,
  children,
  ...rest
}) => {
  const tokenRef = useRef<HTMLCollection>()
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

  const onClick = (index: number, item: string, token?: Token) => {
    setSelected(index)
    selectedItem(item)
    selectedToken(token)
    setInSelection(false)
  }

  return (
    <Flex width={width} position="relative" alignItems="center" justifyContent="space-between">
      {inSelection && (
        <ListContainer
          ref={(ref) => {
            tokenRef.current = ref?.children
          }}
          variant={background}
          width={width}
          height={height}
        >
          {topElement && topElement}
          {tokenList?.map((item, i) => (
            <SelectableToken
              size={Number(width) - 40}
              onClick={() => onClick(i, item.token?.address || item.symbol || item.unit || '', item.token)}
              key={`${(item.token?.address || item.symbol || uniqueId()) + i}`}
              inputProps={{ inputMode: 'numeric' }}
              mb="5px"
              borderColor="orange"
              {...item}
            />
          ))}
          {children && children({ onClick })}
          {bottomElement && bottomElement}
        </ListContainer>
      )}
      <BalanceInput
        size={Number(width) - 30}
        onUnitClick={() => {
          setInSelection(true)
        }}
        {...tokenList?.[selected]}
        unit={
          <Flex alignItems="center">
            {unit || tokenList?.[selected]?.symbol || 'Select'}
            <ExpandableButton size="13" borderWidth={2} scale="xs" ml={1} />
          </Flex>
        }
        {...rest}
      />
    </Flex>
  )
}

export default SwapUnitList
