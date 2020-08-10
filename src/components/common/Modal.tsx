import React, { FC } from "react";
import "styled-components/macro";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import MuiModal, { ModalProps } from "@material-ui/core/Modal";
import MuiBackdrop, { BackdropProps } from "@material-ui/core/Backdrop";
import { Theme } from "@material-ui/core";
import { ThemeProps } from "styled-components/macro";

const Backdrop: FC<BackdropProps> = (props) => (
  <MuiBackdrop {...props} transitionDuration={500} />
);

const Modal: FC<ModalProps> = ({ children, ...props }) => (
  <MuiModal
    {...props}
    closeAfterTransition
    css={`
      display: flex;
      margin: auto;
    `}
    BackdropComponent={Backdrop}
  >
    <Fade in={props.open} timeout={500}>
      <Grid
        container
        spacing={3}
        css={`
          flex-direction: column;
          flex-wrap: nowrap;
          background: ${({ theme }: ThemeProps<Theme>) =>
            theme.palette.background.default};
          border-radius: ${({ theme }: ThemeProps<Theme>) =>
            theme.shape.borderRadius}px;
          margin: auto;
          width: auto;
          max-width: 99vw;
          max-height: 90vh;
          overflow-y: auto;
          overflow-x: hidden;
        `}
      >
        {children}
      </Grid>
    </Fade>
  </MuiModal>
);

export default Modal;
