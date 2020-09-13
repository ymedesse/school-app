import React, { useEffect } from "react";
import { useState } from "reinspect";
// import FedBackdrop from "../../components/FedBackdrop";
import LinearProgress from "@material-ui/core/LinearProgress";

import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  Grid,
  Link,
} from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";
import MailIcon from "@material-ui/icons/Mail";
import LockIcon from "@material-ui/icons/Lock";
// import Icon from "@material-ui/core/Icon";
import CustomDialog from "../../components/Dialog";
import GoogleLoginButton from "./GoogleLoginButton";

const SigninForm = ({
  openInDialog,
  closeDialog,
  nextStep,
  signin,
  signinError,
  externalSignin,
  ...props
}) => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const dataInit = {
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  };
  const [values, setValues] = useState({
    ...dataInit,
    loading: false,
  });

  useEffect(() => {
    setValues({ ...values, error: signinError, loading: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signinError]);

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      loading: false,
      [name]: event.target.value,
    });
  };

  const { email, password, error, loading } = values;

  const clickSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    const user = { email, password };

    await signin(user, (data) => {
      const { error } = data;
      error && setValues({ ...values, error: error, loading: false });
      if (!error) {
        openInDialog && closeDialog();
        nextStep && nextStep();
      }
    });
  };

  const handleExternalSubmit = async (value) => {
    setValues({ ...values, error: false, loading: true });

    await externalSignin(value, (data) => {
      const { error } = data;
      error && setValues({ ...values, error: error, loading: false });
      if (!error) {
        openInDialog && closeDialog();
        nextStep && nextStep();
      }
    });
  };

  const showError = () => {
    return error ? (
      <Typography variant="subtitle2" color="secondary">
        {error}
      </Typography>
    ) : (
      <div />
    );
  };

  const showLoading = () => loading && <LinearProgress />;
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const signinForm = (
    <form
      className={classes.container}
      onSubmit={clickSubmit}
      autoComplete="on"
    >
      <Grid
        container
        spacing={2}
        direction="column"
        justify="center"
        alignItems="center"
      >
        {/* <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.fbkButton}
        >
          <Icon className={classes.fbk} />
          Continuer avec Facebook
        </Button> */}

        <GoogleLoginButton handleExternalSubmit={handleExternalSubmit} />

        <Typography
          style={{ marginTop: "10px", textAlign: "center" }}
          variant="subtitle2"
        >
          Connectez-vous avec votre adresse mail
        </Typography>

        {showLoading()}

        {showError()}

        <TextField
          variant="outlined"
          placeholder="email"
          margin="dense"
          fullWidth
          required
          className={classes.textField}
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange("email")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          variant="outlined"
          placeholder="Mot de passe"
          margin="dense"
          fullWidth
          name="password"
          value={values.password}
          className={classes.textField}
          onChange={handleChange("password")}
          type={showPassword ? "text" : "password"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Link href="#" variant="caption">
          Mot de passe oublié?
        </Link>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className={classes.submit}
          onClick={clickSubmit}
          fullWidth
        >
          Se connecter
        </Button>
      </Grid>
    </form>
  );

  const forwardToSignup = () => {
    props.forwardToSignup && props.forwardToSignup();
  };

  return (
    <>
      <CustomDialog
        title={"Connexion"}
        content={signinForm}
        actions={
          <Typography variant="body2" style={{ textAlign: "center" }}>
            Vous n'avez pas encore un compte?{" "}
            <Link
              onClick={forwardToSignup}
              component="button"
              variant="subtitle2"
            >
              Nouveau compte
            </Link>
          </Typography>
        }
        closeDialog={props.closeDialog}
      />
    </>
  );
};

export default SigninForm;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    textAlign: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  button: {
    marginTop: theme.spacing(1),
  },
  textField: {
    margin: theme.spacing(1, 0),
  },
  paper: {
    maxWidth: "500px",
    margin: "auto",
    padding: theme.spacing(5, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fbk: {
    backgroundImage:
      "url(https://img.icons8.com/material/24/ffffff/facebook-f.png)",
  },
  fbkButton: {
    backgroundColor: "#164675",
    marginTop: theme.spacing(1),
  },
}));
