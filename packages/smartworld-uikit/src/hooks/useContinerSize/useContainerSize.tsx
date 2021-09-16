import { useEffect, useMemo, useRef, useState } from 'react'

export interface Sizes {
  screen: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  width: number
  height?: number
  flex: number
  isMobile?: boolean
  isTablet?: boolean
  maxHeight?: number
  minHeight: number
}

const useContainerSize = (initialValue: Sizes, gap?: number) => {
  const ref = useRef<HTMLDivElement>(null)
  const [sizes, setSizes] = useState<Sizes>(initialValue)

  useEffect(() => {
    const sizeCalc = () => {
      if (ref.current) {
        const { width } = ref.current.getBoundingClientRect()
        const screen = width >= 1200 ? 'xl' : width >= 992 ? 'lg' : width >= 768 ? 'md' : width >= 480 ? 'sm' : 'xs'
        const isMobile = ['xs', 'sm'].includes(screen)
        const isTablet = 'md' === screen
        const height = isMobile
          ? initialValue.height
            ? initialValue.height
            : initialValue.maxHeight
            ? initialValue.maxHeight
            : 800
          : 300
        const minHeight = initialValue.minHeight ? initialValue.minHeight : 300
        const flex = isMobile ? (gap ? (height - gap) / 12 : height / 12) : gap ? (width - gap) / 12 : width / 12

        setSizes({ screen, width, height, flex, minHeight, isMobile, isTablet })
      }
    }
    sizeCalc()
    window.addEventListener('resize', sizeCalc)
    return () => {
      window.removeEventListener('resize', sizeCalc)
    }
  }, [])

  return useMemo(() => ({ ref, sizes }), [sizes])
}

export default useContainerSize
