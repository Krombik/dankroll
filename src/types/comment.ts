export type CommentType = {
  id: number;
  postId: number;
  body: string;
};

export type CreateCommentType = {
  body: string;
};
