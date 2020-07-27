import { EditorActionTypes, EditorActions } from "./type";
import { ArticleEditorObj } from "../../types/article";

type State = {
  editors: ArticleEditorObj;
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
    case EditorActionTypes.CLEAR_EDITOR:
      return {
        ...state,
        editors: (({ [action.payload]: _, ...rest }) => rest)(state.editors),
      };
    default:
      return state;
  }
}
