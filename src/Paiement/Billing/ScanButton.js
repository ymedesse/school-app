import React from "react";
import Button from "@material-ui/core/Button";
import CropFreeIcon from "@material-ui/icons/CropFree";
import { makeStyles } from "@material-ui/core/styles";

const ScanButton = ({ label, fullWidth = false, ...props }) => {
  const classes = useStyles();

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        size="large"
        type="submit"
        fullWidth={fullWidth}
        className={classes.buttonValidation}
        startIcon={<CropFreeIcon />}
        {...props}
      >
        {label}
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
