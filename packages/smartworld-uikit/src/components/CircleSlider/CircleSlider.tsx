import React, { useEffect, useRef, useState } from 'react'
import { CircleSliderHelper } from './helpers/circle-slider-helper'
import { MouseHelper } from './helpers/mouse-helper'
import { pathGenerator } from './helpers/path-generator'
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
  size,
  value,
  children,
  progressColor,
  gradientColorFrom,
  gradientColorTo,
  knobColor,
  circleColor,
  disabled,
  shadow,
  image,
  knobWidth,
  circleWidth,
  progressWidth,
  knobRadius,
  showPercentage,
  tooltipSize,
  tooltipColor,
  insideColor,
  stepSize,
  zIndex,
  min,
  max,
  id = 'dropShadow',
  onInputChange,
  onImageError,
  ...rest
}) => {
  const radius = useRef(0)
  const countSteps = useRef(0)
  const mouseHelper = useRef<MouseHelper | null>(null)
  const circleSliderHelper = useRef<CircleSliderHelper>(new CircleSliderHelper([], 0))

  const [state, setState] = useState<IState>({
    angle: 0,
    currentStepValue: 0,
    isMouseMove: false,
  })

  useEffect(() => {
    const maxLineWidth = Math.max(circleWidth!, progressWidth!)
    radius.current = getCenter() - Math.max(maxLineWidth, knobRadius! * 2) / 2
    countSteps.current = 1 + (max! - min!) / stepSize!
    const stepsArray = getStepsArray(min!, stepSize!)
    circleSliderHelper.current = new CircleSliderHelper(stepsArray, value!)
    setState((prev) => ({
      ...prev,
      angle: circleSliderHelper.current.getAngle(),
      currentStepValue: circleSliderHelper.current.getCurrentStep(),
    }))
  }, [size])

  useEffect(() => {
    if (!state.isMouseMove) {
      const newValue = Math.round(value! / stepSize!) * stepSize!
      circleSliderHelper.current.updateStepIndexFromValue(newValue)
      setState((prev) => ({ ...prev, angle: circleSliderHelper.current.getAngle(), currentStepValue: newValue }))
    }
  }, [value])

  const updateAngle = (angle: number): void => {
    circleSliderHelper.current.updateStepIndexFromAngle(angle)
    const currentStep = circleSliderHelper.current.getCurrentStep()
    setState((prev) => ({ ...prev, angle, currentStepValue: currentStep }))
    onInputChange!(currentStep)
  }

  const updateSlider = (): void => {
    const angle = mouseHelper.current!.getNewSliderAngle()
    updateAngle(angle)
  }

  const getCenter = (): number => {
    return size! / 2
  }

  const getAngle = (): number => {
    return state.angle + Math.PI / 2
  }

  const getPointPosition = (): IPoint => {
    const center = getCenter()
    const angle = getAngle()
    return {
      x: center + radius.current * Math.cos(angle),
      y: center + radius.current * Math.sin(angle),
    }
  }

  const getStepsArray = (min: number, stepSize: number): number[] => {
    const stepArray = []
    for (let i = 0; i < countSteps.current; i++) {
      stepArray.push(min + i * stepSize)
    }
    return stepArray
  }

  const getPath = (): string => {
    const center = getCenter()
    const direction = getAngle() < 1.5 * Math.PI ? 0 : 1
    const { x, y } = getPointPosition()
    const path = pathGenerator(center, radius.current, direction, x, y)
    return path
  }

  const handleMouseMove = (event: Event): void => {
    event.preventDefault()
    setState((prev) => ({ ...prev, isMouseMove: true }))
    mouseHelper.current!.setPosition(event)
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
  const handleTouchMove: any = (event: React.TouchEvent<SVGSVGElement>): void => {
    const targetTouches = event.targetTouches
    const countTouches = targetTouches.length
    const currentTouch: React.Touch = targetTouches.item(countTouches - 1)!
    mouseHelper.current!.setPosition(currentTouch)
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

  const sizeCalc = (divide: number = 1) => (size ? Number(size) : 150) / divide

  const { x, y } = getPointPosition()
  const center = getCenter()
  const isAllGradientColorsAvailable = gradientColorFrom && gradientColorTo

  return (
    <svg
      ref={(svg) => (mouseHelper.current = new MouseHelper(svg))}
      width={`${size}px`}
      height={`${size! + size! * 0.05}px`}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        boxSizing: 'border-box',
        touchAction: 'none',
        overflow: 'visible',
        zIndex,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      {...rest}
    >
      {image && (
        <defs>
          <pattern id={image} x="0%" y="0%" height="100%" width="100%" viewBox="0 0 512 512">
            <image filter="blur(5px)" x="0%" y="0%" width="512" height="512" xlinkHref={image} onError={onImageError} />
          </pattern>
        </defs>
      )}
      {shadow && (
        <filter id={id} filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation={size! * 0.01} />
          <feOffset dx={size! * 0.001} dy={size! * 0.001} />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      )}
      <circle
        strokeWidth={circleWidth}
        stroke={circleColor}
        fill={image ? `url(#${image})` : insideColor}
        filter={shadow ? `url(#${id})` : 'none'}
        r={radius.current}
        cx={center}
        cy={center}
      />
      <g style={{ transform: 'translate(100%, 100%) rotateZ(180deg)' }}>
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
          filter={shadow ? `url(#${id})` : 'none'}
          d={getPath()}
        />
        <circle
          stroke={progressColor}
          strokeWidth={knobWidth}
          fillOpacity="0"
          style={{
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
          filter={shadow ? `url(#${id})` : 'none'}
          r={knobRadius!}
          cx={x}
          cy={y}
        />
      </g>
      <foreignObject x="0" y="0" width={sizeCalc(1)} height={sizeCalc(1)}>
        {children}
      </foreignObject>
    </svg>
  )
}

CircleSlider.defaultProps = {
  circleColor: 'transparent',
  size: 180,
  value: 0,
  zIndex: 0,
  progressColor: '#007aff',
  knobColor: '#fff',
  circleWidth: 5,
  progressWidth: 25,
  knobWidth: 22,
  knobRadius: 15,
  stepSize: 1,
  min: 0,
  max: 100,
  disabled: false,
  shadow: true,
  showPercentage: false,
  tooltipSize: 32,
  tooltipColor: '#333',
  insideColor: 'none',
  onChange: () => ({}),
  onInputChange: () => ({}),
  onImageError: () => ({}),
}

export default CircleSlider
