import React from "react";
import { SvgIconProps, SvgIconTypeMap, Theme } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import styled, { ThemeProps } from "styled-components/macro";

type Props = {
  active: boolean;
  Icon: OverridableComponent<SvgIconTypeMap>;
};

const SwitchableIcon = styled(
  ({ active, Icon, ...props }: Props & SvgIconProps) => <Icon {...props} />
)`
  path:first-child {
    transition: ${({ theme }: ThemeProps<Theme>) =>
      theme.transitions.create("opacity")};
    opacity: ${({ active }) => (active ? 0.5 : 0)};
  }
`;

export default SwitchableIcon;
