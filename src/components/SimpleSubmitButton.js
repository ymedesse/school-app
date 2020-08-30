import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const ScanButton = ({
  children,
  label,
  icon,
  end = false,
  fullWidth = false,
  type = "submit",
  ...props
}) => {
  const classes = useStyles();

  const iconProps = !icon
    ? {}
    : end
    ? {
        endIcon: icon,
      }
    : {
        startIcon: icon,
      };

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        size="large"
        type={type}
        fullWidth={fullWidth}
        className={classes.buttonValidation}
        {...iconProps}
        {...props}
      >
        {label || children}
      </Button>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  buttonValidation: {
    borderRadius: "0px",
    textTransform: "unset",
    lineHeight: "1",
  },
}));

export default React.memo(ScanButton);
