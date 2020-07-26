import { SERVER_BASE_URL } from "../utils/constant";

export const ALL_ARTICLES_URL = `${SERVER_BASE_URL}/posts`;

export const getArticleUrl = (id: number) =>
  `${SERVER_BASE_URL}/posts/${id}?_embed=comments`;
