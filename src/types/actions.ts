import { CommonActions } from "../redux/common/type";
import { ErrorActions } from "../redux/error/type";
import { EditorActions } from "../redux/editor/type";

export type Actions = CommonActions | ErrorActions | EditorActions;
