import React, { useState, useRef, useLayoutEffect } from 'react'
import { useTransition, animated } from 'react-spring'
import { useHistory } from 'react-router'
import { Menu, useWindowSize } from '../..'
import { Container } from './Component'
import { MainSectionProps } from './types'
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
  header,
  location,
  computedMatch,
  loading,
  ...rest
}) => {
  const [animLoading, setAnimLoading] = useState(true)
  const { width, isMobile, isTablet, flexSize } = useWindowSize(initialValue, setAnimLoading)
  const [toggle, setToggle] = useState(defaultToggle)
  const history = useHistory()
  const { pathname } = location as Location

  const divRef = useRef<HTMLDivElement>(null)

  const toggleHandler = (item: keyof typeof defaultToggle) => {
    setToggle((prev) => ({ ...defaultToggle, [item]: !prev[item] }))
    setTimeout(() => {
      divRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 500)
  }

  const { showLeft, showRight, showTip } = toggle

  const responsiveSize = (w: number, toggles = true) => ({
    height: toggles ? flexSize * w : 0,
    width: '100%',
  })

  const transitions = useTransition(location, {
    key: pathname,
    config,
    from: { opacity: 0, marginTop: '-300px' },
    enter: { opacity: 1, marginTop: '0px' },
    leave: { opacity: 0, marginTop: '-150px' },
    onRest: () => divRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }),
    ...(transition as any),
  })

  const changePage = (value: string) => {
    setToggle(defaultToggle)
    history.push(value)
  }

  const findPath = () => (list?.links.some((link) => link.path.some((p) => p === pathname)) ? pathname : list?.default)

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
    <MainContext.Provider value={toggle}>
      {transitions((style, _1, _2, key) => (
        <animated.div
          ref={refFunc}
          key={key}
          style={{ position: 'absolute', top: 0, left: 0, background, width: '100%', ...style }}
          {...rest}
        >
          {loading || animLoading ? (
            <Container flexDirection="column-reverse" background={mainBackground}>
              {skeleton || <Spinner />}
            </Container>
          ) : (
            <Container flexDirection="column-reverse" background={mainBackground}>
              {right && right(rightProps)}
              {left && left(leftProps)}
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
              {children}
            </Container>
          )}
          <div ref={divRef}>{header}</div>
        </animated.div>
      ))}
    </MainContext.Provider>
  )
}

export default MainSection
