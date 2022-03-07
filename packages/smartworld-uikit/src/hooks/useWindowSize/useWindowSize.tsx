import { useLayoutEffect, useState } from 'react'
import { breakpointMap } from '../../theme/base'
import { MediaQueries } from '../../theme'

export type ScreenBreakPoint = keyof Omit<MediaQueries, 'nav'>

export interface WindowSizes {
  screen: ScreenBreakPoint
  width: number
  flexSize: number
  height: number
  isMobile?: boolean
  isTablet?: boolean
}
const initValue = {
  screen: 'lg',
  width: 0,
  isMobile: false,
  flexSize: 30,
  height: 400,
  isTablet: false,
} as const

// eslint-disable-next-line @typescript-eslint/no-empty-function
const useWindowSize = (initialValue: WindowSizes = initValue, endFunc = (_arg: boolean) => {}): WindowSizes => {
  const [sizes, setSizes] = useState(initialValue)

  useLayoutEffect(() => {
    let timerId: NodeJS.Timeout
    const sizeCalc = () => {
      const { width } = document.body.getBoundingClientRect()

      const findScreen = Object.keys(breakpointMap)
        .reverse()
        .find((key) => width >= breakpointMap[key]) as ScreenBreakPoint

      const screen = findScreen || 'xs'

      const isMobile = ['xs', 'sm'].includes(screen)
      const isTablet = screen === 'md'

      const { height } = initialValue

      const flexSize = height / 12

      setSizes({ screen, width, height, flexSize, isMobile, isTablet })
      endFunc(false)
    }

    const debounce = () => {
      clearTimeout(timerId)
      endFunc(true)
      timerId = setTimeout(sizeCalc, 200)
    }

    sizeCalc()
    // window.addEventListener('resize', debounce)
    return () => {
      // window.removeEventListener('resize', debounce)
      clearTimeout(timerId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return sizes
}

export default useWindowSize
