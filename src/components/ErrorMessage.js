import React from "react";
import { LargeTypography } from "./Typography";

import { makeStyles } from "@material-ui/core/styles";

const ErrorMessage = ({ url, setCurrentSearch, schoolId, ...restProps }) => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <LargeTypography color="secondary"> Oups !!</LargeTypography>{" "}
      <LargeTypography>Une erreur s'est produite. </LargeTypography>
    </div>
  );
};

export default ErrorMessage;

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
  },
}));
