import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import Article from "pages/Article";
import Editor from "pages/Editor";

const ArticlesRouter: FC = () => {
  return (
    <Switch>
      <Route exact path={`/articles/:slug`} component={Article} />
      <Route exact path={`/articles/:slug/edit`} component={Editor} />
    </Switch>
  );
};

export default ArticlesRouter;
