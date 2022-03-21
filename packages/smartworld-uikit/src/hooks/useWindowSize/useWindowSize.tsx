import { useLayoutEffect, useMemo, useState } from 'react'
import { breakpointMap } from '../../theme/base'
import { MediaQueries } from '../../theme'

export type ScreenBreakPoint = keyof Omit<MediaQueries, 'nav'>

export interface MainSectionSizes {
  screen?: ScreenBreakPoint
  width?: number
  flexSize?: number
  height?: number
  isMobile?: boolean
  isTablet?: boolean
}
export interface WindowSizes {
  screen: ScreenBreakPoint
  width: number
  flexSize: number
  height: number
  isMobile: boolean
  isTablet: boolean
}

export const initValue: WindowSizes = {
  screen: 'lg',
  width: 0,
  flexSize: 30,
  height: 400,
  isMobile: false,
  isTablet: false,
}

const useWindowSize = (initialValue?: MainSectionSizes): WindowSizes => {
  const init = useMemo(() => ({ ...initValue, ...initialValue }), [initialValue])
  const [sizes, setSizes] = useState(init)

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

      const { height } = init

      const flexSize = Math.ceil(height / 12)

      setSizes({ screen, width, height, flexSize, isMobile, isTablet })
    }

    const debounce = () => {
      clearTimeout(timerId)
      timerId = setTimeout(sizeCalc, 200)
    }

    sizeCalc()

    window.addEventListener('resize', debounce)
    return () => {
      window.removeEventListener('resize', debounce)
      clearTimeout(timerId)
    }
  }, [init])

  return sizes
}

export default useWindowSize
