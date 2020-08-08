import React, { useContext } from "react";
import SignupForm from "./components/SignupForm";
import { useHistory, useLocation, Redirect } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import context from "../rootContext/context";

const Signup = () => {
  const classes = useStyles();
  let location = useLocation();
  let history = useHistory();
  const { signup, signupError, isAuthenticated, externalSignin } = useContext(
    context
  ).auth;

  const nextStep = () => {
    location.state !== undefined
      ? history.push(location.state.from.pathname)
      : history.push("/");
  };

  const authenticated = isAuthenticated() && (
    <Redirect to={{ pathname: "/" }} />
  );

  const forwardToSignin = () => {
    let pathFrom = "/";
    if (location.state !== undefined) {
      pathFrom = location.state.from.pathname;
    }

    history.push("/signin", { from: { "pathname": pathFrom } });
  };

  return (
    <>
      {authenticated}
      <Paper className={classes.paper}>
        <SignupForm
          nextStep={nextStep}
          forwardToSignin={forwardToSignin}
          signup={signup}
          signupError={signupError}
          externalSignin={externalSignin}
        />
      </Paper>
    </>
  );
};

export default Signup;

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: "345px",
    margin: "auto",
    padding: theme.spacing(1, 2),
  },
}));
