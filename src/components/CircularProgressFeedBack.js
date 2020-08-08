import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2)
    },
    height: "250px"
  }
}));

export default function CircularIndeterminate({ ...rootProps }) {
  const classes = useStyles();

  return (
    <div className={classes.root} {...rootProps}>
      <CircularProgress style={{ margin: "auto" }} />
    </div>
  );
}
