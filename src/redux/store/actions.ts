import { ThunkResult } from "../../types";
import { StoreActionTypes } from "./type";
import { ArticleType } from "../../types/article";
import fetcher from "../../utils/fetcher";
import { getArticleUrl, ALL_ARTICLES_URL } from "../../api/article";
import { setError } from "../error/actions";
import { CommentType } from "../../types/comment";

export const loadArticles = (): ThunkResult<Promise<void>> => async (
  dispatch
) => {
  const { res, status } = await fetcher.get<ArticleType[]>(ALL_ARTICLES_URL);
  if (status) {
    dispatch(setError(true, status));
    return;
  }
  dispatch({
    type: StoreActionTypes.SET_ARTICLES,
    payload: res,
  });
};

export const setArticles = (articles: ArticleType[]): ThunkResult => (
  dispatch
) => {
  dispatch({
    type: StoreActionTypes.SET_ARTICLES,
    payload: articles,
  });
};

export const addComment = (key: number, comment: CommentType): ThunkResult => (
  dispatch
) => {
  dispatch({
    type: StoreActionTypes.ADD_COMMENT,
    payload: { key, comment },
  });
};

export const loadArticle = (key: string): ThunkResult<Promise<void>> => async (
  dispatch
) => {
  const { res, status } = await fetcher.get<ArticleType>(getArticleUrl(key));
  if (status) {
    dispatch(setError(true, status));
    return;
  }
  dispatch({
    type: StoreActionTypes.SET_ARTICLE,
    payload: { [key]: res },
  });
};

export const removeArticle = (key: string): ThunkResult => (dispatch) => {
  dispatch({
    type: StoreActionTypes.REMOVE_ARTICLE,
    payload: key,
  });
};
