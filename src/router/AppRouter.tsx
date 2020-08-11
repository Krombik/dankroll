import React, { FC, useRef, useEffect, useCallback } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Home from "pages/Home";
import { LocationState, ThunkDispatcher } from "types";
import ModalRouter from "./ModalRouter";
import User from "pages/User";
import { Location } from "history";
import { useDispatch } from "react-redux";
import { setBeforeModalLocation, closeModal } from "redux/modal/actions";
import Modal from "components/common/Modal";
import { State } from "types";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";

const selectData = createSelector(
  (state: State) => state.authentication.token,
  (token) => ({ authorized: !!token })
);

const AppRouter: FC = () => {
  const location = useLocation<LocationState>();
  const { authorized } = useSelector(selectData);
  const close = !location.state?.open;
  const beforeModalLocation = useRef<Location>();
  const prevLocation = useRef<Location>();
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleClose = useCallback(() => {
    dispatch(closeModal());
  }, []);
  useEffect(() => {
    if (close)
      dispatch(
        setBeforeModalLocation((beforeModalLocation.current = location))
      );
    prevLocation.current = location;
  });
  return (
    <>
      <Switch location={close ? location : beforeModalLocation.current}>
        <Route
          exact
          path="/"
          render={(props) => (
            <Home search={props.location.search} authorized={authorized} />
          )}
        />
        <Route
          exact
          path="/user/:username"
          render={(props) => (
            <User
              search={props.location.search}
              username={props.match.params.username}
            />
          )}
        />
        <ModalRouter authorized={authorized} />
      </Switch>
      <Modal open={!close} onClose={handleClose}>
        <ModalRouter
          authorized={authorized}
          location={(close && prevLocation.current) || location}
        />
      </Modal>
    </>
  );
};

export default AppRouter;
