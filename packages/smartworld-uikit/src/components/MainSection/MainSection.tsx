import React, { useState } from 'react'
import { Menu, useWindowSize } from '../..'
import { RelativeFlex, Flex } from '../Box'
import { Container } from './Component'
import { useTransition, animated } from 'react-spring'
import { MainSectionProps } from './types'
import { useHistory, useLocation } from 'react-router'
import { Spinner } from '../Spinner'

const defaultToggle = {
  showTip: false,
  showRight: false,
  showLeft: false,
}

export const MainContext = React.createContext(defaultToggle)

const MainSection: React.FC<MainSectionProps> = ({
  initialValue,
  config,
  loading = false,
  list,
  right,
  rightIcon,
  left,
  leftIcon,
  children,
  skeleton,
  background = 'transparent',
  menuBackground,
  mainBackground,
  transition = {},
  refFunc,
  ...rest
}) => {
  const [animLoading, setAnimLoading] = useState(true)
  const { width, isMobile, isTablet, flexSize } = useWindowSize(initialValue, setAnimLoading)
  const [toggle, setToggle] = useState(defaultToggle)
  const history = useHistory()
  const location = useLocation()
  const pathname = location.pathname

  const toggleHandler = (item: keyof typeof defaultToggle) => {
    setToggle((prev) => ({ ...defaultToggle, [item]: !prev[item] }))
  }

  const { showLeft, showRight, showTip } = toggle

  const responsiveSize = (w: number, toggle = true) => ({
    height: toggle ? flexSize * w : 0,
    width: '100%',
  })

  const transitions = useTransition(location, {
    key: pathname,
    config,
    from: { opacity: 0, marginTop: '-300px' },
    enter: { opacity: 1, marginTop: '0px' },
    leave: { opacity: 0, marginTop: '-150px' },
    onStart: () => setAnimLoading(true),
    onRest: () => setAnimLoading(false),
    ...(transition as any),
  })

  const changePage = (value: string) => {
    setToggle(defaultToggle)
    history.push(value)
  }

  const findPath = () => (list.links.some((link) => link.path.some((p) => p === pathname)) ? pathname : list.default)

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

  const divRef = (ref: any) => (animLoading ? ref?.scrollIntoView({ behavior: 'smooth' }) : undefined)

  return (
    <MainContext.Provider value={toggle}>
      <Flex
        background={background}
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        flexDirection="column"
        ref={refFunc}
        {...rest}
      >
        <RelativeFlex width={width}>
          {transitions((style, _1, _2, key) => (
            <animated.div key={key} style={{ ...style, width: '100%' }}>
              {animLoading ? (
                <Container flexDirection="column-reverse" height="100%" background={mainBackground}>
                  {skeleton ? skeleton : <Spinner />}
                </Container>
              ) : (
                <Container flexDirection="column-reverse" height="100%" background={mainBackground}>
                  {right && right(rightProps)}
                  {left && left(leftProps)}
                  {children}
                </Container>
              )}
            </animated.div>
          ))}
        </RelativeFlex>
        <Menu
          width={width}
          background={menuBackground}
          onChange={changePage}
          list={list}
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
        <div ref={divRef} />
      </Flex>
    </MainContext.Provider>
  )
}

export default MainSection
