import { capitalize } from "lodash";
import React, { useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import styled from "styled-components";
import Box from "../Box/Box";
import Text from "../Text/Text";
import Flex from "../Box/Flex";
import { AddIcon, AutoRenewIcon, LogoIcon } from "../Svg";
import DetailedButton from "./DetailedButton";
import IconButton from "./IconButton";
import Button from "./Button";
import { ExpandableButton, ExpandableLabel } from "./ExpandableButton";
import { scales, variants } from "./types";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {},
};

const Row = styled(Flex)`
  margin-bottom: 32px;
  & > button + button,
  & > a + a {
    margin-left: 16px;
  }
`;

export const Default: React.FC = () => {
  return (
    <>
      <Box mb="32px">
        <button type="button">Unstyled Button</button>
      </Box>
      <Box mb="32px">
        {Object.values(variants).map((variant) => {
          return (
            <Box key={variant} mb="32px">
              {Object.values(scales).map((scale) => {
                return (
                  <Button key={scale} variant={variant} scale={scale} mr="8px">
                    {`${capitalize(variant)} ${scale.toUpperCase()}`}
                  </Button>
                );
              })}
            </Box>
          );
        })}
      </Box>
      <Box>
        <Button mr="8px" disabled>
          Disabled
        </Button>
        <Button variant="secondary" disabled>
          Disabled
        </Button>
      </Box>
    </>
  );
};

export const Circle: React.FC = () => {
  return (
    <>
      <Box mb="32px">
        <button type="button">Unstyled Button</button>
      </Box>
      <Box mb="32px">
        {Object.values(variants).map((variant) => {
          return (
            <Box key={variant} mb="32px">
              {Object.values(scales).map((scale) => {
                return (
                  <Button shape="circle" key={scale} variant={variant} scale={scale} mr="8px">
                    {`${capitalize(variant)} ${scale.toUpperCase()}`}
                  </Button>
                );
              })}
            </Box>
          );
        })}
      </Box>
      <Box>
        <Button shape="circle" scale="ml" mr="8px" disabled>
          Disabled
        </Button>
        <Button shape="circle" scale="ml" variant="secondary" disabled>
          Disabled
        </Button>
      </Box>
    </>
  );
};

export const Anchors: React.FC = () => {
  return (
    <>
      <Box mb="32px">
        {Object.values(variants).map((variant) => {
          return (
            <Box key={variant} mb="32px">
              {Object.values(scales).map((scale) => {
                return (
                  <Button
                    as="a"
                    href="https://smartworld.app"
                    key={scale}
                    variant={variant}
                    scale={scale}
                    external
                    mr="8px"
                  >
                    {`${capitalize(variant)} anchor ${scale.toUpperCase()}`}
                  </Button>
                );
              })}
            </Box>
          );
        })}
      </Box>
      <Box>
        <Button as="a" href="https://smartworld.app" mr="8px" external disabled>
          Disabled
        </Button>
        <Button as="a" href="https://smartworld.app" variant="secondary" external disabled>
          Disabled
        </Button>
      </Box>
    </>
  );
};

export const Variants: React.FC = () => {
  return (
    <Box width="640px">
      <BrowserRouter>
        <Row>
          <Button as={Link} to="/router-link" variant="secondary">
            As an React Router link
          </Button>
        </Row>
        <Row>
          <Button width="100%">Full size</Button>
        </Row>
        <Row>
          <Button isLoading endIcon={<AutoRenewIcon spin color="currentColor" />}>
            Approving
          </Button>
          <Button isLoading variant="success">
            Approving
          </Button>
        </Row>
        <Row>
          <Button startIcon={<LogoIcon />}>Start Icon</Button>
          <Button endIcon={<LogoIcon />}>End Icon</Button>
          <Button startIcon={<LogoIcon />} endIcon={<LogoIcon />}>
            Start & End Icon
          </Button>
        </Row>
        <Row>
          <IconButton>
            <LogoIcon />
          </IconButton>
          <IconButton variant="secondary">
            <AddIcon />
          </IconButton>
        </Row>
        <Row>
          <IconButton scale="sm" variant="danger">
            <LogoIcon />
          </IconButton>
          <IconButton scale="sm" variant="success">
            <AddIcon color="currentColor" />
          </IconButton>
        </Row>
      </BrowserRouter>
    </Box>
  );
};

export const CircleVariants: React.FC = () => {
  return (
    <Box width="640px">
      <BrowserRouter>
        <Row>
          <Button shape="circle" as={Link} to="/router-link" variant="secondary">
            As an React Router link
          </Button>
        </Row>
        <Row>
          <Button shape="circle" isLoading endIcon={<AutoRenewIcon spin color="currentColor" />}>
            Approving
          </Button>
          <Button shape="circle" isLoading variant="success">
            Approving
          </Button>
        </Row>
        <Row>
          <Button shape="circle" startIcon={<LogoIcon />}>
            Start Icon
          </Button>
          <Button shape="circle" endIcon={<LogoIcon />}>
            End Icon
          </Button>
          <Button shape="circle" startIcon={<LogoIcon />} endIcon={<LogoIcon />} variant="transparent">
            Start & End Icon
          </Button>
        </Row>
        <Row>
          <IconButton shape="circle">
            <LogoIcon />
          </IconButton>
          <IconButton shape="circle" variant="secondary">
            <AddIcon />
          </IconButton>
        </Row>
        <Row>
          <IconButton shape="circle" scale="sm" variant="danger">
            <LogoIcon />
          </IconButton>
          <IconButton shape="circle" scale="sm" variant="success">
            <AddIcon color="currentColor" />
          </IconButton>
        </Row>
        <Row>
          <DetailedButton topIcon="token" shape="circle" bottomIcon="STTS">
            <LogoIcon width="15" />
          </DetailedButton>
          <DetailedButton topIcon="token" scale="lg" shape="circle" bottomIcon="STTS" variant="secondary">
            STTS
          </DetailedButton>
        </Row>
        <Row>
          <DetailedButton shape="circle" scale="lg" variant="secondary">
            <LogoIcon />
          </DetailedButton>
          <DetailedButton shape="circle" scale="ml" variant="danger">
            <LogoIcon />
          </DetailedButton>
          <DetailedButton shape="circle" scale="xl" topIcon={<Text>Token</Text>} bottomIcon={<Text>100</Text>}>
            <AddIcon color="currentColor" width="40" />
          </DetailedButton>
          <DetailedButton shape="circle" width="300" topIcon={<Text>Token</Text>} bottomIcon={<Text>100</Text>}>
            <AddIcon color="currentColor" width="40" />
          </DetailedButton>
        </Row>
      </BrowserRouter>
    </Box>
  );
};

export const Expandable: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Box width="640px">
      <BrowserRouter>
        <Row>
          <ExpandableButton expanded={expanded} onClick={() => setExpanded((prev) => !prev)} />
          <ExpandableLabel expanded={expanded} onClick={() => setExpanded((prev) => !prev)}>
            ExpandableLabel
          </ExpandableLabel>
        </Row>
      </BrowserRouter>
    </Box>
  );
};
