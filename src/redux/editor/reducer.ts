import { EditorActionTypes, EditorActions } from "./type";
import { ArticleEditorType } from "../../types/article";

type State = {
  editors: { [key: string]: ArticleEditorType };
};

const initialState: State = {
  editors: {},
};

export default function reducer(
  state = initialState,
  action: EditorActions
): State {
  switch (action.type) {
    case EditorActionTypes.SET_EDITOR:
      return {
        ...state,
        editors: {
          ...state.editors,
          [action.payload.key]: {
            ...state.editors[action.payload.key],
            ...action.payload.editor,
          },
        },
      };
    case EditorActionTypes.REMOVE_EDITOR:
      return {
        ...state,
        editors: (({ [action.payload]: _, ...rest }) => rest)(state.editors),
      };
    default:
      return state;
  }
}
