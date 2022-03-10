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
  className,
  size = 180,
  value = 0,
  zIndex = 0,
  progressColor,
  knobColor,
  circleWidth = 5,
  progressWidth = 25,
  knobWidth = 22,
  knobRadius = 15,
  stepSize = 1,
  min = 0,
  max = 100,
  loading = false,
  disabled = false,
  noSlider = false,
  shadow = true,
  shadowColor,
  insideColor = 'transparent',
  onInputChange = () => null,
  children,
  gradientColorFrom,
  gradientColorTo,
  image,
  blur = 2,
  ...rest
}) => {
  const classNames = className ? [className] : []

  const [, refresh] = useState(0)
  const [state, setState] = useState<IState>({
    angle: 0,
    currentStepValue: 0,
    isMouseMove: false,
  })

  const radius = useMemo(() => {
    const maxLineWidth = Math.max(circleWidth, progressWidth)
    return size / 2 - Math.max(maxLineWidth, knobRadius * 2) / 2
  }, [circleWidth, knobRadius, progressWidth, size])

  const countSteps = useRef(0)
  const mouseHelper = useRef<MouseHelper | null>(null)
  const circleSliderHelper = useRef<CircleSliderHelper>(new CircleSliderHelper([], 0))

  const imageList = useMemo(() => {
    const list = [UNKNOWN_IMAGE]
    if (!image) return undefined
    if (typeof image === 'string') list.unshift(image)
    else list.unshift(...image)
    return list
  }, [image])

  useEffect(() => {
    countSteps.current = 1 + (max - min) / stepSize
    const stepsArray: number[] = []

    for (let i = 0; i < countSteps.current; i++) {
      stepsArray.push(min + i * stepSize)
    }

    circleSliderHelper.current = new CircleSliderHelper(stepsArray, value)
    setState((prev) => ({
      ...prev,
      angle: circleSliderHelper.current.getAngle(),
      currentStepValue: circleSliderHelper.current.getCurrentStep(),
    }))
  }, [circleWidth, knobRadius, max, min, progressWidth, size, stepSize, value])

  useEffect(() => {
    if (!state.isMouseMove) {
      const newValue = Math.round(value / stepSize) * stepSize
      circleSliderHelper.current.updateStepIndexFromValue(newValue)
      setState((prev) => ({ ...prev, angle: circleSliderHelper.current.getAngle(), currentStepValue: newValue }))
    }
  }, [state.isMouseMove, stepSize, value])

  const updateAngle = useCallback(
    (angle?: number) => {
      if (!angle) return
      circleSliderHelper.current.updateStepIndexFromAngle(angle)
      const currentStep = circleSliderHelper.current.getCurrentStep()
      setState((prev) => ({ ...prev, angle, currentStepValue: currentStep }))
      onInputChange(currentStep)
    },
    [onInputChange],
  )

  const updateSlider = useCallback(() => {
    const angle = mouseHelper.current?.getNewSliderAngle()
    updateAngle(angle)
  }, [updateAngle])

  const getCenter = useCallback(() => {
    return size / 2
  }, [size])

  const getAngle = useCallback(() => {
    return state.angle + Math.PI / 2
  }, [state.angle])

  const getPointPosition = useCallback(() => {
    const center = getCenter()
    const angle = getAngle()
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    }
  }, [getAngle, getCenter, radius])

  const getPath = useMemo((): string => {
    const center = getCenter()
    const direction = getAngle() < 1.5 * Math.PI ? 0 : 1
    const { x, y } = getPointPosition()
    const path = pathGenerator(center, radius, direction, x, y)
    return path
  }, [getAngle, getCenter, getPointPosition, radius])

  const handleMouseHelper = useCallback((svg: SVGSVGElement | null) => {
    mouseHelper.current = new MouseHelper(svg)
  }, [])

  const handleMouseMove = (event: MouseEvent) => {
    event.preventDefault()
    setState((prev) => ({ ...prev, isMouseMove: true }))
    mouseHelper.current?.setPosition(event)
    updateSlider()
  }

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

  const handleTouchMove = (event: globalThis.TouchEvent) => {
    const { targetTouches } = event
    const countTouches = targetTouches.length
    const currentTouch = targetTouches?.item(countTouches - 1)
    mouseHelper.current?.setPosition(currentTouch)
    updateSlider()
  }

  const handleTouchUp = () => {
    window.removeEventListener('touchmove', handleTouchMove)
    window.removeEventListener('touchend', handleTouchUp)
  }

  const handleTouchStart = () => {
    if (!disabled) {
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', handleTouchUp)
    }
  }

  const sizeCalc = useCallback((divide = 1) => (size ? Number(size) : 150) / divide, [size])

  const { x, y } = getPointPosition()
  const center = getCenter()
  const isAllGradientColorsAvailable = gradientColorFrom && gradientColorTo

  const circumference = useMemo(() => radius * 2 * Math.PI, [radius])

  const noInput = disabled || noSlider || loading

  const cursor = useMemo(() => {
    if (disabled) return 'not-allowed'
    return noInput ? 'initial' : 'pointer'
  }, [disabled, noInput])

  if (disabled) {
    classNames.push('smartworld-svg--disabled')
  }
  if (noSlider) {
    classNames.push('smartworld-svg--no-slider')
  }
  if (loading) {
    classNames.push('smartworld-svg--loading')
  }

  const src: string | undefined = imageList?.find((l) => !BAD_SRCS[l])

  const onImageError = () => {
    if (src) BAD_SRCS[src] = true
    refresh((i) => i + 1)
  }

  return (
    <StyledShadowSvg
      className={classNames.join(' ')}
      shadow={shadow}
      shadowSize={size * 0.015}
      shadowColor={shadowColor || progressColor}
      $zIndex={zIndex}
      $cursor={cursor}
      ref={handleMouseHelper}
      width={`${size}px`}
      height={`${size + size * 0.05}px`}
      viewBox={`0 0 ${size} ${size}`}
      onMouseDown={!noSlider ? handleMouseDown : undefined}
      onTouchStart={!noSlider ? handleTouchStart : undefined}
      {...rest}
    >
      <circle strokeWidth={circleWidth} stroke={circleColor} fill={insideColor} r={radius} cx={center} cy={center} />
      {src && (
        <>
          <defs>
            <filter id="svg-blur-2">
              <feGaussianBlur in="SourceGraphic" stdDeviation={blur} />
            </filter>
            <clipPath id={id || src.toString()}>
              <circle r={radius - circleWidth / 2} cx={center} cy={center} />
            </clipPath>
          </defs>
          <image
            filter="url(#svg-blur-2)"
            width="100%"
            height="100%"
            href={src}
            onError={onImageError}
            clipPath={`url(#${id || src.toString()})`}
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
            strokeWidth={circleWidth || size * 0.1}
          />
        </g>
      ) : (
        <StyledGroup className="knob" $transform="translate(100%, 100%) rotateZ(180deg)">
          {isAllGradientColorsAvailable && (
            <defs>
              <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={gradientColorFrom} />
                <stop offset="100%" stopColor={gradientColorTo} />
              </linearGradient>
            </defs>
          )}
          <path
            strokeWidth={progressWidth}
            stroke={isAllGradientColorsAvailable ? 'url(#gradient)' : progressColor}
            fill="none"
            d={getPath}
          />
          <circle
            stroke={knobColor || progressColor}
            strokeWidth={knobWidth}
            fillOpacity="0"
            r={knobRadius}
            cx={x}
            cy={y}
          />
        </StyledGroup>
      )}
      <foreignObject x="0" y="0" width={sizeCalc(1)} height={sizeCalc(1)}>
        {children}
      </foreignObject>
    </StyledShadowSvg>
  )
}

export default CircleSlider
