import { ActionTypes, ModalActions } from "./type";
import { Location } from "history";

type State = {
  prevLocation: Location | null;
};

const initialState: State = {
  prevLocation: null,
};

export default function reducer(
  state = initialState,
  action: ModalActions
): State {
  switch (action.type) {
    case ActionTypes.SET_PREV_LOCATION:
      return {
        ...state,
        prevLocation: action.payload,
      };
    default:
      return state;
  }
}
