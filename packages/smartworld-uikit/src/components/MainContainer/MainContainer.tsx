import React from 'react'
import { useContainerSize } from '../..'
import { AnimatedFlex } from '../Box'
import { Container, FlexWithTip } from './Component'
import { MainContainerProps } from './types'
import { Childrens } from '.'

const MainContainer: React.FC<MainContainerProps> = ({
  backgroundColor = 'black',
  initialValue = {
    screen: 'md',
    width: 1000,
    isMobile: false,
    minHeight: 300,
    flex: 30,
  },
  showTip = false,
  right,
  left,
  children,
  ...rest
}) => {
  const {
    ref,
    sizes: { isMobile, isTablet, screen, flex, minHeight },
  } = useContainerSize(initialValue)

  const responsiveSize = (w: number, toggle: boolean = true) => {
    return isMobile ? { height: toggle ? flex * w : 0 } : { width: toggle ? flex * w : 0 }
  }

  return (
    <Container ref={ref} flexDirection={isMobile ? 'column' : 'row'} minHeight={minHeight} {...rest}>
      {left && left({ flex, isMobile, responsiveSize })}
      {isMobile && right && right({ flex, isMobile, responsiveSize })}
      {flex &&
        children({ isMobile, isTablet, screen }).map(({ size, items, ...screens }: Childrens, i) => {
          const w = size ? (screens[screen] ? screens[screen]! : size) : 0
          const itemFlex = (flex * w) / 12
          return (
            <AnimatedFlex key={i} {...responsiveSize(w)} flexDirection={isMobile ? 'column' : 'row'} background="white">
              {items.map(({ item, tip, size, ...ss }, i) => {
                const w = ss[screen] ? ss[screen]! : size
                return (
                  <FlexWithTip
                    key={i}
                    showTip={showTip}
                    isMobile={isMobile}
                    size={itemFlex * w}
                    tip={tip?.item}
                    tipSize={tip?.size}
                  >
                    {item}
                  </FlexWithTip>
                )
              })}
            </AnimatedFlex>
          )
        })}
      {!isMobile && right && right({ flex, isMobile, responsiveSize })}
    </Container>
  )
}

export default MainContainer
