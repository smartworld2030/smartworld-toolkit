import { scales, shape, variants } from "./types";

export const scaleVariants = {
  [scales.XL]: {
    height: "128px",
    fontSize: "16px",
  },
  [scales.ML]: {
    height: "88px",
    fontSize: "12px",
  },
  [scales.LG]: {
    height: "64px",
    fontSize: "8px",
  },
  [scales.MD]: {
    height: "48px",
    padding: "0 24px",
  },
  [scales.SM]: {
    height: "32px",
    padding: "0 16px",
  },
  [scales.XS]: {
    height: "20px",
    padding: "0 8px",
  },
};

export const styleShape = {
  [shape.NOPAD]: {
    backgroundColor: "primary",
    color: "text",
    boxShadow: "none",
    padding: 0,
  },
  [shape.CIRCLE]: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "50%",
    boxShadow: "none",
    padding: 0,
  },
};

export const styleVariants = {
  [variants.PRIMARY]: {
    borderRadius: "default",
    backgroundColor: "primary",
    color: "invertedContrast",
  },
  [variants.SECONDARY]: {
    borderRadius: "default",
    backgroundColor: "tertiary",
    border: "2px solid",
    borderColor: "primary",
    boxShadow: "none",
    color: "primary",
    ":disabled": {
      backgroundColor: "transparent",
    },
  },
  [variants.TRANSPARENT]: {
    borderRadius: "default",
    backgroundColor: "transparent",
    border: "2px solid",
    borderColor: "primary",
    boxShadow: "none",
    color: "primary",
    ":disabled": {
      backgroundColor: "transparent",
    },
  },
  [variants.TERTIARY]: {
    borderRadius: "default",
    backgroundColor: "tertiary",
    boxShadow: "none",
    color: "primary",
  },
  [variants.SUBTLE]: {
    borderRadius: "default",
    backgroundColor: "textSubtle",
    color: "white",
  },
  [variants.DANGER]: {
    borderRadius: "default",
    backgroundColor: "failure",
    color: "black",
  },
  [variants.SUCCESS]: {
    borderRadius: "default",
    backgroundColor: "success",
    color: "black",
  },
  [variants.TEXT]: {
    borderRadius: "default",
    backgroundColor: "transparent",
    color: "primary",
    boxShadow: "none",
  },
};
