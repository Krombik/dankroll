import React, { FC } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import { Link, LinkProps } from "react-router-dom";

type Props = {
  tooltip: string;
};

const TooltipIconLink: FC<Props & LinkProps & IconButtonProps> = ({
  tooltip,
  ...props
}) => (
  <Tooltip title={tooltip}>
    <IconButton color="inherit" component={Link} {...props} />
  </Tooltip>
);

export default TooltipIconLink;
