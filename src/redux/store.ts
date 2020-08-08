import { createStore, applyMiddleware, Middleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { combinedReducer } from "./reducer";
import { persistStore } from "redux-persist";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { LocationState } from "types";

export const history = createBrowserHistory<LocationState>();
history.replace({});

const bindMiddleware = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return compose(applyMiddleware(...middleware));
};

export const store = createStore(
  combinedReducer(history),
  bindMiddleware([routerMiddleware(history), thunkMiddleware])
);

export const persistor = persistStore(store);
