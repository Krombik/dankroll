import { ThunkResult } from "types";
import { ActionTypes } from "./type";
import { push, replace } from "connected-react-router";
import { Location } from "history";

export const closeModal = (isReplace?: boolean): ThunkResult => (
  dispatch,
  getState
) => {
  const { prevLocation } = getState().modal;
  const arg = prevLocation || ("/" as any);
  dispatch(isReplace ? replace(arg) : push(arg));
};

export const setPrevLocation = (location: Location): ThunkResult => (
  dispatch
) => {
  dispatch({
    type: ActionTypes.SET_PREV_LOCATION,
    payload: location,
  });
};
