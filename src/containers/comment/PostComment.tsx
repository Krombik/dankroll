import Grid from "@material-ui/core/Grid";
import React, { FC, useState, useCallback, ChangeEvent } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import { ThunkDispatcher } from "../../types";
import { createArticleComment } from "../../api/comment";
import { useDispatch } from "react-redux";
import { setError } from "../../redux/error/actions";
import { addComment } from "../../redux/store/actions";

type Props = {
  postId: number;
};

const PostComment: FC<Props> = ({ postId }) => {
  const [loading, setLoading] = useState(false);
  const [body, setComment] = useState("");
  const handleComment = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.currentTarget.value);
  }, []);
  const dispatch = useDispatch<ThunkDispatcher>();
  const postComment = async () => {
    if (body.trim().length > 0) {
      setLoading(true);
      const { res, status } = await createArticleComment({ postId, body });
      if (res && !status) {
        dispatch(addComment(postId, res));
        setComment("");
      } else {
        dispatch(setError(true, status));
      }
      setLoading(false);
    }
  };
  return (
    <Card>
      <CardMedia>
        <TextField
          value={body}
          variant="outlined"
          onChange={handleComment}
          multiline
          rows={3}
          fullWidth
        />
      </CardMedia>
      <CardActions>
        <Grid container justify="flex-end">
          <Button
            variant="contained"
            onClick={postComment}
            color="primary"
            disabled={loading}
          >
            Post comment
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default PostComment;
