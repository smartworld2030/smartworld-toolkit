import React, { Children, ReactElement, useRef, useState, isValidElement } from 'react'
import { Menu, Spinner, useWindowSize } from '../..'
import { AnimatedFlex, RelativeFlex, Flex } from '../Box'
import { AbsoluteBody, Container, FlexWithTip } from './Component'
import { useTransition, animated } from 'react-spring'
import { MainSectionProps } from './types'
import { useHistory, useLocation } from 'react-router'
import recursiveRouteMap from '../../util/recursiveRouteMap'

const defaultToggle = {
  showTip: false,
  showRight: false,
  showLeft: false,
}

const MainSection: React.FC<MainSectionProps> = ({ children, ...rest }) => (
  <MainContiner {...rest}>{recursiveRouteMap(children)}</MainContiner>
)

const MainContiner: React.FC<MainSectionProps> = ({
  initialValue,
  config,
  loading = false,
  links,
  right,
  rightIcon,
  left,
  leftIcon,
  children,
  transition = {},
  ...rest
}) => {
  const counter = useRef(0)
  const [animLoading, setAnimLoading] = useState(true)
  const { height, width, isMobile, isTablet, screen, flexSize } = useWindowSize(initialValue, setAnimLoading)
  const [toggle, setToggle] = useState(defaultToggle)
  const history = useHistory()
  const location = useLocation()
  const pathname = location.pathname

  const toggleHandler = (item: keyof typeof defaultToggle) => {
    setToggle((prev) => ({ ...defaultToggle, [item]: !prev[item] }))
  }

  const { showLeft, showRight, showTip } = toggle
  const sideToggle = showLeft || showRight

  function responsiveSize(w: number, toggle = true) {
    return isMobile
      ? { height: toggle ? flexSize * w : 0, width: '100%' }
      : { width: toggle ? flexSize * w : 0, height: '100%' }
  }

  const transitions = useTransition(location, {
    key: pathname,
    config,
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    onStart: () => setAnimLoading(true),
    onRest: () => setAnimLoading(false),
    ...(transition as any),
  })

  const changePage = (value: string) => {
    setAnimLoading(true)
    setToggle(defaultToggle)
    history.push(value)
  }

  const findPath = () => (links.some((link) => link.href === pathname) ? pathname : links[0].href)

  const rightProps = { flexSize, toggle, isMobile, isTablet, responsiveSize }
  const leftProps = {
    flexSize,
    toggle,
    isMobile,
    isTablet,
    responsiveSize,
    showTip,
    tipChanger: () => toggleHandler('showTip'),
  }

  return (
    <Flex justifyContent="start" flexDirection="column" {...rest}>
      <Menu
        onChange={changePage}
        links={links}
        selected={findPath()}
        rightSide={
          rightIcon &&
          rightIcon({
            checked: showRight,
            onChange: () => toggleHandler('showRight'),
          })
        }
        leftSide={leftIcon && leftIcon({ checked: showLeft, onChange: () => toggleHandler('showLeft') })}
      />
      <RelativeFlex width={width} justifyContent={animLoading ? 'center' : 'start'}>
        {transitions((style, _1, _2, key) => (
          <AbsoluteBody width="100%">
            <animated.div key={key} style={{ ...style }}>
              <Container flexDirection={isMobile ? 'column' : 'row'} height={isMobile ? '100%' : height}>
                {Children.map(children, (child: ReactElement) => {
                  const { type: Comp, props } = child
                  const { children, comporder, ...rest } = props
                  counter.current = 0
                  return comporder === 1 ? (
                    <Comp {...rest}>
                      {isMobile && right && right(rightProps)}
                      {!isTablet && left && left(leftProps)}
                      {Children.map(children, (child: ReactElement) => {
                        const { flex = 12, children, comporder, ...rest } = child.props
                        const w = rest[screen] ? rest[screen]! : sideToggle ? flex - 1 : flex
                        const itemFlex = (flexSize * w) / 12
                        return comporder == 2 ? (
                          <AnimatedFlex
                            key={counter.current}
                            {...(responsiveSize(w), isTablet && { height: '50%' })}
                            flexDirection={isMobile ? 'column' : 'row'}
                            {...rest}
                          >
                            {isTablet && counter.current === 0 && left && left(leftProps)}
                            {Children.map(children, ({ props }: ReactElement, i) => {
                              const { tip, demo, tipSize, children, flex = 12, ...ss } = props
                              const w = ss[screen] ? ss[screen]! : flex
                              return animLoading || loading ? (
                                <AnimatedFlex
                                  key={i}
                                  {...(isMobile
                                    ? { width: '100%', height: w * itemFlex }
                                    : { width: w * itemFlex, height: '100%' })}
                                  {...ss}
                                >
                                  {demo ? demo : <Spinner />}
                                </AnimatedFlex>
                              ) : (
                                <FlexWithTip
                                  key={i}
                                  showTip={showTip}
                                  isMobile={isMobile}
                                  flex={w * itemFlex}
                                  tip={tip}
                                  tipSize={tipSize}
                                  {...ss}
                                >
                                  {children}
                                </FlexWithTip>
                              )
                            })}
                            {isTablet && counter.current++ === 0 && right && right(rightProps)}
                          </AnimatedFlex>
                        ) : (
                          child
                        )
                      })}
                      {!isMobile && !isTablet && right && right(rightProps)}
                    </Comp>
                  ) : (
                    child
                  )
                })}
              </Container>
            </animated.div>
          </AbsoluteBody>
        ))}
      </RelativeFlex>
    </Flex>
  )
}

export default MainSection
