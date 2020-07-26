import Grid from "@material-ui/core/Grid";
import React, { FC } from "react";
import { CommentType } from "../../types/comment";
import Comment from "../../components/common/Comment";

type Props = {
  comments: CommentType[];
};

const Comments: FC<Props> = ({ comments }) => (
  <>
    {comments.map((comment, index) => (
      <Grid item xs={12} key={index}>
        <Comment body={comment.body} />
      </Grid>
    ))}
  </>
);

export default Comments;
