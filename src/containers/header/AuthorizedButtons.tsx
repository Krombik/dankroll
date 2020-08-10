import React, { FC, useCallback } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import TooltipIconButton from "components/common/TooltipIconButton";
import CreateIcon from "@material-ui/icons/Create";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "types";
import { setAuthorized } from "redux/authentication/actions";
import { Link } from "react-router-dom";

type Props = {
  currentUserName: string;
};

const AuthorizedButtons: FC<Props> = ({ currentUserName }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleLogout = useCallback(() => {
    dispatch(setAuthorized("", ""));
  }, []);
  return (
    <>
      <TooltipIconButton
        tooltip="New post"
        component={Link}
        to={{ pathname: "/new", state: { open: true } }}
      >
        <CreateIcon />
      </TooltipIconButton>
      <TooltipIconButton
        tooltip={currentUserName}
        component={Link}
        to={`/user/${currentUserName}`}
      >
        <AccountCircleIcon />
      </TooltipIconButton>
      <TooltipIconButton tooltip="Logout" onClick={handleLogout}>
        <MeetingRoomIcon />
      </TooltipIconButton>
    </>
  );
};

export default AuthorizedButtons;
