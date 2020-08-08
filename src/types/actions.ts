import { ArticleActions } from "redux/articleTabs/type";
import { CommonActions } from "redux/common/type";
import { ModalActions } from "redux/modal/type";
import { RehydrateAction } from "redux-persist";
import { ErrorActions } from "redux/error/type";
import { AuthenticationActions } from "redux/authentication/type";
import { EditorActions } from "redux/editor/type";
import { RouterAction } from "connected-react-router";

export type Actions =
  | ArticleActions
  | CommonActions
  | ErrorActions
  | AuthenticationActions
  | ModalActions
  | EditorActions
  | RehydrateAction
  | RouterAction;
