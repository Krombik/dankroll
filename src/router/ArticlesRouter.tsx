import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import ArticlePage from "../pages/articles/[slug]";
import EditArticlePage from "../pages/articles/[slug]/edit";

const ArticlesRouter: FC = () => {
  return (
    <Switch>
      <Route exact path={`/articles/:slug`} component={ArticlePage} />
      <Route exact path={`/articles/:slug/edit`} component={EditArticlePage} />
    </Switch>
  );
};

export default ArticlesRouter;
