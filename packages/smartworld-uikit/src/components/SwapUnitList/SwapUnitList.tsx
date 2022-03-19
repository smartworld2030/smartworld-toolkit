import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { BalanceInput } from '../BalanceInput'
import ListContainer from './styles'
import { Flex } from '../Box'
import { ExpandableButton } from '../Button'
import { SelectableToken, SelectableTokenProps } from '../SelectableToken'
import { SwapUnitListProps } from './types'

const SwapUnitList: React.FC<SwapUnitListProps> = ({
  size,
  listWidth = 1,
  listHeight = 2.5,
  animationTime = 500,
  listBackground = 'background',
  scrollSize = 8,
  unit,
  token,
  topElement,
  bottomElement,
  defaultSelected = 0,
  showList = false,
  tokenList,
  setShowList = () => null,
  onUnitSelect = () => null,
  onTokenSelect,
  onMissClick,
  ...rest
}) => {
  const listRef = useRef<HTMLDivElement>(null)
  const selectRef = useRef<HTMLDivElement>(null)

  const animation = useRef<number>()

  const clickHandler = useCallback(
    (e) => {
      const list = listRef.current?.contains(e.target)
      const select = selectRef.current?.contains(e.target)
      if (!select && !list) {
        if (onMissClick) onMissClick()
        else setShowList(false)
      }
    },
    [onMissClick, setShowList],
  )

  useEffect(() => {
    const id = `selectable-token-${defaultSelected}`
    const timer = window.setTimeout(() => {
      listRef.current?.children[id]?.scrollIntoView({
        block: 'center',
        inline: 'center',
      })
    })
    return () => clearTimeout(timer)
  }, [defaultSelected])

  useLayoutEffect(() => {
    document.addEventListener('click', clickHandler)
    return () => {
      document.removeEventListener('click', clickHandler)
    }
  }, [clickHandler])

  const onClick = useCallback(
    (item: string, t?: SelectableTokenProps, id = 'selectable-token-0') => {
      if (onTokenSelect && !animation.current) {
        onUnitSelect(item)
        onTokenSelect(t)
        listRef.current?.children[id]?.scrollIntoView({
          block: 'center',
          inline: 'center',
          behavior: 'smooth',
        })
        animation.current = window.setTimeout(() => {
          setShowList(false)
          setTimeout(() => {
            animation.current = 0
          }, animationTime)
        }, animationTime)
      }
    },
    [setShowList, onUnitSelect, onTokenSelect, animationTime],
  )

  const sizeCalc = useCallback(
    (divide = 1, minus = 0) => Number(((size ? Number(size) : 150) / divide - minus).toFixed()),
    [size],
  )

  return (
    <Flex
      width={sizeCalc()}
      height={sizeCalc(0.95)}
      position="relative"
      alignItems="center"
      justifyContent="space-between"
    >
      <ListContainer
        id="list-item"
        ref={listRef}
        scrollSize={scrollSize}
        $width={sizeCalc(1, -scrollSize)}
        $height={sizeCalc(0.95)}
        listWidth={listWidth}
        listHeight={listHeight}
        animationTime={animationTime}
        variant={listBackground}
        out={!showList}
      >
        {topElement && <Flex>{topElement}</Flex>}
        {tokenList.map((item, i) => (
          <div
            aria-hidden="true"
            key={item.id || `selectable-token-${i}`}
            id={item.id || `selectable-token-${i}`}
            onClick={() =>
              item.onTextClick
                ? undefined
                : onClick(
                    item.token?.address || item.symbol || item.unit || '',
                    item,
                    item.id || `selectable-token-${i}`,
                  )
            }
          >
            <SelectableToken size={sizeCalc()} {...item} />
          </div>
        ))}
        {bottomElement && bottomElement}
      </ListContainer>
      <BalanceInput
        size={sizeCalc()}
        insideColor="white"
        onUnitClick={() => {
          setShowList(true)
        }}
        unit={
          <Flex ref={selectRef} alignItems="center">
            {token?.symbol || unit || 'Select'}
            <ExpandableButton width={sizeCalc(13)} borderWidth={2} ml={1} animation={!(token?.symbol || unit)} />
          </Flex>
        }
        token={token}
        {...rest}
      />
    </Flex>
  )
}

export default SwapUnitList
