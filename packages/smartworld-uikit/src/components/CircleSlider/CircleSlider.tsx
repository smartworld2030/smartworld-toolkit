import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CircleSliderHelper from './helpers/CircleSliderHelper'
import MouseHelper from './helpers/MouseHelper'
import pathGenerator from './helpers/PathGenerator'
import { LoadingCircle, StyledGroup, StyledShadowSvg } from './styles'
import { CircleSliderProps } from './types'
import { BAD_SRCS, UNKNOWN_IMAGE } from '../../util/constant'

interface IState {
  angle: number
  currentStepValue: number
  isMouseMove: boolean
}

const CircleSlider: React.FC<CircleSliderProps> = ({
  id,
  circleColor = 'transparent',
  insideColor = 'transparent',
  progressColor = 'purple',
  className,
  size,
  initialValue = 0,
  value = 0,
  zIndex = 0,
  knobColor,
  knobWidth,
  knobRadius,
  circleWidth,
  progressWidth,
  stepSize = 1,
  min = 0,
  max = 100,
  loading = false,
  disabled = false,
  noSlider = false,
  shadow = true,
  shadowColor,
  onInputChange = () => null,
  gradientColorFrom,
  gradientColorTo,
  blur = 2,
  children,
  image,
  ...rest
}) => {
  const [, refresh] = useState(0)
  const [state, setState] = useState<IState>({
    angle: 0,
    currentStepValue: 0,
    isMouseMove: false,
  })

  const sizeCalc = useCallback(
    (divide = 1, minus = 0) => Number(((size ? Number(size) : 150) / divide - minus).toFixed(2)),
    [size],
  )

  const mouseHelper = useRef<MouseHelper | null>(null)

  const cw = useMemo(() => circleWidth || sizeCalc(15), [circleWidth, sizeCalc])

  const center = useMemo(() => sizeCalc(2), [sizeCalc])
  const radius = useMemo(() => center - cw * 2, [cw, center])

  const pw = useMemo(() => progressWidth || cw, [progressWidth, cw])
  const kw = useMemo(() => knobWidth || pw, [knobWidth, pw])
  const kr = useMemo(() => knobRadius || radius / 5, [knobRadius, radius])

  const sliderHelper = useMemo(() => {
    const countSteps = 1 + (max - min) / stepSize
    const stepsArray: number[] = []

    for (let i = 0; i < countSteps; i++) {
      stepsArray.push(min + i * stepSize)
    }

    const newHelper = new CircleSliderHelper(stepsArray, initialValue)
    setState({
      isMouseMove: false,
      angle: newHelper.getAngle(),
      currentStepValue: newHelper.getCurrentStep(),
    })

    return newHelper
  }, [max, min, stepSize, initialValue])

  const imageList = useMemo(() => {
    const list = [UNKNOWN_IMAGE]
    if (!image) return undefined
    if (typeof image === 'string') list.unshift(image)
    else list.unshift(...image)
    return list
  }, [image])

  useEffect(() => {
    if (!state.isMouseMove) {
      const newValue = Math.round(value / stepSize) * stepSize
      sliderHelper.updateStepIndexFromValue(newValue)
      setState((prev) => ({ ...prev, angle: sliderHelper.getAngle(), currentStepValue: newValue }))
    }
  }, [sliderHelper, state.isMouseMove, stepSize, value])

  const updateAngle = useCallback(
    (angle?: number) => {
      if (!angle) return
      sliderHelper.updateStepIndexFromAngle(angle)
      const currentStep = sliderHelper.getCurrentStep()
      setState((prev) => ({ ...prev, angle, currentStepValue: currentStep }))
      onInputChange(currentStep)
    },
    [sliderHelper, onInputChange],
  )

  const updateSlider = useCallback(() => {
    const angle = mouseHelper.current?.getNewSliderAngle()
    updateAngle(angle)
  }, [updateAngle])

  const getAngle = useCallback(() => {
    return state.angle + Math.PI / 2
  }, [state.angle])

  const getPointPosition = useCallback(() => {
    const angle = getAngle()
    return {
      x: (center + radius * Math.cos(angle)).toFixed(3),
      y: (center + radius * Math.sin(angle)).toFixed(3),
    }
  }, [getAngle, center, radius])

  const getPath = useMemo((): string => {
    const direction = getAngle() < 1.5 * Math.PI ? 0 : 1
    const { x, y } = getPointPosition()
    const path = pathGenerator(center, radius, direction, x, y)
    return path
  }, [getAngle, getPointPosition, center, radius])

  const handleMouseHelper = useCallback((svg: SVGSVGElement | null) => {
    mouseHelper.current = new MouseHelper(svg)
  }, [])

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      event.preventDefault()
      setState((prev) => ({ ...prev, isMouseMove: true }))
      mouseHelper.current?.setPosition(event)
      updateSlider()
    },
    [updateSlider],
  )

  const handleMouseUp = (event: Event) => {
    event.preventDefault()
    setState((prev) => ({ ...prev, isMouseMove: false }))
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }

  const handleMouseDown = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!disabled) {
      event.preventDefault()
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }
  }

  const handleTouchMove = useCallback(
    (event: globalThis.TouchEvent) => {
      const { targetTouches } = event
      const countTouches = targetTouches.length
      const currentTouch = targetTouches?.item(countTouches - 1)
      mouseHelper.current?.setPosition(currentTouch)
      updateSlider()
    },
    [updateSlider],
  )

  const handleTouchStart = useCallback(() => {
    if (!disabled) {
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener(
        'touchend',
        () => {
          window.removeEventListener('touchmove', handleTouchMove)
        },
        { once: true },
      )
    }
  }, [disabled, handleTouchMove])

  const { x, y } = getPointPosition()
  const isAllGradientColorsAvailable = gradientColorFrom && gradientColorTo

  const circumference = useMemo(() => radius * 2 * Math.PI, [radius])

  const noInput = disabled || noSlider || loading

  const cursor = useMemo(() => {
    if (disabled) return 'not-allowed'
    return noInput ? 'initial' : 'pointer'
  }, [disabled, noInput])

  const src: string | undefined = imageList?.find((l) => !BAD_SRCS[l])

  const onImageError = () => {
    if (src) BAD_SRCS[src] = true
    refresh((i) => i + 1)
  }

  const classNames = useMemo(() => {
    const cls = className ? [className] : []
    if (disabled) cls.push('smartworld-svg--disabled')
    if (noSlider) cls.push('smartworld-svg--no-slider')
    if (loading) cls.push('smartworld-svg--loading')
    return cls
  }, [className, disabled, loading, noSlider])

  return (
    <StyledShadowSvg
      className={classNames.join(' ')}
      shadow={shadow}
      shadowSize={sizeCalc(120)}
      shadowColor={shadowColor || progressColor}
      $zIndex={zIndex}
      $cursor={cursor}
      ref={handleMouseHelper}
      width={`${sizeCalc()}px`}
      height={`${sizeCalc(0.95)}px`}
      viewBox={`0 0 ${sizeCalc()} ${sizeCalc()}`}
      onMouseDown={!noSlider ? handleMouseDown : undefined}
      onTouchStart={!noSlider ? handleTouchStart : undefined}
      {...rest}
    >
      <circle strokeWidth={cw} stroke={circleColor} fill={insideColor} r={radius} cx={center} cy={center} />
      {src && (
        <>
          <defs>
            <filter id="svg-blur-2">
              <feGaussianBlur in="SourceGraphic" stdDeviation={blur} />
            </filter>
            <clipPath id={(id || src).toLocaleLowerCase()}>
              <circle r={radius - cw / 2} cx={center} cy={center} />
            </clipPath>
          </defs>
          <image
            filter="url(#svg-blur-2)"
            width="100%"
            height="100%"
            href={src}
            onError={onImageError}
            clipPath={`url(#${(id || src).toLocaleLowerCase()})`}
          />
        </>
      )}
      {loading ? (
        <g>
          <LoadingCircle
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={circumference}
            r={radius}
            cx={center}
            cy={center}
            strokeWidth={cw}
          />
        </g>
      ) : (
        <StyledGroup $transform="translate(100%, 100%) rotateZ(180deg)">
          {isAllGradientColorsAvailable && (
            <defs>
              <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={gradientColorFrom} />
                <stop offset="100%" stopColor={gradientColorTo} />
              </linearGradient>
            </defs>
          )}
          <path
            strokeWidth={pw}
            stroke={isAllGradientColorsAvailable ? 'url(#gradient)' : progressColor}
            fill="none"
            d={getPath}
          />
          {!disabled && (
            <circle stroke={knobColor || progressColor} strokeWidth={kw} fillOpacity="0" r={kr} cx={x} cy={y} />
          )}
        </StyledGroup>
      )}
      <foreignObject x="0" y="0" width={sizeCalc()} height={sizeCalc()}>
        {children}
      </foreignObject>
    </StyledShadowSvg>
  )
}

export default CircleSlider
