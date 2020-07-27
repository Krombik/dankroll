import Grid from "@material-ui/core/Grid";
import React, { FC, useEffect } from "react";
import { FullWidthDivider } from "../components/common/styled";
import { ThunkDispatcher, State } from "../types";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import ArticleSection from "../containers/article/ArticleSection";
import CommentSection from "../containers/comment/CommentSection";
import { useParams } from "react-router-dom";
import { loadArticle } from "../redux/store/actions";
import { createSelector } from "reselect";

const selectData = createSelector(
  (state: State) => state.store.articlePages,
  (articlePages) => ({ articlePages })
);

const Article: FC = () => {
  const { postId } = useParams();
  const { articlePages } = useSelector(selectData);
  const dispatch = useDispatch<ThunkDispatcher>();
  useEffect(() => {
    dispatch(loadArticle(postId));
  });
  if (!articlePages || !articlePages[postId]) return <Spinner />;
  return (
    <Grid item container spacing={3}>
      <ArticleSection article={articlePages[postId]} />
      <Grid item xs={12}>
        <FullWidthDivider />
      </Grid>
      <CommentSection article={articlePages[postId]} />
    </Grid>
  );
};

export default Article;
