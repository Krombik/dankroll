import React, { FC, useCallback } from "react";
import CardHeader, { CardHeaderProps } from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import MuiLink from "@material-ui/core/Link";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "types";
import { setModal } from "redux/modal/actions";
import { Link } from "react-router-dom";

type Props = {
  username: string | JSX.Element;
  avatar: string | JSX.Element;
  date: string | JSX.Element;
};

const ContentInfo: FC<Props & CardHeaderProps> = ({
  username,
  avatar,
  date,
  ...props
}) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const closeModal = useCallback(() => {
    dispatch(setModal(false));
  }, []);
  const isNotSkeleton = typeof username === "string";
  return (
    <CardHeader
      avatar={
        isNotSkeleton ? (
          <MuiLink
            color="inherit"
            component={Link}
            to={`/user/${username}`}
            onClick={closeModal}
          >
            <Avatar src={avatar as string}>{username[0]}</Avatar>
          </MuiLink>
        ) : (
          avatar
        )
      }
      title={
        isNotSkeleton ? (
          <MuiLink
            color="inherit"
            component={Link}
            to={`/user/${username}`}
            onClick={closeModal}
          >
            {username}
          </MuiLink>
        ) : (
          username
        )
      }
      subheader={date}
      {...props}
    />
  );
};

export default ContentInfo;
