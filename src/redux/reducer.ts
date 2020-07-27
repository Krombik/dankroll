import { combineReducers } from "redux";
import { persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import commonReducer from "./common/reducer";
import errorReducer from "./error/reducer";
import editorReducer from "./editor/reducer";

const commonConfig: PersistConfig<any> = {
  key: "dark",
  storage: storage,
  whitelist: ["dark"],
};

const editorConfig: PersistConfig<any> = {
  key: "editors",
  storage: storage,
  whitelist: ["editors"],
};

export const combinedReducer = combineReducers({
  common: persistReducer(commonConfig, commonReducer),
  error: errorReducer,
  editor: persistReducer(editorConfig, editorReducer),
});
