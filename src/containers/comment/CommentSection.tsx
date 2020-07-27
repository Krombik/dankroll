import Grid from "@material-ui/core/Grid";
import React, { FC } from "react";
import Comments from "../comment/Comments";
import PostComment from "../comment/PostComment";
import Typography from "@material-ui/core/Typography";
import { ArticleType } from "../../types/article";

type Props = {
  article: ArticleType;
};

const CommentSection: FC<Props> = (props) => {
  const {
    article: { comments },
  } = props;
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h4">Comments: {comments.length}</Typography>
      </Grid>
      <Grid item xs={12}>
        <PostComment postId={props.article.id} />
      </Grid>
      {comments.length > 0 && <Comments comments={comments} />}
    </>
  );
};

export default CommentSection;
