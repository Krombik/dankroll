import { SERVER_BASE_URL } from "../utils/constant";
import { ArticleEditorType, ArticleType } from "../types/article";
import fetcher from "../utils/fetcher";

export const ALL_ARTICLES_URL = `${SERVER_BASE_URL}/posts`;

export const getArticleUrl = (id: number | string, noComments?: boolean) =>
  `${ALL_ARTICLES_URL}/${id}${noComments ? "" : "?_embed=comments"}`;

export const editArticle = (id: number | string, article: ArticleEditorType) =>
  id !== "new"
    ? fetcher.put<ArticleType>(`${ALL_ARTICLES_URL}/${id}`, article)
    : fetcher.post<ArticleType>(ALL_ARTICLES_URL, article);

export const deleteArticle = (id: number | string) =>
  fetcher.delete<any>(`${ALL_ARTICLES_URL}/${id}`);
