import React, { FC } from "react";
import "styled-components/macro";
import Fade from "@material-ui/core/Fade";
import MuiModal, { ModalProps } from "@material-ui/core/Modal";
import { Grid, Theme } from "@material-ui/core";
import { ThemeProps } from "styled-components/macro";

const Modal: FC<ModalProps> = ({ children, ...props }) => (
  <MuiModal
    disableEnforceFocus
    disableAutoFocus
    {...props}
    closeAfterTransition
    BackdropProps={{
      timeout: 500,
    }}
    css={`
      display: flex;
      margin: auto;
    `}
  >
    <Fade in={props.open}>
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
