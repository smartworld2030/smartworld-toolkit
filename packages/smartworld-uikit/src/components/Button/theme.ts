import { scales, shape, variants } from './types'

export const scaleVariants = {
  [scales.XL]: {
    height: '128px',
    fontSize: '16px',
    borderWidth: '8px',
    iconSize: '96px',
  },
  [scales.ML]: {
    height: '88px',
    fontSize: '12px',
    borderWidth: '6px',
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
    borderWidth: '3px',
    iconSize: '24px',
  },
  [scales.XS]: {
    height: '20px',
    padding: '0 8px',
    borderWidth: '3px',
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
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderColor: 'primary',
    color: 'primary',
    ':disabled': {
      backgroundColor: 'input',
    },
  },
  [variants.SECONDARY]: {
    borderRadius: 'default',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderColor: 'textDisabled',
    color: 'text',
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
    ':disabled': {
      backgroundColor: 'transparent',
    },
  },
  [variants.TERTIARY]: {
    borderRadius: 'default',
    backgroundColor: 'transparent',
    borderColor: 'tertiary',
    color: 'primary',
    borderStyle: 'solid',
  },
  [variants.SUBTLE]: {
    borderRadius: 'default',
    backgroundColor: 'transparent',
    color: 'white',
    borderStyle: 'solid',
    borderColor: 'textSubtle',
  },
  [variants.DANGER]: {
    borderRadius: 'default',
    backgroundColor: 'transparent',
    color: 'black',
    borderStyle: 'solid',
    borderColor: 'failure',
  },
  [variants.SUCCESS]: {
    borderRadius: 'default',
    backgroundColor: 'transparent',
    borderColor: 'success',
    color: 'black',
    borderStyle: 'solid',
  },
  [variants.TEXT]: {
    borderRadius: 'default',
    backgroundColor: 'transparent',
    color: 'primary',
    boxShadow: 'none',
  },
}
