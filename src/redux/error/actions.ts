import { ThunkResult } from "../../types";
import { ErrorActionTypes } from "./type";

export const setError = (error: boolean, errorStatus?: number): ThunkResult => (
  dispatch
) => {
  dispatch({
    type: ErrorActionTypes.SET_ERROR,
    payload: error
      ? {
          error,
          errorStatus,
          errorText:
            errorStatus === 404
              ? "Not Found"
              : errorStatus === 500
              ? "Internal Server Error"
              : "Something going wrong",
        }
      : { error },
  });
};
