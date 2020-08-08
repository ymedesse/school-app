import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import { amber, green } from "@material-ui/core/colors";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
// import Slide from "@material-ui/core/Slide";

/**
 *
 * @param {String} notificationType  -  Type de la notification ['error','success']
 * @param {String} message  -  Le contenu du message à afficher, si vide auccun message n'est affiché
 * @param {function} nextClose  -  fonction a xécuter à la fermerture de la notification
 *
 */
const Notifier = ({ notificationType, message, nextClose }) => {
  const [open, setOpen] = React.useState(false);
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

  return (
    <Snackbar
      // TransitionComponent="SlideTransition"
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      // TransitionComponent={TransitionUp}
    >
      <MySnackbarContentWrapper
        onClose={handleClose}
        variant={notificationType}
        message={!message ? "" : message}
      />
    </Snackbar>
  );
};

export default Notifier;

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles((theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["error", "info", "success", "warning"]).isRequired,
};

// function TransitionUp(props) {
//   return <Slide {...props} direction="up" />;
// }
// function SlideTransition(props) {
//   return <Slide {...props} direction="up" />;
// }
