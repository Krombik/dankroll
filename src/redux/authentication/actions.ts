import { ThunkResult } from "types";
import { ActionTypes } from "./type";

export const setAuthorized = (
  token: string,
  currentUserName: string
): ThunkResult => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_AUTHORIZED,
    payload: { token, currentUserName },
  });
};
