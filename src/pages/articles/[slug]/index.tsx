import React, { FC } from "react";
import Article from "containers/article/Article";
import { RouteComponentProps } from "react-router-dom";

const ArticlePage: FC<RouteComponentProps<{ slug: string }>> = ({
  match: {
    params: { slug },
  },
}) => <Article slug={slug} />;

export default ArticlePage;
