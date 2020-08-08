import React from "react";
import rootContext from "../rootContext/context";

import * as routeLink from "../routerLinks";
import { Link as RouterLink } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";

const DashboardIntro = () => {
  const { isAuthenticatedUser, logout } = React.useContext(rootContext).auth;
  const user = isAuthenticatedUser.user;

  return (
    <>
      <Typography variant="subtitle1">
        Bonjour <strong> {user.lastName} </strong> (vous n'êtes pas{" "}
        <strong> {user.lastName} </strong> ?{" "}
        <Link onClick={logout} variant="subtitle1" component="button">
          <strong>Déconnexion</strong>
        </Link>
        )
      </Typography>
      <br />
      <Typography>
        A partir du tableau de bord de votre compte, vous pouvez visualiser vos{" "}
        <Link
          variant="subtitle1"
          component={RouterLink}
          to={routeLink.ORDERS_LINK}
        >
          commandes récentes
        </Link>
        , gérer vos{" "}
        <Link
          variant="subtitle1"
          component={RouterLink}
          to={routeLink.ADRESSES_LINK}
        >
          adresses de livraison et de facturaction
        </Link>{" "}
        ainsi que{" "}
        <Link
          //  onClick={() => handleClickMenu(routeLink.SLUG_COMPTE)}
          variant="subtitle1"
          component={RouterLink}
          to={routeLink.COMPTE_LINK}
        >
          changer votre mot de passe et les détails de votre compte
        </Link>
        .
      </Typography>
    </>
  );
};

export default DashboardIntro;
