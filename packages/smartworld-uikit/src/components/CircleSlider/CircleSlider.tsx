import React, { useEffect, useMemo, useRef, useState } from 'react'
import CircleSliderHelper from './helpers/CircleSliderHelper'
import MouseHelper from './helpers/MouseHelper'
import pathGenerator from './helpers/PathGenerator'
import { LoadingCircle, StyledGroup, StyledShadowSvg } from './styles'
import { CircleSliderProps } from './types'

interface IPoint {
  x: number
  y: number
}

interface IState {
  angle: number
  currentStepValue: number
  isMouseMove: boolean
}

const CircleSlider: React.FC<CircleSliderProps> = ({
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
  onImageError = () => null,
  children,
  gradientColorFrom,
  gradientColorTo,
  image,
  blur = 5,
  ...rest
}) => {
  const classNames = className ? [className] : []
  const r = useRef(0)
  const { current: radius } = r
  const countSteps = useRef(0)
  const mouseHelper = useRef<MouseHelper | null>(null)
  const circleSliderHelper = useRef<CircleSliderHelper>(new CircleSliderHelper([], 0))

  const [state, setState] = useState<IState>({
    angle: 0,
    currentStepValue: 0,
    isMouseMove: false,
  })

  useEffect(() => {
    const maxLineWidth = Math.max(circleWidth, progressWidth)
    r.current = size / 2 - Math.max(maxLineWidth, knobRadius * 2) / 2

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

  const updateAngle = (angle?: number): void => {
    if (!angle) return
    circleSliderHelper.current.updateStepIndexFromAngle(angle)
    const currentStep = circleSliderHelper.current.getCurrentStep()
    setState((prev) => ({ ...prev, angle, currentStepValue: currentStep }))
    onInputChange(currentStep)
  }

  const updateSlider = (): void => {
    const angle = mouseHelper.current?.getNewSliderAngle()
    updateAngle(angle)
  }

  const getCenter = (): number => {
    return size / 2
  }

  const getAngle = (): number => {
    return state.angle + Math.PI / 2
  }

  const getPointPosition = (): IPoint => {
    const center = getCenter()
    const angle = getAngle()
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    }
  }

  const getPath = (): string => {
    const center = getCenter()
    const direction = getAngle() < 1.5 * Math.PI ? 0 : 1
    const { x, y } = getPointPosition()
    const path = pathGenerator(center, radius, direction, x, y)
    return path
  }

  const handleMouseMove = (event: MouseEvent): void => {
    event.preventDefault()
    setState((prev) => ({ ...prev, isMouseMove: true }))
    mouseHelper.current?.setPosition(event)
    updateSlider()
  }

  const handleMouseUp = (event: Event): void => {
    event.preventDefault()
    setState((prev) => ({ ...prev, isMouseMove: false }))
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }

  const handleMouseDown = (event: React.MouseEvent<SVGSVGElement>): void => {
    if (!disabled) {
      event.preventDefault()
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }
  }
  const handleTouchMove = (event: globalThis.TouchEvent): void => {
    const { targetTouches } = event
    const countTouches = targetTouches.length
    const currentTouch = targetTouches?.item(countTouches - 1)
    mouseHelper.current?.setPosition(currentTouch)
    updateSlider()
  }

  const handleTouchUp = (): void => {
    window.removeEventListener('touchmove', handleTouchMove)
    window.removeEventListener('touchend', handleTouchUp)
  }

  const handleTouchStart = (): void => {
    if (!disabled) {
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', handleTouchUp)
    }
  }

  const sizeCalc = (divide = 1) => (size ? Number(size) : 150) / divide

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

  return (
    <StyledShadowSvg
      className={classNames.join(' ')}
      shadow={shadow}
      shadowSize={size * 0.015}
      shadowColor={shadowColor || progressColor}
      $zIndex={zIndex}
      $cursor={cursor}
      ref={(svg) => {
        mouseHelper.current = new MouseHelper(svg)
      }}
      width={`${size}px`}
      height={`${size + size * 0.05}px`}
      viewBox={`0 0 ${size} ${size}`}
      onMouseDown={!noSlider ? handleMouseDown : undefined}
      onTouchStart={!noSlider ? handleTouchStart : undefined}
      {...rest}
    >
      <defs>
        <filter id="sg-blur-2">
          <feGaussianBlur in="SourceGraphic" stdDeviation={blur} />
        </filter>
      </defs>
      {image && (
        <defs>
          <pattern id={image} x="0%" y="0%" height="100%" width="100%" viewBox="0 0 512 512">
            <image
              filter="url(#sg-blur-2)"
              x="0%"
              y="0%"
              width="512"
              height="512"
              xlinkHref={image}
              onError={onImageError}
            />
          </pattern>
        </defs>
      )}
      <circle fill={insideColor} r={radius} cx={center} cy={center} />
      <circle
        strokeWidth={circleWidth}
        stroke={circleColor}
        fill={image ? `url(#${image})` : insideColor}
        r={radius}
        cx={center}
        cy={center}
      />
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
            d={getPath()}
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
