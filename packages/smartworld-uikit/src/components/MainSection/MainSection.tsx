import React, { useState } from 'react'
import { Menu, useWindowSize } from '../..'
import { RelativeFlex, Flex } from '../Box'
import { Container } from './Component'
import { useTransition, animated } from 'react-spring'
import { MainSectionProps } from './types'
import { useHistory, useLocation } from 'react-router'

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
  links,
  right,
  rightIcon,
  left,
  leftIcon,
  children,
  background = 'transparent',
  menuBackground,
  transition = {},
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

  const divRef = (ref: any) => ref?.scrollIntoView({ behavior: 'smooth' })

  return (
    <MainContext.Provider value={toggle}>
      <Flex
        background={background}
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        flexDirection="column"
        {...rest}
      >
        <RelativeFlex width={width}>
          {transitions((style, _1, _2, key) => (
            <animated.div key={key} style={{ ...style, width: '100%' }}>
              <Container flexDirection="column-reverse" height="100%">
                {right && right(rightProps)}
                {left && left(leftProps)}
                {children}
              </Container>
            </animated.div>
          ))}
        </RelativeFlex>
        <Menu
          width={width}
          background={menuBackground}
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
        <div ref={divRef} />
      </Flex>
    </MainContext.Provider>
  )
}

export default MainSection
