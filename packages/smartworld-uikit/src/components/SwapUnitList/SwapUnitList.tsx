import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { BalanceInput } from '../BalanceInput'
import ListContainer from './styles'
import { Box, Flex } from '../Box'
import { ExpandableButton } from '../Button'
import { SelectableToken, SelectableTokenProps } from '../SelectableToken'
import { SwapUnitListProps } from './types'

const SwapUnitList: React.FC<SwapUnitListProps> = ({
  size = 200,
  listWidth,
  listHeight,
  animationTime = 500,
  listBackground = 'background',
  unit,
  token,
  topElement,
  bottomElement,
  defaultSelected = 0,
  selectUnitHandler = () => null,
  selectTokenHandler = () => null,
  tokenList,
  ...rest
}) => {
  const tokenRef = useRef<HTMLDivElement>(null)
  const selectRef = useRef<HTMLDivElement>(null)
  const animation = useRef<number>()
  const [inSelection, setInSelection] = useState(false)

  const clickHandler = useCallback((e) => {
    const list = tokenRef.current?.contains(e.target)
    const select = selectRef.current?.contains(e.target)
    if (!select && !list) setInSelection(false)
  }, [])

  useEffect(() => {
    const id = `selectable-token-${defaultSelected}`
    tokenRef.current?.children[id].scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center',
    })
  }, [defaultSelected])

  useLayoutEffect(() => {
    document.addEventListener('click', clickHandler)
    return () => {
      document.removeEventListener('click', clickHandler)
    }
  }, [clickHandler])

  const onClick = useCallback(
    (item: string, t?: SelectableTokenProps, id = 'selectable-token-0') => {
      if (!animation.current) {
        selectUnitHandler(item)
        selectTokenHandler(t)
        tokenRef.current?.children[id].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        })
        animation.current = window.setTimeout(() => {
          setInSelection(false)
          setTimeout(() => {
            animation.current = 0
          }, animationTime)
        }, animationTime)
      }
    },
    [animationTime, selectTokenHandler, selectUnitHandler],
  )

  return (
    <Flex width={size} position="relative" alignItems="center" justifyContent="space-between">
      <ListContainer
        id="list-item"
        ref={tokenRef}
        animationTime={animationTime}
        variant={listBackground}
        width={listWidth || size}
        height={listHeight || size * 2}
        out={!inSelection}
      >
        <Box paddingTop={(Number(size) - 45) / 2} />
        {topElement && topElement}
        {tokenList.map((item, i) => (
          <Box
            key={item.id || `selectable-token-${i}`}
            id={item.id || `selectable-token-${i}`}
            onClick={() =>
              onClick(item.token?.address || item.symbol || item.unit || '', item, item.id || `selectable-token-${i}`)
            }
          >
            <SelectableToken
              size={Number(size) - 40}
              inputProps={{ inputMode: 'numeric' }}
              mb="5px"
              borderColor="orange"
              {...item}
            />
          </Box>
        ))}
        {bottomElement && bottomElement}
        <Box paddingBottom={(Number(size) - 45) / 2} />
      </ListContainer>
      <BalanceInput
        size={Number(size) - 30}
        insideColor="white"
        onUnitClick={() => {
          setInSelection(true)
        }}
        unit={
          <Flex ref={selectRef} alignItems="center">
            {token?.symbol || unit || 'Select'}
            <ExpandableButton width={Number(size) / 15} borderWidth={2} ml={1} />
          </Flex>
        }
        token={token}
        {...rest}
      />
    </Flex>
  )
}

export default SwapUnitList
