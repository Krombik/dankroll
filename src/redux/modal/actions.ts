import { ThunkResult } from "types";
import { ActionTypes } from "./type";
import { push, replace } from "connected-react-router";
import { Location } from "history";

export const closeModal = (isReplace?: boolean): ThunkResult => (
  dispatch,
  getState
) => {
  const { beforeModalLocation } = getState().modal;
  const arg = beforeModalLocation || ("/" as any);
  dispatch(isReplace ? replace(arg) : push(arg));
};

export const setBeforeModalLocation = (location: Location): ThunkResult => (
  dispatch
) => {
  dispatch({
    type: ActionTypes.BEFORE_MODAL_LOCATION,
    payload: location,
  });
};
