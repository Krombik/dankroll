import { createStore, applyMiddleware, Middleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { combinedReducer } from "./reducer";

const bindMiddleware = (middleware: Middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(middleware));
  }
  return applyMiddleware(middleware);
};

export const store = createStore(
  combinedReducer,
  bindMiddleware(thunkMiddleware)
);
