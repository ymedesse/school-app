import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import { TitleTypography } from "../../../components/Typography";
const useStyles = makeStyles(theme => ({
  appBar: {
    padding: theme.spacing(2),
    top: 0,
    bottom: "auto",
    marginBottom: theme.spacing(1)
  },

  subTotalRow: {
    display: "flex",
    alignItems: "baseline",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  montant: {
    textAlign: "right",
    flexGrow: "1",
    fontWeight: "500"
  }
}));

const Header = ({ count }) => {
  const classes = useStyles();

  return (
    <AppBar
      color="inherit"
      position="sticky"
      variant="outlined"
      className={classes.appBar}
    >
      <TitleTypography>
        {count > 0 ? ` Votre panier contient ${count} article(s)` : "Panier"}
      </TitleTypography>
    </AppBar>
  );
};

export default Header;
