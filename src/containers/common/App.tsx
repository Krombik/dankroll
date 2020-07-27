import React, { FC, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import Home from "../../pages/Home";
import { State } from "../../types";
import makeTheme from "../../utils/makeTheme";
import Layout from "../../components/common/Layout";
import Article from "../../pages/Article";
import Editor from "../../pages/Editor";

const selectData = createSelector(
  (state: State) => state.common.dark,
  (dark) => ({ dark })
);

const App: FC = () => {
  const { dark } = useSelector(selectData);
  const theme = useMemo(() => makeTheme(dark), [dark]);
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/article/new">
                <Editor />
              </Route>
              <Route exact path="/article/:postId">
                <Article />
              </Route>
              <Route exact path="/article/:postId/edit">
                <Editor />
              </Route>
            </Switch>
          </Layout>
        </Router>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;
