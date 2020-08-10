import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import Article from "pages/Article";
import Editor from "pages/Editor";

type Props = { authorized: boolean };

const ArticlesRouter: FC<Props> = ({ authorized }) => (
  <Switch>
    <Route exact path={`/articles/:slug`} component={Article} />
    {authorized && (
      <Route exact path={`/articles/:slug/edit`} component={Editor} />
    )}
  </Switch>
);

export default ArticlesRouter;
