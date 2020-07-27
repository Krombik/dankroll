import React, { FC, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { ThunkDispatcher, State } from "../../types";
import ArticlePreviewSection from "./ArticlePreviewSection";
import ArticlePreviewSkeletonSection from "./ArticlePreviewSkeletonSection";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { loadArticles } from "../../redux/store/actions";
import { createSelector } from "reselect";

const selectData = createSelector(
  (state: State) => state.store.articles,
  (articles) => ({ articles })
);

const ArticleList: FC = () => {
  const { articles } = useSelector(selectData);
  const dispatch = useDispatch<ThunkDispatcher>();
  useEffect(() => {
    dispatch(loadArticles());
  }, []);
  if (!articles) return <ArticlePreviewSkeletonSection count={10} />;
  if (articles.length === 0)
    return (
      <Grid item xs={12}>
        <Typography align="center">No articles available</Typography>
      </Grid>
    );
  return <ArticlePreviewSection articles={articles} />;
};

export default ArticleList;
