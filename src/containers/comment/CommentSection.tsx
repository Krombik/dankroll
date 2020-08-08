import React, { FC, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Comments from "../comment/Comments";
import PostComment from "../comment/PostComment";
import { CommentsObj } from "types/comment";
import { getArticleCommentsUrl } from "api/comment";
import Typography from "@material-ui/core/Typography";
import { FetchRV, ThunkDispatcher } from "types";
import Spinner from "components/common/Spinner";
import { useDispatch } from "react-redux";
import { setError } from "redux/error/actions";
import Gutter from "components/common/Gutter";
import useSWR from "swr";
import fetcher from "utils/fetcher";

type Props = {
  token: string;
  currentUserName: string;
  slug: string;
};

const CommentSection: FC<Props> = ({ token, currentUserName, slug }) => {
  const { data, mutate } = useSWR<FetchRV<CommentsObj>>(
    [getArticleCommentsUrl(slug), token],
    fetcher.get
  );
  const dispatch = useDispatch<ThunkDispatcher>();
  useEffect(() => {
    if (data?.status) dispatch(setError(true, data));
  }, [data]);
  if (!data) return <Spinner />;
  const { comments } = data;
  if (data.status || !comments) return null;
  return (
    <Gutter>
      <Grid item xs={12}>
        <Typography variant="h4">Comments: {comments.length}</Typography>
      </Grid>
      {token && (
        <Grid item xs={12}>
          <PostComment
            slug={slug}
            token={token}
            mutate={mutate}
            comments={comments}
          />
        </Grid>
      )}
      {comments.length > 0 && (
        <Comments
          comments={comments}
          slug={slug}
          token={token}
          mutate={mutate}
          currentUserName={currentUserName}
        />
      )}
    </Gutter>
  );
};

export default CommentSection;
