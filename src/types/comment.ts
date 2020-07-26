export interface CommentType extends CreateCommentType {
  id: number;
}

export interface CreateCommentType {
  body: string;
  postId: number;
}
