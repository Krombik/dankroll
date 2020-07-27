import { CommonActions } from "../redux/common/type";
import { ErrorActions } from "../redux/error/type";
import { EditorActions } from "../redux/editor/type";
import { StoreActions } from "../redux/store/type";

export type Actions =
  | CommonActions
  | ErrorActions
  | EditorActions
  | StoreActions;
