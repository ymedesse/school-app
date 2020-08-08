import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";

export default ({ setCurrentViewTitle, ...props }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography variant="h3">
        OUPS ! La page que vous demandez n'est pas disponible.
        <br />
      </Typography>
    </Paper>
  );
};

const useStyles = makeStyles(theme => ({
  paper: {
    height: "300px",
    padding: theme.spacing(2, 4)
  }
}));
