import React, { FC } from "react";
import TooltipIconButton from "components/common/TooltipIconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Link } from "react-router-dom";

const UnauthorizedButtons: FC = () => (
  <>
    <TooltipIconButton
      tooltip="Sign in"
      component={Link}
      to={{ pathname: "/login", state: { open: true } }}
    >
      <ExitToAppIcon />
    </TooltipIconButton>
    <TooltipIconButton
      tooltip="Sign up"
      component={Link}
      to={{ pathname: "/register", state: { open: true } }}
    >
      <PersonAddIcon />
    </TooltipIconButton>
  </>
);

export default UnauthorizedButtons;
