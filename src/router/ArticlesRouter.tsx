import React, { FC, memo } from "react";
import { Switch, Route } from "react-router-dom";
import Article from "pages/Article";
import Editor from "pages/Editor";

type Props = { authorized: boolean };

const ArticlesRouter: FC<Props> = memo(({ authorized }) => (
  <Switch>
    <Route
      exact
      path={`/articles/:slug`}
      render={(props) => <Article slug={props.match.params.slug} />}
    />
    {authorized && (
      <Route
        exact
        path={`/articles/:slug/edit`}
        render={(props) => <Editor slug={props.match.params.slug} />}
      />
    )}
  </Switch>
));

export default ArticlesRouter;
