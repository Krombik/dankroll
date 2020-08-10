import React, { FC, useState, ChangeEvent, useCallback } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import MuiLink from "@material-ui/core/Link";
import { loginUser } from "api/user";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "types";
import { setError } from "redux/error/actions";
import { setAuthorized } from "redux/authentication/actions";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Gutter from "components/common/Gutter";
import { Link } from "react-router-dom";
import { closeModal } from "redux/modal/actions";

const Login: FC = () => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);
  const handlePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);
  const handleLogin = async () => {
    setLoading(true);
    const data = await loginUser(email, password);
    if (data.user) {
      dispatch(setAuthorized(data.user.token, data.user.username));
      dispatch(closeModal());
    } else {
      dispatch(setError(true, data));
    }
  };
  return (
    <Gutter
      justify="center"
      alignItems="center"
      component={ValidatorForm}
      componentProps={{ onSubmit: handleLogin, autoComplete: "off" }}
      maxWidth="sm"
    >
      <Grid item xs={12}>
        <Typography align="center" variant="h4">
          Sign in
        </Typography>
      </Grid>
      <MuiLink
        underline="always"
        variant="body2"
        color="inherit"
        component={Link}
        to={{
          pathname: "/register",
          state: { open: true },
        }}
      >
        Need an account?
      </MuiLink>
      <Grid item xs={12}>
        <TextValidator
          value={email}
          label="Email"
          type="email"
          name="email"
          variant="outlined"
          onChange={handleEmail}
          fullWidth
          validators={["required", "isEmail"]}
          errorMessages={["this field is required", "email is not valid"]}
        />
      </Grid>
      <Grid item xs={12}>
        <TextValidator
          value={password}
          label="Password"
          type="password"
          name="password"
          variant="outlined"
          onChange={handlePassword}
          fullWidth
          validators={["required"]}
          errorMessages={["this field is required"]}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
        >
          Login
        </Button>
      </Grid>
    </Gutter>
  );
};

export default Login;
