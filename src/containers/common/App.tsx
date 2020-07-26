import React, { FC, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import Home from "./Home";
import { State } from "../../types";
import makeTheme from "../../utils/makeTheme";
import Layout from "../../components/common/Layout";

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
              {/* <Route path="/articles">
            <Users />
          </Route> */}
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Layout>
        </Router>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;
