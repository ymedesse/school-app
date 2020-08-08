import React, { useEffect } from "react";
import { useState } from "reinspect";

import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  CssBaseline,
  Typography,
} from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import MailIcon from "@material-ui/icons/Mail";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import LockIcon from "@material-ui/icons/Lock";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    textAlign: "center",
  },
  button: {
    margin: theme.spacing(1),
    minWidth: "150px",
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
}));

const SignupForm = ({
  openInDialog,
  signup,
  signupError,
  setError,
  externalSignin,
  ...props
}) => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const dataInit = {
    lastName: "",
    email: "",
    password: "",
    phone: "",
    error: signupError,
    success: false,
  };

  const [values, setValues] = useState({
    ...dataInit,

    success: false,
  });

  useEffect(() => {
    setValues({ ...values, error: signupError, success: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signupError]);

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      success: false,
      [name]: event.target.value,
    });
  };

  const { lastName, email, password, phone, error } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, success: false });
    const user = {
      lastName,
      email,
      password,
      phone,
    };

    signup(user, (data) => {
      if (data) {
        const { error } = data;
        error && setValues({ ...values, error: error, loading: false });
        if (!error) {
          openInDialog && props.closeDialog();
          props.nextStep && props.nextStep();
        }
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const SignupForm = (
    <form className={classes.container} noValidate autoComplete="on">
      <TextField
        placeholder="Prénom et noms"
        margin="dense"
        name="lastName"
        className={classes.textField}
        fullWidth
        value={values.lastName}
        onChange={handleChange("lastName")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircleIcon />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        placeholder="email"
        margin="dense"
        fullWidth
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
        placeholder="Téléphone"
        margin="dense"
        fullWidth
        name="phone"
        value={values.phone}
        className={classes.textField}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhoneAndroidIcon />
            </InputAdornment>
          ),
        }}
        onChange={handleChange("phone")}
      />
      <TextField
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

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        className={classes.submit}
        onClick={clickSubmit}
      >
        S'inscrie
      </Button>
    </form>
  );

  const forwardToSignin = () => {
    props.forwardToSignin();
  };

  return (
    <>
      <CssBaseline />
      <DialogTitle
        id="customized-dialog-title"
        onClose={openInDialog && props.closeDialog}
      >
        Inscription
      </DialogTitle>

      <DialogContent dividers>
        {showError()}

        {SignupForm}
      </DialogContent>

      <DialogActions>
        <Typography variant="body2" style={{ textAlign: "center" }}>
          Vous avez déja un compte?{" "}
          <Link
            onClick={forwardToSignin}
            component="button"
            variant="subtitle2"
          >
            Se connecter
          </Link>
        </Typography>
      </DialogActions>
    </>
  );
};

export default SignupForm;

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6" style={{ textAlign: "center" }}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    justifyContent: "center",
  },
}))(MuiDialogActions);
