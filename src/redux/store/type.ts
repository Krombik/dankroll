import { ArticleType, ArticlesObj } from "../../types/article";
import { CommentType } from "../../types/comment";

export enum StoreActionTypes {
  SET_ARTICLES = "SET_ARTICLES",
  SET_ARTICLE = "SET_ARTICLE",
  REMOVE_ARTICLE = "REMOVE_ARTICLE",
  ADD_COMMENT = "ADD_COMMENT",
}

type SetArticles = {
  type: StoreActionTypes.SET_ARTICLES;
  payload: ArticleType[];
};

type SetArticle = {
  type: StoreActionTypes.SET_ARTICLE;
  payload: ArticlesObj;
};

type RemoveArticle = {
  type: StoreActionTypes.REMOVE_ARTICLE;
  payload: string;
};

type AddComment = {
  type: StoreActionTypes.ADD_COMMENT;
  payload: { key: number; comment: CommentType };
};

export type StoreActions =
  | SetArticles
  | SetArticle
  | RemoveArticle
  | AddComment;
