import { ThunkResult } from "types";
import { EditorActionTypes } from "./type";
import {
  ArticleEditorType,
  ArticleType,
  ArticleObj,
  ArticleCurrentEditorType,
} from "types/article";
import fetcher from "utils/fetcher";
import { getArticleUrl } from "api/article";
import { setError } from "../error/actions";
import { FetcherFailError } from "types/error";

export const setEditor = (
  key: string,
  editor: Partial<ArticleEditorType>
): ThunkResult => (dispatch) => {
  dispatch({
    type: EditorActionTypes.SET_EDITOR,
    payload: { key, editor },
  });
};

export const setCurrentEditor = (
  key: string,
  article?: ArticleType
): ThunkResult<Promise<void>> => async (dispatch, getState) => {
  let editor: ArticleCurrentEditorType;
  const {
    editor: { editors },
    authentication: { currentUserName },
  } = getState();
  if (key === "new") {
    editor = { title: "", description: "", body: "", tagList: [] };
  } else if (article) {
    editor = article;
  } else {
    const data = await fetcher.get<ArticleObj>(getArticleUrl(key.slice(1)));
    let accessDenied: boolean | undefined;
    if (
      data.status ||
      !data.article ||
      (accessDenied = data.article.author.username !== currentUserName)
    ) {
      dispatch(
        setError(
          true,
          accessDenied ? { status: 403 } : (data as FetcherFailError)
        )
      );
      return;
    }
    editor = data.article;
  }
  editors[key]
    ? dispatch({
        type: EditorActionTypes.SET_CURRENT,
        payload: editor,
      })
    : dispatch({
        type: EditorActionTypes.CREATE_EDITOR,
        payload: { key, editor },
      });
};

export const removeEditor = (key: string): ThunkResult => (dispatch) => {
  dispatch({
    type: EditorActionTypes.REMOVE_EDITOR,
    payload: key,
  });
};

export const resetEditor = (key: string): ThunkResult => (dispatch) => {
  dispatch({
    type: EditorActionTypes.RESET_EDITOR,
    payload: key,
  });
};
