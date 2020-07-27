import { ThunkResult } from "../../types";
import { EditorActionTypes } from "./type";
import { ArticleEditorType, ArticleType } from "../../types/article";
import fetcher from "../../utils/fetcher";
import { getArticleUrl } from "../../api/article";
import { setError } from "../error/actions";

export const setEditor = (
  key: string,
  editor: Partial<ArticleEditorType>
): ThunkResult => (dispatch) => {
  dispatch({
    type: EditorActionTypes.SET_EDITOR,
    payload: { key, editor },
  });
};

export const createEditor = (key: string): ThunkResult<Promise<void>> => async (
  dispatch
) => {
  let editor: ArticleEditorType;
  if (key !== "new") {
    const { res, status } = await fetcher.get<ArticleType>(getArticleUrl(key));
    if (status) {
      dispatch(setError(true, status));
      return;
    }
    editor = { title: res.title, body: res.body };
  } else editor = { title: "", body: "" };
  dispatch({
    type: EditorActionTypes.SET_EDITOR,
    payload: { key, editor },
  });
};

export const removeEditor = (key: string): ThunkResult => (dispatch) => {
  dispatch({
    type: EditorActionTypes.REMOVE_EDITOR,
    payload: key,
  });
};
