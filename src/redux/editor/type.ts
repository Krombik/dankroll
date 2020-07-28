import { ArticleEditorType } from "../../types/article";

export enum EditorActionTypes {
  SET_EDITOR = "SET_EDITOR",
  REMOVE_EDITOR = "REMOVE_EDITOR",
}

type SetEditor = {
  type: EditorActionTypes.SET_EDITOR;
  payload: { key: string; editor: Partial<ArticleEditorType> };
};

type RemoveEditor = {
  type: EditorActionTypes.REMOVE_EDITOR;
  payload: number | string;
};

export type EditorActions = SetEditor | RemoveEditor;
