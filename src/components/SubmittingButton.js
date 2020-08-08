import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
    width: "100%",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function SubmittingButton({
  handleClick,
  loading,
  disabled = loading,
  success,
  label = "Enegistrer",
  ...restProps
}) {
  const classes = useStyles();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={disabled}
          onClick={handleClick}
          {...restProps}
        >
          {label}
        </Button>
        {loading && (
          <CircularProgress size={30} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
}
