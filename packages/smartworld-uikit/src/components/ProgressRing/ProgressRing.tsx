import React, { FC, useMemo, useState } from 'react'
import { uniqueId } from 'lodash'
import { variant } from 'styled-system'
import { scaleVariants } from './theme'
import { StyledRing } from './styles'
import { ProgressRingProps } from './types'
import { BAD_SRCS, UNKNOWN_IMAGE } from '../../util/constant'

const ProgressRing: FC<ProgressRingProps> = ({
  id = uniqueId(),
  size,
  radius,
  borderWidth,
  loading = false,
  progress = 0,
  shadow = true,
  shadowColor,
  circleColor,
  insideColor = 'transparent',
  image,
  blur = 1,
  ...rest
}) => {
  const [, refresh] = useState(0)
  const { height, borderWidth: bw } = variant({
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

  const r = (size || radius || height.replace('px', '')) / 2
  const s = borderWidth || +bw.replace('px', '')

  const normalizedRadius = r - s * 2
  const circumference = normalizedRadius * 2 * Math.PI

  const strokeDashoffset = circumference - (progress / 100) * circumference

  const src: string | undefined = imageList?.find((l) => !BAD_SRCS[l])

  const onImageError = () => {
    if (src) BAD_SRCS[src] = true
    refresh((i) => i + 1)
  }

  return (
    <StyledRing
      shadow={shadow}
      shadowSize={s}
      shadowColor={shadowColor}
      height={r * 2}
      width={r * 2}
      $offset={strokeDashoffset}
      $animation={loading && !progress}
      $circleColor={circleColor}
      {...rest}
    >
      {/* order matters */}
      <circle strokeWidth={s * 1.5} fill={insideColor} r={normalizedRadius} cx={r} cy={r} />
      {src && (
        <>
          <defs>
            <filter id="svg-blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation={blur} />
            </filter>
            <clipPath id={id}>
              <circle r={r - s * 2.75} cx={r} cy={r} />
            </clipPath>
          </defs>
          <image
            filter="url(#svg-blur)"
            width="100%"
            height="100%"
            href={src}
            clipPath={`url(#${id})`}
            onError={onImageError}
          />
        </>
      )}
      <circle
        strokeWidth={s * 1.5}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        r={normalizedRadius}
        cx={r}
        cy={r}
        fill="none"
      />
    </StyledRing>
  )
}

ProgressRing.defaultProps = {
  variant: 'primary',
  scale: 'lg',
}

export default ProgressRing
