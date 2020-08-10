import React, { FC, useRef, useEffect, useCallback } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Home from "pages/Home";
import { LocationState, ThunkDispatcher } from "types";
import ModalRouter from "./ModalRouter";
import User from "pages/User";
import { Location } from "history";
import { useDispatch } from "react-redux";
import { setPrevLocation, closeModal } from "redux/modal/actions";
import Modal from "components/common/Modal";

const AppRouter: FC = () => {
  const location = useLocation<LocationState>();
  const close = !location.state?.open;
  const prevLocation = useRef<Location>();
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleClose = useCallback(() => {
    dispatch(closeModal());
  }, []);
  useEffect(() => {
    if (close) dispatch(setPrevLocation(location));
    prevLocation.current = location;
  });
  return (
    <>
      <Switch location={close ? location : prevLocation.current}>
        <Route exact path="/" component={Home} />
        <Route exact path="/user/:username" component={User} />
        <ModalRouter />
      </Switch>
      <Modal open={!close} onClose={handleClose}>
        <ModalRouter location={(close && prevLocation.current) || location} />
      </Modal>
    </>
  );
};

export default AppRouter;
