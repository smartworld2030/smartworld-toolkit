import React, { useState, useRef, useCallback, useMemo } from 'react'
import { useTransition } from 'react-spring'
import { Container, StyledAnimated } from './styles'
import { MainSectionProps } from './types'
import { Spinner } from '../Spinner'
import { MainSectionMenu } from './components'
import MainSectionContext, { defaultToggle } from './context'
import { useWindowSize } from '../../hooks'

const MainSection: React.FC<MainSectionProps> = ({
  config,
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
  loading,
  initialValue,
  computedMatch,
  ...rest
}) => {
  const sizes = useWindowSize(initialValue)
  const [toggle, setToggle] = useState(defaultToggle.toggle)

  const divRef = useRef<HTMLDivElement>(null)

  const toggleHandler = useCallback((item: keyof typeof defaultToggle.toggle) => {
    setToggle((prev) => ({ ...defaultToggle.toggle, [item]: !prev[item] }))
    setTimeout(() => {
      divRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 500)
  }, [])

  const { showLeft, showRight, showTip } = toggle

  const responsiveSize = useCallback(
    (flex: number, toggles = true) => ({
      height: toggles ? sizes.flexSize * flex : 0,
      width: '100%',
    }),
    [sizes.flexSize],
  )

  const transitions = useTransition(location, {
    key: location?.pathname,
    config,
    from: { opacity: 0, marginTop: '-300px' },
    enter: { opacity: 1, marginTop: '0px' },
    leave: { opacity: 0, marginTop: '-150px' },
    onRest: () => divRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }),
    ...(transition as any),
  })

  const sideProps = useMemo(
    () => ({
      toggle,
      responsiveSize,
      showTip,
      tipChanger: () => toggleHandler('showTip'),
    }),
    [responsiveSize, showTip, toggle, toggleHandler],
  )

  return (
    <MainSectionContext.Provider value={{ toggle, sizes }}>
      {transitions((style, _1, _2, key) => (
        <StyledAnimated ref={refFunc} key={key} background={background} style={style} {...rest}>
          <Container flexDirection="column-reverse" background={mainBackground}>
            {right && right(sideProps)}
            {left && left(sideProps)}
            <MainSectionMenu
              background={menuBackground}
              rightSide={
                rightIcon &&
                rightIcon({
                  checked: showRight,
                  onChange: () => toggleHandler('showRight'),
                })
              }
              leftSide={leftIcon && leftIcon({ checked: showLeft, onChange: () => toggleHandler('showLeft') })}
            />
            {loading ? (
              <Container flexDirection="column-reverse" background={mainBackground}>
                {skeleton || <Spinner />}
              </Container>
            ) : (
              children
            )}
          </Container>
          <div ref={divRef}>{header}</div>
        </StyledAnimated>
      ))}
    </MainSectionContext.Provider>
  )
}

export default MainSection
