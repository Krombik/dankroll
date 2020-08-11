import { Location } from "history";

export enum ActionTypes {
  BEFORE_MODAL_LOCATION = "BEFORE_MODAL_LOCATION",
}

type SetBeforeModalLocation = {
  type: ActionTypes.BEFORE_MODAL_LOCATION;
  payload: Location;
};

export type ModalActions = SetBeforeModalLocation;
