import { scales, shape, variants } from './types'

export const scaleVariants = {
  [scales.XL]: {
    height: '128px',
    fontSize: '16px',
    borderWidth: '7px',
    iconSize: '96px',
  },
  [scales.ML]: {
    height: '88px',
    fontSize: '12px',
    borderWidth: '5px',
    iconSize: '64px',
  },
  [scales.LG]: {
    height: '64px',
    fontSize: '8px',
    borderWidth: '4px',
    iconSize: '48px',
  },
  [scales.MD]: {
    height: '48px',
    padding: '0 24px',
    borderWidth: '3px',
    iconSize: '36px',
  },
  [scales.SM]: {
    height: '32px',
    padding: '0 16px',
    borderWidth: '2px',
    iconSize: '24px',
  },
  [scales.XS]: {
    height: '20px',
    padding: '0 8px',
    borderWidth: '1px',
    iconSize: '12px',
  },
}

export const styleShape = {
  [shape.NOPAD]: {
    backgroundColor: 'primary',
    color: 'text',
    padding: 0,
  },
  [shape.CIRCLE]: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '50%',
    padding: 0,
  },
}

export const styleVariants = {
  [variants.PRIMARY]: {
    borderRadius: 'default',
    backgroundColor: 'backgroundTransparent',
    borderStyle: 'solid',
    borderColor: 'primary',
    color: 'primary',
    fill: 'primary',
    ':disabled': {
      backgroundColor: 'input',
    },
  },
  [variants.SECONDARY]: {
    borderRadius: 'default',
    backgroundColor: 'backgroundTransparent',
    borderStyle: 'solid',
    borderColor: 'textDisabled',
    color: 'text',
    fill: 'text',
    ':disabled': {
      backgroundColor: 'input',
    },
  },
  [variants.TRANSPARENT]: {
    borderRadius: 'default',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderColor: 'primary',
    color: 'primary',
    fill: 'primary',
    ':disabled': {
      backgroundColor: 'transparent',
    },
  },
  [variants.TERTIARY]: {
    borderRadius: 'default',
    backgroundColor: 'backgroundTransparent',
    borderColor: 'tertiary',
    color: 'primary',
    fill: 'primary',
    borderStyle: 'solid',
  },
  [variants.SUBTLE]: {
    borderRadius: 'default',
    backgroundColor: 'backgroundTransparent',
    color: 'white',
    fill: 'white',
    borderStyle: 'solid',
    borderColor: 'textSubtle',
  },
  [variants.DANGER]: {
    borderRadius: 'default',
    backgroundColor: 'backgroundTransparent',
    color: 'black',
    fill: 'black',
    borderStyle: 'solid',
    borderColor: 'failure',
  },
  [variants.SUCCESS]: {
    borderRadius: 'default',
    backgroundColor: 'backgroundTransparent',
    borderColor: 'success',
    color: 'black',
    fill: 'black',
    borderStyle: 'solid',
  },
  [variants.TEXT]: {
    borderRadius: 'default',
    backgroundColor: 'transparent',
    color: 'primary',
    fill: 'primary',
    boxShadow: 'none',
  },
}
export const iconVariant = {
  [variants.PRIMARY]: {
    fill: 'primary',
  },
  [variants.SECONDARY]: {
    fill: 'text',
  },
  [variants.TRANSPARENT]: {
    fill: 'primary',
  },
  [variants.TERTIARY]: {
    fill: 'primary',
  },
  [variants.SUBTLE]: {
    fill: 'white',
  },
  [variants.DANGER]: {
    fill: 'failure',
  },
  [variants.SUCCESS]: {
    fill: 'success',
  },
  [variants.TEXT]: {
    fill: 'primary',
  },
}
