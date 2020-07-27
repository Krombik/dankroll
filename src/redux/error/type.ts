export enum ErrorActionTypes {
  SET_ERROR = "SET_ERROR",
}

type SetError = {
  type: ErrorActionTypes.SET_ERROR;
  payload: {
    error: boolean;
    errorText?: string;
    errorStatus?: number;
  };
};

export type ErrorActions = SetError;
