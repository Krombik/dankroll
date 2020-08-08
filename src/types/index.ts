import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { combinedReducer } from "redux/reducer";
import { Actions } from "./actions";
import { FetcherFailError } from "./error";
import { Location } from "history";

export type State = ReturnType<ReturnType<typeof combinedReducer>>;

export type LocationState = { prevLocation?: Location };

export type ThunkResult<R = void> = ThunkAction<R, State, unknown, Actions>;

export type ThunkDispatcher = ThunkDispatch<State, any, Actions>;

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

export type FetchRV<T> = XOR<T, FetcherFailError>;
