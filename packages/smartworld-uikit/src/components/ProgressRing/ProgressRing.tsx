import React, { FC } from 'react'
import { variant } from 'styled-system'
import { uniqueId } from 'lodash'
import { scaleVariants } from './theme'
import { StyledRing } from './styles'
import { ProgressRingProps } from './types'

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
  onImageError = () => null,
  image,
  blur,
  ...rest
}) => {
  const { height, borderWidth } = variant({
    prop: 'scale',
    variants: scaleVariants,
  })(rest)

  const r = (size || radius || height.replace('px', '')) / 2
  const s = stroke || +borderWidth.replace('px', '')

  const normalizedRadius = r - s * 2
  const circumference = normalizedRadius * 2 * Math.PI

  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <StyledRing
      $blur={shadow && s}
      $shadowColor={shadowColor}
      height={r * 2}
      width={r * 2}
      $offset={strokeDashoffset}
      $animation={loading && !progress}
      {...rest}
    >
      <defs>
        {image && (
          <pattern id={id} x="0%" y="0%" height="100%" width="100%" viewBox="0 0 512 512">
            <image
              filter={`blur(${blur})`}
              x="0%"
              y="0%"
              width="512"
              height="512"
              xlinkHref={image}
              onError={onImageError}
            />
          </pattern>
        )}
      </defs>
      <circle fill={insideColor} r={normalizedRadius} cx={r} cy={r} />
      <circle fill={image ? `url(#${id})` : insideColor} strokeWidth={+s + 4} r={normalizedRadius} cx={r} cy={r} />
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
