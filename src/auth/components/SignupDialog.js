import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import MuiDialog from "@material-ui/core/Dialog";
import SignupForm from "./SignupForm";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useHistory } from "react-router-dom";

import RootContext from "../../rootContext/context";

const Dialog = withStyles((theme) => ({
  paperWidthXs: {
    maxWidth: "345px",
  },
}))(MuiDialog);

const SignupDialog = (props) => {
  const { classes, showButton = true } = props;
  const hystory = useHistory();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    openSignupDialog,
    setOpenSignupDialog,
    setOpenSigninDialog,
    handleExternalSubmit,
    externalSignin,
    signupError,
    signup,
  } = useContext(RootContext).auth;

  const handleClickOpen = () => {
    setOpenSignupDialog(true);
  };
  const handleClose = () => {
    setOpenSignupDialog(false);
  };

  const forwardToSignin = () => {
    handleClose();
    setOpenSigninDialog(true);
  };

  const nextStep = () => {
    let nextPath = "/";
    if (
      hystory.location.pathname === "/signin" &&
      hystory.location.state.from.pathname !== undefined
    ) {
      nextPath = hystory.location.state.from.pathname;
    }
    hystory.push(nextPath);
  };

  return (
    <div>
      {showButton && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          className={classes.button}
        >
          S'inscrire
        </Button>
      )}
      <Dialog
        maxWidth="xs"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openSignupDialog}
        fullScreen={fullScreen}
      >
        <SignupForm
          forwardToSignin={forwardToSignin}
          openInDialog={true}
          closeDialog={handleClose}
          nextStep={nextStep}
          signupError={signupError}
          signup={signup}
          handleExternalSubmit={handleExternalSubmit}
          externalSignin={externalSignin}
        />
      </Dialog>
    </div>
  );
};

export default SignupDialog;
