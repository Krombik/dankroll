import React, { FC, memo, useCallback } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { State, ThunkDispatcher } from "../../types";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../../redux/error/actions";

const selectData = createSelector(
  (state: State) => state.error.error,
  (state: State) => state.error.errorStatus,
  (state: State) => state.error.errorText,
  (error, errorStatus, errorText) => ({ error, errorStatus, errorText })
);

const ErrorAlert: FC = memo(() => {
  const { error, errorStatus, errorText } = useSelector(selectData);
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleClose = useCallback(() => {
    dispatch(setError(false));
  }, []);
  return (
    <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity="error"
      >
        <strong>{errorStatus}</strong>
        {" - "}
        {errorText}
      </Alert>
    </Snackbar>
  );
});

export default ErrorAlert;
