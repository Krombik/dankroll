import { ActionTypes, ModalActions } from "./type";
import { Location } from "history";

type State = {
  beforeModalLocation: Location | null;
};

const initialState: State = {
  beforeModalLocation: null,
};

export default function reducer(
  state = initialState,
  action: ModalActions
): State {
  switch (action.type) {
    case ActionTypes.BEFORE_MODAL_LOCATION:
      return {
        ...state,
        beforeModalLocation: action.payload,
      };
    default:
      return state;
  }
}
