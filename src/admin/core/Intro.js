import React from "react";
import * as routeLink from "../../routerLinks";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import useLogOut from "../../auth/hooks/useLogOut";

import { Typography, Paper } from "@material-ui/core";
import Link from "@material-ui/core/Link";

export default ({
  setCurrentViewTitle,
  isAuthenticatedUser,
  ...props
}) => {
  const history = useHistory();
  const classes = useStyles();
  const signout= useLogOut()
  const { user } = isAuthenticatedUser || { user: {} };

  const handleClickMenu = (menuLink) => {
    history.push(menuLink);
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="subtitle1">
        Bonjour <strong> {user.lastName} </strong> (vous n'êtes pas{" "}
        <strong> {user.lastName} </strong> ?{" "}
        <Link
          onClick={signout}
          variant="subtitle1"
          component="button"
        >
          <strong>Déconnexion</strong>
        </Link>
        )
      </Typography>
      <br />

      <Typography>
        Vous êtes sur la plateforme d'administration de site woocommerce.
        <br />A partir de ce tableau de bord, vous pouvez{" "}
        <Link
          className={classes.link}
          to={routeLink.ADMIN_IMPORT_LINK}
          onClick={() => handleClickMenu(routeLink.ADMIN_IMPORT_LINK)}
          variant="subtitle1"
          component="button"
        >
          {" "}
          importer
        </Link>{" "}
        vos produits et catégories depuis votre site woocommerce, visualiser la{" "}
        <Link
          className={classes.link}
          onClick={() => handleClickMenu(routeLink.ADMIN_PRODUCTS_LINK)}
          variant="subtitle1"
          component="button"
        >
          listes des produits
        </Link>
        , gérer les{" "}
        <Link
          className={classes.link}
          onClick={() =>
            handleClickMenu(routeLink.ADMIN_PRODUCTS_CATEGORIES_LINK)
          }
          variant="subtitle1"
          component="button"
        >
          catégories
        </Link>{" "}
      </Typography>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "300px",
    padding: theme.spacing(2, 4),
  },
  root: {
    // backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  link: {
    paddingBottom: "2px",
  },
}));
