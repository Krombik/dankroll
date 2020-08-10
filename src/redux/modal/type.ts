import { Location } from "history";

export enum ActionTypes {
  SET_PREV_LOCATION = "SET_PREV_LOCATION",
}

type SetPrevLocation = {
  type: ActionTypes.SET_PREV_LOCATION;
  payload: Location;
};

export type ModalActions = SetPrevLocation;
