import React, { FC, useState } from "react";
import SubscriptionsTwoToneIcon from "@material-ui/icons/SubscriptionsTwoTone";
import { followUser } from "api/user";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "types";
import { setError } from "redux/error/actions";
import TooltipIconButton from "components/common/TooltipIconButton";
import SwitchableIcon from "components/common/SwitchableIcon";

type Props = {
  username: string;
  mutate: (...args: any) => any;
  token: string;
  follow: boolean;
};

const UserSubscribeButton: FC<Props> = ({
  username,
  token,
  mutate,
  follow,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleSubscribe = token
    ? async () => {
        if (!loading) {
          setLoading(true);
          const data = await followUser(!follow, username, token);
          if (data.profile) {
            mutate(data, false);
            setLoading(false);
          } else {
            dispatch(setError(true, data));
          }
        }
      }
    : undefined;
  return (
    <TooltipIconButton
      tooltip={follow ? "Unsubscribe" : "Subscribe"}
      disabled={!token}
      onClick={handleSubscribe}
    >
      <SwitchableIcon
        fontSize="inherit"
        color="inherit"
        active={follow}
        Icon={SubscriptionsTwoToneIcon}
      />
    </TooltipIconButton>
  );
};

export default UserSubscribeButton;
