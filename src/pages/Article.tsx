import Grid from "@material-ui/core/Grid";
import React, { FC, useEffect } from "react";
import { FullWidthDivider } from "../components/common/styled";
import fetcher from "../utils/fetcher";
import { FetchRV, ThunkDispatcher } from "../types";
import { useDispatch } from "react-redux";
import { setError } from "../redux/error/actions";
import useSWR from "swr";
import { ArticleType } from "../types/article";
import { getArticleUrl } from "../api/article";
import Spinner from "../components/common/Spinner";
import ArticleSection from "../containers/article/ArticleSection";
import CommentSection from "../containers/comment/CommentSection";
import { useParams } from "react-router-dom";

const Article: FC = () => {
  const { postId } = useParams();
  const { data, mutate } = useSWR<FetchRV<ArticleType>>(
    getArticleUrl(postId),
    fetcher.get
  );
  const dispatch = useDispatch<ThunkDispatcher>();
  useEffect(() => {
    if (data?.status) dispatch(setError(true, data.status));
  });
  if (!data) return <Spinner />;
  if (data.status) return null;
  return (
    <Grid item container spacing={3}>
      <ArticleSection article={data.res} />
      <Grid item xs={12}>
        <FullWidthDivider />
      </Grid>
      <CommentSection article={data.res} mutate={mutate} />
    </Grid>
  );
};

export default Article;
