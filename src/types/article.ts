import { CommentType } from "./comment";

export type ArticlesObj = {
  [key: string]: ArticleType;
};

export interface ArticleEditorType {
  title: string;
  body: string;
}

export interface ArticleType extends ArticleEditorType {
  id: number;
  comments: CommentType[];
}
