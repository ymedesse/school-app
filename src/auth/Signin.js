import React, { useContext } from "react";
import SigninForm from "./components/SigninForm";
import context from "../rootContext/context";

import { useHistory, useLocation, Redirect } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: "345px",
    margin: "auto",
    padding: theme.spacing(1, 2),
  },
}));

const Signin = () => {
  const classes = useStyles();
  let location = useLocation();
  let history = useHistory();

  const { signin, signinError, isAuthenticated, externalSignin } = useContext(
    context
  ).auth;

  const nextStep = (async) => {
    location.state !== undefined
      ? history.push(location.state.from.pathname)
      : history.push("/");
  };

  const forwardToSignup = () => {
    let pathFrom = "/";
    if (location.state !== undefined) {
      pathFrom = location.state.from.pathname;
    }

    history.push("/signup", { from: { "pathname": pathFrom } });
  };

  const authenticated = isAuthenticated() && (
    <Redirect to={{ pathname: "/" }} />
  );
  return (
    <>
      {authenticated}
      <Paper className={classes.paper}>
        <SigninForm
          externalSignin={externalSignin}
          nextStep={nextStep}
          forwardToSignup={forwardToSignup}
          signin={signin}
          signinError={signinError}
        />
      </Paper>
    </>
  );
};

export default Signin;
