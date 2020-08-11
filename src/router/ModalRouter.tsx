import React, { FC, memo } from "react";
import { Switch, Route } from "react-router-dom";
import ArticlesRouter from "./ArticlesRouter";
import Login from "pages/Login";
import Register from "pages/Register";
import Settings from "pages/Settings";
import Editor from "pages/Editor";
import { Location } from "history";

type Props = { location?: Location; authorized: boolean };

const ModalRouter: FC<Props> = memo(({ location, authorized }) => (
  <Switch location={location}>
    <Route
      path="/articles"
      render={() => <ArticlesRouter authorized={authorized} />}
    />
    {authorized ? (
      <>
        <Route exact path="/new" render={() => <Editor />} />
        <Route exact path="/settings" render={() => <Settings />} />
      </>
    ) : (
      <>
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/register" render={() => <Register />} />
      </>
    )}
  </Switch>
));

export default ModalRouter;
