import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2)
    },
    minHeight: props => props.height
  }
}));

export default ({ height = "500px" }) => {
  const classes = useStyles({ height });

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};
