import React, { FC, useMemo, useState } from 'react'
import { variant } from 'styled-system'
import { uniqueId } from 'lodash'
import { scaleVariants } from './theme'
import { StyledRing } from './styles'
import { ProgressRingProps } from './types'
import { BAD_SRCS } from '../../util/constant'

const ProgressRing: FC<ProgressRingProps> = ({
  id = uniqueId(),
  size,
  radius,
  stroke,
  loading = false,
  progress = 0,
  shadow = true,
  shadowColor,
  insideColor = 'transparent',
  image,
  blur,
  ...rest
}) => {
  const [, refresh] = useState(0)
  const { height, borderWidth } = variant({
    prop: 'scale',
    variants: scaleVariants,
  })(rest)

  const imageList = useMemo(() => (typeof image === 'string' ? [image] : image), [image])

  const r = (size || radius || height.replace('px', '')) / 2
  const s = stroke || +borderWidth.replace('px', '')

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
      {...rest}
    >
      <defs>
        {src && (
          <pattern id={id} x="0%" y="0%" height="100%" width="100%" viewBox="0 0 512 512">
            <image
              filter={`blur(${blur})`}
              x="0%"
              y="0%"
              width="512"
              height="512"
              xlinkHref={src}
              onError={onImageError}
            />
          </pattern>
        )}
      </defs>
      <circle fill={insideColor} r={normalizedRadius} cx={r} cy={r} />
      <circle fill={src ? `url(#${id})` : insideColor} strokeWidth={+s + 4} r={normalizedRadius} cx={r} cy={r} />
      <circle
        strokeWidth={s}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        r={normalizedRadius}
        cx={r}
        cy={r}
      />
    </StyledRing>
  )
}

ProgressRing.defaultProps = {
  variant: 'primary',
  scale: 'lg',
}

export default ProgressRing
