import { CreateCommentType, CommentType } from "../types/comment";
import { SERVER_BASE_URL } from "../utils/constant";
import fetcher from "../utils/fetcher";

export const createArticleComment = (comment: CreateCommentType) =>
  fetcher.post<CommentType>(`${SERVER_BASE_URL}/comments`, comment);
