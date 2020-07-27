import { ArticleEditorType } from "../../types/article";

export enum EditorActionTypes {
  SET_EDITOR = "SET_EDITOR",
  CLEAR_EDITOR = "CLEAR_EDITOR",
}

type SetEditor = {
  type: EditorActionTypes.SET_EDITOR;
  payload: { key: string; editor: Partial<ArticleEditorType> };
};

type ClearEditor = {
  type: EditorActionTypes.CLEAR_EDITOR;
  payload: string;
};

export type EditorActions = SetEditor | ClearEditor;
