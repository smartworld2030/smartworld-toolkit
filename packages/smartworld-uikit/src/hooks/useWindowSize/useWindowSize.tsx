import { useLayoutEffect, useState } from 'react'
import { ScreenBreakPoint } from '../..'
import { breakpointMap } from '../../theme/base'

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
  width: 1200,
  isMobile: false,
  flexSize: 30,
  height: 400,
  isTablet: false,
} as const

const useWindowSize = (initialValue: WindowSizes = initValue, endFunc = (loading: boolean) => {}) => {
  const [sizes, setSizes] = useState(initialValue)

  useLayoutEffect(() => {
    let timerId: NodeJS.Timeout
    const sizeCalc = () => {
      const { width } = document.body.getBoundingClientRect()

      const findScreen = Object.keys(breakpointMap)
        .reverse()
        .find((key) => width >= breakpointMap[key]) as ScreenBreakPoint

      const screen = findScreen ? findScreen : 'xs'

      const isMobile = ['xs', 'sm'].includes(screen)
      const isTablet = 'md' === screen

      const height = initialValue.height

      const flexSize = height / 12

      setSizes({ screen, width: isMobile ? width : width / 2, height, flexSize, isMobile, isTablet })
      endFunc(false)
    }

    const debounce = () => {
      clearTimeout(timerId)
      endFunc(true)
      timerId = setTimeout(sizeCalc, 200)
    }

    sizeCalc()
    window.addEventListener('resize', debounce)
    return () => {
      window.removeEventListener('resize', debounce)
      clearTimeout(timerId)
    }
  }, [])

  return sizes
}

export default useWindowSize
