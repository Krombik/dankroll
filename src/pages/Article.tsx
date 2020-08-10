import React, { FC, memo } from "react";
import "styled-components/macro";
import { State, UrlParams } from "types";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import CommentSection from "../containers/comment/CommentSection";
import ArticleSection from "../containers/article/ArticleSection";
import Divider from "@material-ui/core/Divider";
import { RouteComponentProps } from "react-router-dom";

const selectData = createSelector(
  (state: State) => state.authentication.token,
  (state: State) => state.authentication.currentUserName,
  (token, currentUserName) => ({ token, currentUserName })
);

const Article: FC<RouteComponentProps<UrlParams>> = memo(
  ({
    match: {
      params: { slug },
    },
  }) => {
    const { token, currentUserName } = useSelector(selectData);
    return (
      <>
        <ArticleSection
          slug={slug}
          token={token}
          currentUserName={currentUserName}
        />
        <Divider
          css={`
            width: 100%;
          `}
        />
        <CommentSection
          slug={slug}
          token={token}
          currentUserName={currentUserName}
        />
      </>
    );
  }
);

export default Article;
