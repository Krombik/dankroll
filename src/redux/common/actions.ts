import { ThunkResult } from "../../types";
import { CommonActionTypes } from "./type";

export const setDark = (isDark: boolean): ThunkResult => (dispatch) => {
  dispatch({
    type: CommonActionTypes.SET_DARK,
    payload: isDark,
  });
};
