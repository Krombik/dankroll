import React, { FC, useCallback, MouseEvent } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import TooltipIconButton from "components/common/TooltipIconButton";
import CreateIcon from "@material-ui/icons/Create";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "types";
import { setAuthorized } from "redux/authentication/actions";
import { setModal } from "redux/modal/actions";
import { Link, useLocation } from "react-router-dom";

type Props = {
  currentUserName: string;
};

const AuthorizedButtons: FC<Props> = ({ currentUserName }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleLogout = useCallback(() => {
    dispatch(setAuthorized("", ""));
  }, []);
  const location = useLocation();
  const handleEditor = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    if (!window.location.pathname.startsWith("/new")) {
      dispatch(setModal(true, "new"));
    }
  }, []);
  return (
    <>
      <TooltipIconButton
        tooltip="New post"
        component={Link}
        to={{ pathname: "/new", state: { prevLocation: location } }}
        onClick={handleEditor}
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
