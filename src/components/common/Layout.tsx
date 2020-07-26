import Container from "@material-ui/core/Container";
import React, { FC } from "react";
import Header from "../../containers/header/Header";
import ErrorAlert from "../../containers/common/ErrorAlert";

const Layout: FC = ({ children }) => (
  <>
    <Header />
    <Container maxWidth="lg">{children}</Container>
    <ErrorAlert />
  </>
);

export default Layout;
