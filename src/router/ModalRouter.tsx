import React, { FC, memo } from "react";
import { Switch, Route } from "react-router-dom";
import ArticlesRouter from "./ArticlesRouter";
import Login from "pages/Login";
import Register from "pages/Register";
import Settings from "pages/Settings";
import Editor from "pages/Editor";
import { Location } from "history";
import { State } from "types";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";

const selectData = createSelector(
  (state: State) => state.authentication.token,
  (token) => ({ authorized: !!token })
);

type Props = { location?: Location };

const ModalRouter: FC<Props> = memo(({ location }) => {
  const { authorized } = useSelector(selectData);
  return (
    <Switch location={location}>
      <Route
        path="/articles"
        render={() => <ArticlesRouter authorized={authorized} />}
      />
      {authorized ? (
        <>
          <Route exact path="/new" component={Editor} />
          <Route exact path="/settings" component={Settings} />
        </>
      ) : (
        <>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </>
      )}
    </Switch>
  );
});

export default ModalRouter;
