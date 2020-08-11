import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./containers/common/App";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor, history } from "./redux/store";
import { ConnectedRouter } from "connected-react-router";
import "font.css";

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history} noInitialPop>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
