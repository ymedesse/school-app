import React from "react";
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Link from "@material-ui/core/Link";

import { CART_LINK, COMMANDE_LINK } from "../../../routerLinks";

const useStyles = makeStyles((theme) => ({
  appBar: {
    padding: theme.spacing(2),
    top: "auto",
    bottom: 0,
  },
  subTotalRow: {
    display: "flex",
    alignItems: "baseline",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  montant: {
    textAlign: "right",
    flexGrow: "1",
    fontWeight: "500",
  },
  buttonValidation: {
    borderRadius: "0px",
  },
}));

export default function Footer({ amount, handleClose, count, file = "cart" }) {
  const classes = useStyles();
  const history = useHistory();
  const url = file === "commande" ? COMMANDE_LINK : CART_LINK;

  const submitText =
    file === "cart" ? " Voir mon panier" : "Voir ma liste à commander";
  return (
    <AppBar color="default" position="sticky" className={classes.appBar}>
      {count > 0 ? (
        <div className={classes.subTotalRow}>
          <Typography
            variant="subtitle1"
            style={{ textAlign: "center", fontWeight: "500" }}
          >
            SOUS-TOTAL
          </Typography>

          <Typography className={classes.montant} variant="subtitle1">
            {amount} Fcfa
          </Typography>
        </div>
      ) : (
        <Link
          component={RouterLink}
          variant="h6"
          style={{ textAlign: "center", fontWeight: "400", paddingBottom: 8 }}
          to="/"
          gutterBottom
        >
          {file === "cart"
            ? "Remplissez le avec vos manuels scolaire"
            : "Commander vos manuels scolaires"}
        </Link>
      )}

      <Button
        color="primary"
        variant="contained"
        fullWidth={true}
        size="large"
        onClick={() => {
          handleClose();
          history.push(count > 0 ? url : "/");
        }}
        className={classes.buttonValidation}
      >
        {count > 0 ? submitText : "Continuer votre achat"}
      </Button>
    </AppBar>
  );
}
