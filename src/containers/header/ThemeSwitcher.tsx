import Switch from "@material-ui/core/Switch";
import React, { FC } from "react";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { State, ThunkDispatcher } from "../../types";
import { setDark } from "../../redux/common/actions";
import { Tooltip } from "@material-ui/core";

const selectData = createSelector(
  (state: State) => state.common.dark,
  (dark) => ({ dark })
);

const ThemeSwitcher: FC = () => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const { dark } = useSelector(selectData);
  const handleTheme = () => {
    dispatch(setDark(!dark));
  };
  return (
    <Tooltip title={`Switch theme to ${dark ? "light" : "dark"}`}>
      <Switch checked={dark} onChange={handleTheme} color="default" />
    </Tooltip>
  );
};

export default ThemeSwitcher;
