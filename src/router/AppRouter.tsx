import React, { FC } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Home from "pages";
import NewArticlePage from "../pages/new";
import ArticlesRouter from "./ArticlesRouter";
import UserPage from "../pages/user/[username]";
import { LocationState } from "types";

const AppRouter: FC = () => {
  const location = useLocation<LocationState>();
  return (
    <Switch location={location.state?.prevLocation || location}>
      <Route path="/articles" children={ArticlesRouter} />
      <Route exact path="/" component={Home} />
      <Route exact path="/new" component={NewArticlePage} />
      <Route exact path="/user/:username" component={UserPage} />
    </Switch>
  );
};

export default AppRouter;
