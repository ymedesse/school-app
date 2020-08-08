import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import { CART_LINK } from "../routerLinks";

export const getBreadcrumbsRoute = () => {
  const routes = [
    {
      name: "Acceuil",
      icon: (props) => <HomeIcon {...props} />,
      href: "/",
    },
    {
      name: "Panier",
      icon: (props) => <ShoppingBasket {...props} />,
      href: CART_LINK,
    },
  ];
  return routes;
};
