import { CommonActions } from "../redux/common/type";
import { ErrorActions } from "../redux/error/type";

export type Actions = CommonActions | ErrorActions;
