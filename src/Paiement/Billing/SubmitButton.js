import React from "react";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const SubmitButton = ({
  submitLabel,
  handleSubmit,
  fullWidth = false,
  endStep = false,
}) => {
  const classes = useStyles();

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={handleSubmit && handleSubmit}
        size="large"
        type="submit"
        fullWidth={fullWidth}
        className={classes.buttonValidation}
        {...{ endIcon: !endStep && <NavigateNextIcon /> }}
      >
        {submitLabel}
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

export default React.memo(SubmitButton);
