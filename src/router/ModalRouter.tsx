import React, { FC, memo } from "react";
import { Switch, Route } from "react-router-dom";
import ArticlesRouter from "./ArticlesRouter";
import Login from "pages/Login";
import Register from "pages/Register";
import Settings from "pages/Settings";
import Editor from "pages/Editor";
import { Location } from "history";

type Props = { location?: Location };

const ModalRouter: FC<Props> = memo(({ location }) => (
  <Switch location={location}>
    <Route path="/articles" component={ArticlesRouter} />
    <Route exact path="/new" component={Editor} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/settings" component={Settings} />
  </Switch>
));

export default ModalRouter;
