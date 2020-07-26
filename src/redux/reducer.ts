import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import commonReducer from "./common/reducer";
import errorReducer from "./error/reducer";

const commonConfig = {
  key: "dark",
  storage: storage,
  whitelist: ["dark"],
};

export const combinedReducer = combineReducers({
  common: persistReducer(commonConfig, commonReducer),
  error: errorReducer,
});
