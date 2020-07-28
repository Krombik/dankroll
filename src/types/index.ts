import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { combinedReducer } from "../redux/reducer";
import { Actions } from "./actions";

export type State = ReturnType<typeof combinedReducer>;

export type ThunkResult<R = void> = ThunkAction<R, State, unknown, Actions>;

export type ThunkDispatcher = ThunkDispatch<State, any, Actions>;
