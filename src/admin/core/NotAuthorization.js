import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import useLogOut from "../../auth/hooks/useLogOut";
import context from "../context/AdminContext";

import { Typography, Paper } from "@material-ui/core";
import Link from "@material-ui/core/Link";

export default ({ setCurrentViewTitle, ...props }) => {
  const history = useHistory();
  const signout = useLogOut();
  const classes = useStyles();
  const { isAuthenticatedUser } = useContext(context).auth;

  !isAuthenticatedUser && history.push("/");
  return (
    isAuthenticatedUser && (
      <Paper className={classes.paper}>
        <Typography variant="subtitle1">
          Désolé ! Vous ne pouvez pas accéder à la page demandée.
          <br />
          <Link onClick={signout} variant="subtitle1" component="button">
            <strong>Déconnexion</strong>
          </Link>
        </Typography>
      </Paper>
    )
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    // height: "100%",
    padding: theme.spacing(2, 4),
  },
}));
