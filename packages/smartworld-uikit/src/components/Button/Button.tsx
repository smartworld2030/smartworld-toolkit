import React, { cloneElement, ElementType, isValidElement } from "react";
import getExternalLinkProps from "../../util/getExternalLinkProps";
import { ButtonProps, scales, variants } from "./types";
import StyledButton from "./StyledButton";
import { scaleVariants } from "./theme";

const Button = <E extends ElementType = "button">(props: ButtonProps<E>): JSX.Element => {
  const { startIcon, endIcon, shape, external, className, isLoading, disabled, children, ...rest } = props;
  const internalProps = external ? getExternalLinkProps() : {};
  const isDisabled = isLoading || disabled;
  const classNames = className ? [className] : [];
  let shapeProps: any = {};

  if (isLoading) {
    classNames.push("pancake-button--loading");
  }

  if (isDisabled && !isLoading) {
    classNames.push("pancake-button--disabled");
  }
  if (shape === "circle") {
    const scale = scaleVariants[rest.scale];
    shapeProps.height = scale.height;
    shapeProps.width = scale.height;
    const scales = scale.height.split("px");
    shapeProps.fontSize = +scales[0] / 10;
  }

  return (
    <StyledButton
      $isLoading={isLoading}
      className={classNames.join(" ")}
      disabled={isDisabled}
      shape={shape}
      {...shapeProps}
      {...internalProps}
      {...rest}
    >
      <>
        {isValidElement(startIcon) &&
          cloneElement(startIcon, {
            mr: shape === "circle" ? undefined : "0.5rem",
          })}
        {children}
        {isValidElement(endIcon) &&
          cloneElement(endIcon, {
            ml: shape === "circle" ? undefined : "0.5rem",
          })}
      </>
    </StyledButton>
  );
};

Button.defaultProps = {
  isLoading: false,
  external: false,
  variant: variants.PRIMARY,
  scale: scales.MD,
  disabled: false,
};

export default Button;
