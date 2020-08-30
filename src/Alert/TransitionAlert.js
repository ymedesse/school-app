import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";
import AlertTitle from "@material-ui/lab/AlertTitle";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  title: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0px",
    },
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function TransitionAlerts({
  open,
  setOpen,
  title,
  children,
  severity = "success",
  onClose,
  ...props
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
                onClose && onClose();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity={severity}
          {...props}
        >
          {title && <AlertTitle className={classes.title}>{title}</AlertTitle>}

          {children}
        </Alert>
      </Collapse>
    </div>
  );
}

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
}))(({ ...props }) => <MuiAlert elevation={6} {...props} />);
