import React, { useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles, withStyles } from "@material-ui/styles";
import MuiAlert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

  const Alert = withStyles((theme) => ({
    message: {
      [theme.breakpoints.down("sm")]: {
        padding: "0",
      },
    },

    action: {
      [theme.breakpoints.down("sm")]: {
        paddingLeft: "0px",
      },
    },
  }))(({ ...props }) => <MuiAlert elevation={6} variant="filled" {...props} />);

/**
 *
 * @param {String} notificationType  -  Type de la notification ['error','success']
 * @param {String} message  -  Le contenu du message à afficher, si vide auccun message n'est affiché
 * @param {function} nextClose  -  fonction a xécuter à la fermerture de la notification
 *
 */
const Notifier = ({ notificationType, message, nextClose, title, action }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  useEffect(() => {
    setOpen(message ? true : false);
  }, [message]);

  const handleClose = (event, reason) => {
    nextClose && nextClose();
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const myAction = action ? (
    <>
      {" "}
      {action(handleClose)}
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={() => {
          setOpen(false);
        }}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    </>
  ) : undefined;

  return (
    <Snackbar
      // TransitionComponent="SlideTransition"
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Alert
        action={myAction}
        onClose={handleClose}
        severity={notificationType}
      >
        {title && <AlertTitle className={classes.title}>{title}</AlertTitle>}
        {message && message}
      </Alert>
    </Snackbar>
  );
};

export default Notifier;

const useStyles = makeStyles((theme) => ({
  title: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0px",
    },
  },
}));

export { Alert };
