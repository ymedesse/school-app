import React from "react";
import { useGoogleLogin } from "react-google-login";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import googleSvg from "../../assets/google.svg";
// refresh token
// import { refreshTokenSetup } from "../utils/refreshToken";

const clientId =
  "293291852258-5gqc781popuraabh8q797q533qvc62tk.apps.googleuserco59ntent.com";

const GoogleLoginButton = ({ handleExternalSubmit }) => {
  const classes = useStyles();

  const onSuccess = async (res) => {
    await handleExternalSubmit(res.profileObj);
  };

  const onFailure = (res) => {};

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    cookiePolicy: "h",
    // accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <Button
      onClick={signIn}
      variant="outlined"
      fullWidth
      className={classes.button}
    >
      <img
        style={{
          height: "30px",
          marginRight: "4px",
        }}
        src={googleSvg}
        alt="google login"
        className="icon"
      ></img>
      Se connecter avec Google
    </Button>
  );
};

export default GoogleLoginButton;

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
  },
}));
