import React, { FC, useMemo, useState } from 'react'
import { variant } from 'styled-system'
import { scaleVariants } from './theme'
import { StyledRing } from './styles'
import { ProgressRingProps } from './types'
import { BAD_SRCS, UNKNOWN_IMAGE } from '../../util/constant'

const ProgressRing: FC<ProgressRingProps> = ({
  id,
  className,
  size,
  circleWidth,
  loading = false,
  progress = 0,
  shadow = true,
  shadowColor,
  circleColor,
  insideColor = 'transparent',
  image,
  noSlider,
  blur = 1,
  disabled,
  children,
  ...rest
}) => {
  const [, refresh] = useState(0)
  const { height, borderWidth } = variant({
    prop: 'scale',
    variants: scaleVariants,
  })(rest)

  const imageList = useMemo(() => {
    const list = [UNKNOWN_IMAGE]
    if (!image) return undefined
    if (typeof image === 'string') list.unshift(image)
    else list.unshift(...image)
    return list
  }, [image])

  const width = size || height.replace('px', '')
  const cw = circleWidth || +borderWidth.replace('px', '')

  const center = useMemo(() => width / 2, [width])

  const radius = useMemo(() => center - cw * 2, [cw, center])

  const circumference = useMemo(() => radius * 2 * Math.PI, [radius])

  const strokeDashoffset = useMemo(() => circumference - (progress / 100) * circumference, [circumference, progress])

  const src: string | undefined = imageList?.find((l) => !BAD_SRCS[l])

  const onImageError = () => {
    if (src) BAD_SRCS[src] = true
    refresh((i) => i + 1)
  }

  const classNames = useMemo(() => {
    const cls = className ? [className] : []
    if (disabled) cls.push('smartworld-svg--disabled')
    if (noSlider) cls.push('smartworld-svg--no-slider')
    return cls
  }, [className, disabled, noSlider])

  return (
    <StyledRing
      className={classNames.join(' ')}
      shadow={shadow}
      shadowSize={width / 100}
      shadowColor={shadowColor}
      height={width}
      width={width}
      $offset={strokeDashoffset}
      $animation={loading && !progress}
      $circleColor={circleColor}
      {...rest}
    >
      {/* order matters */}
      <circle strokeWidth={cw} stroke={circleColor} fill={insideColor} r={radius} cx={center} cy={center} />
      <g>
        {src && (
          <>
            <defs>
              <filter id="svg-blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation={blur} />
              </filter>
              <clipPath id={(id || src).toLocaleLowerCase()}>
                <circle r={radius - cw / 2} cx={center} cy={center} />
              </clipPath>
            </defs>
            <image
              filter="url(#svg-blur)"
              width="100%"
              height="100%"
              href={src}
              onError={onImageError}
              clipPath={`url(#${(id || src).toLocaleLowerCase()})`}
            />
          </>
        )}
      </g>
      <circle
        strokeWidth={cw}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        r={radius}
        cx={center}
        cy={center}
        fill="none"
      />
      <foreignObject x="0" y="0" width={width} height={width}>
        {children}
      </foreignObject>
    </StyledRing>
  )
}

ProgressRing.defaultProps = {
  variant: 'primary',
  scale: 'lg',
}

export default ProgressRing
