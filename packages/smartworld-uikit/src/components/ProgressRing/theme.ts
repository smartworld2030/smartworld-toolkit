import { scales, variants } from '../Button/types'

export const scaleVariants = {
  [scales.XL]: {
    height: '256px',
    width: '256px',
    borderWidth: '7px',
  },
  [scales.ML]: {
    height: '128px',
    width: '128px',
    borderWidth: '5px',
  },
  [scales.LG]: {
    height: '88px',
    width: '88px',
    borderWidth: '4px',
  },
  [scales.MD]: {
    height: '64px',
    width: '64px',
    borderWidth: '3px',
  },
  [scales.SM]: {
    height: '48px',
    width: '48px',
    borderWidth: '2px',
  },
  [scales.XS]: {
    height: '32px',
    width: '32px',
    borderWidth: '1px',
  },
}

export const colorVariant1 = {
  [variants.PRIMARY]: {
    stroke: 'disabled',
  },
  [variants.SECONDARY]: {
    stroke: 'inputSecondary',
  },
  [variants.TRANSPARENT]: {
    stroke: 'transparent',
  },
  [variants.TERTIARY]: {
    stroke: 'tertiary',
  },
  [variants.SUBTLE]: {
    stroke: 'textSubtle',
  },
  [variants.DANGER]: {
    stroke: 'warning',
  },
  [variants.SUCCESS]: {
    stroke: 'backgroundDisabled',
  },
  [variants.TEXT]: {
    stroke: 'text',
  },
}

export const colorVariant2 = {
  [variants.PRIMARY]: {
    stroke: 'primary',
  },
  [variants.SECONDARY]: {
    stroke: 'text',
  },
  [variants.TRANSPARENT]: {
    stroke: 'primary',
  },
  [variants.TERTIARY]: {
    stroke: 'primary',
  },
  [variants.SUBTLE]: {
    stroke: 'white',
  },
  [variants.DANGER]: {
    stroke: 'failure',
  },
  [variants.SUCCESS]: {
    stroke: 'success',
  },
  [variants.TEXT]: {
    stroke: 'primary',
  },
}
