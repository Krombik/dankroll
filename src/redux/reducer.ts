import { combineReducers } from "redux";
import { persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import articleTabsReducer from "./articleTabs/reducer";
import commonReducer from "./common/reducer";
import modalReducer from "./modal/reducer";
import authenticationReducer from "./authentication/reducer";
import errorReducer from "./error/reducer";
import editorReducer from "./editor/reducer";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import { getCurrentUser } from "api/user";
import { LocationState } from "types";

const authenticationConfig: PersistConfig<any> = {
  key: "token",
  storage: storage,
  whitelist: ["token"],
  migrate: async (state: any, version) =>
    version === -1 && state.token
      ? {
          ...state,
          currentUserName:
            (await getCurrentUser(state.token)).user?.username || "",
        }
      : state,
};

const articleTabsConfig: PersistConfig<any> = {
  key: "tab-list",
  storage: storage,
  whitelist: ["tabList", "offset"],
};

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

export const combinedReducer = (history: History<LocationState>) =>
  combineReducers({
    router: connectRouter(history),
    articleTabs: persistReducer(articleTabsConfig, articleTabsReducer),
    common: persistReducer(commonConfig, commonReducer),
    modal: modalReducer,
    authentication: persistReducer(authenticationConfig, authenticationReducer),
    error: errorReducer,
    editor: persistReducer(editorConfig, editorReducer),
  });
