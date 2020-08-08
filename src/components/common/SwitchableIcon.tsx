import React from "react";
import { SvgIconProps, SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import styled from "styled-components/macro";

interface Props extends SvgIconProps {
  active: boolean;
  Icon: OverridableComponent<SvgIconTypeMap>;
}

const SwitchableIcon = styled(({ active, Icon, ...props }: Props) => (
  <Icon {...props} />
))`
  path:first-child {
    transition: 0.3s;
    opacity: ${({ active }) => (active ? 0.5 : 0)};
  }
`;

export default SwitchableIcon;
