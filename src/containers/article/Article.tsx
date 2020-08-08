import React, { FC, memo } from "react";
import "styled-components/macro";
import { State } from "types";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import CommentSection from "../comment/CommentSection";
import ArticleSection from "./ArticleSection";
import Divider from "@material-ui/core/Divider";

const selectData = createSelector(
  (state: State) => state.authentication.token,
  (state: State) => state.authentication.currentUserName,
  (token, currentUserName) => ({ token, currentUserName })
);

type Props = {
  slug: string;
};

const Article: FC<Props> = memo(({ slug }) => {
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
});

export default Article;
