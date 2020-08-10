// import React from "react";
// import Badge from "@material-ui/core/Badge";

import * as routeLink from "../../routerLinks";
const UserMenu = () => {
  const list = [
    {
      name: "Tableau de bord",
      link: routeLink.DASHBOARD_LINK,
    },
    {
      name: "Détails du compte",
      link: routeLink.COMPTE_LINK,
    },
    { name: "Historique des commandes", link: routeLink.ORDERS_LINK },
    { divider: true },
    // { name: "Notifications", link: routeLink.NOTIFICATIONS_LINK },
    { name: "Panier", link: routeLink.CART_LINK },
    { name: "Liste à commander", link: routeLink.CART_LINK },
    // { name: "Liste de souhaits", link: routeLink.PANIER_LINK },
    // { name: "Besoin d'aide", link: routeLink.ORDERS_LINK },
    // { name: "Partenaire à LBU", link: routeLink.PARTENAIRE_DASHBOARD_LINK },
  ];

  return list;
};

export default UserMenu;

// const CountBadge = ({ count }) => {
//     return (
//       <Badge
//         badgeContent={count}
//         style={{ marginLeft: "20px" }}
//         color="secondary"
//       />
//     );
//   };
