import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import React, { FC, memo } from "react";
import Container from "@material-ui/core/Container";
import MuiLink from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import { SITE_NAME } from "../../utils/constant";
import ThemeSwitcher from "./ThemeSwitcher";
import CreateIcon from "@material-ui/icons/Create";
import TooltipIconLink from "../../components/common/TooltipIconLink";

const Header: FC = memo(() => (
  <AppBar position="static" color="default">
    <Container maxWidth="lg">
      <Toolbar disableGutters>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">
              <MuiLink color="inherit" underline="none" component={Link} to="/">
                {SITE_NAME}
              </MuiLink>
            </Typography>
          </Grid>
          <Grid item>
            <TooltipIconLink to="/article/new" tooltip="New article">
              <CreateIcon />
            </TooltipIconLink>
            <ThemeSwitcher />
          </Grid>
        </Grid>
      </Toolbar>
    </Container>
  </AppBar>
));

export default Header;
