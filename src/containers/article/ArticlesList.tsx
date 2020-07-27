import { ArticleType } from "../../types/article";
import React, { FC, useEffect } from "react";
import useSWR from "swr";
import Grid from "@material-ui/core/Grid";
import { ALL_ARTICLES_URL } from "../../api/article";
import { FetchRV, ThunkDispatcher } from "../../types";
import ArticlePreviewSection from "./ArticlePreviewSection";
import ArticlePreviewSkeletonSection from "./ArticlePreviewSkeletonSection";
import Typography from "@material-ui/core/Typography";
import fetcher from "../../utils/fetcher";
import { useDispatch } from "react-redux";
import { setError } from "../../redux/error/actions";

const ArticleList: FC = () => {
  const { data, mutate } = useSWR<FetchRV<ArticleType[]>>(
    ALL_ARTICLES_URL,
    fetcher.get
  );
  const dispatch = useDispatch<ThunkDispatcher>();
  useEffect(() => {
    if (data?.status) dispatch(setError(true, data.status));
  });
  if (!data) return <ArticlePreviewSkeletonSection count={10} />;
  if (!data.res?.length)
    return (
      <Grid item xs={12}>
        <Typography align="center">No articles available</Typography>
      </Grid>
    );
  return <ArticlePreviewSection articles={data.res} mutate={mutate} />;
};

export default ArticleList;
