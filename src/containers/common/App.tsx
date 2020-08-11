import React, { FC, useMemo } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State } from "types";
import makeTheme from "utils/makeTheme";
import GlobalStyle from "components/common/GlobalStyle";
import AppRouter from "router/AppRouter";
import Layout from "components/common/Layout";
import { ThemeProvider } from "styled-components";

const selectData = createSelector(
  (state: State) => state.common.dark,
  (dark) => ({ dark })
);

const App: FC = () => {
  const { dark } = useSelector(selectData);
  const theme = useMemo(() => makeTheme(dark), [dark]);
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <CssBaseline />
          <Layout>
            <AppRouter />
          </Layout>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};

export default App;
