import React from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import { SvgIconProps, SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

export const StyledArticlePreview = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 0;
`;

export const StyledIconButton = styled(IconButton)`
  font-size: inherit;
  color: inherit;
  padding: 5px;
  margin-left: 5px;
  transform: scale(0.9);
`;

interface StyledSwitchableIconProps extends SvgIconProps {
  active: boolean;
  Icon: OverridableComponent<SvgIconTypeMap>;
}

export const StyledSwitchableIcon = styled(
  ({ active, Icon, ...props }: StyledSwitchableIconProps) => <Icon {...props} />
)`
  path:first-child {
    transition: 0.3s;
    opacity: ${({ active }) => (active ? 0.5 : 0)};
  }
`;
