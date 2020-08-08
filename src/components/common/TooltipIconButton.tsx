import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";

type Props = {
  tooltip: string;
};

const TooltipIconButton = <C extends React.ElementType>({
  tooltip,
  ...props
}: IconButtonProps<C, { component?: C }> & Props) => (
  <Tooltip title={props.disabled ? "Log in first" : tooltip}>
    <div className="tooltip-button-wrapper">
      <IconButton color="inherit" {...props} />
    </div>
  </Tooltip>
);

export default TooltipIconButton;
