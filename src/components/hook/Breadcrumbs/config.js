import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LocalMallIcon from "@material-ui/icons/LocalMall";

import {
  CART_LINK,
  SHIPPING_LINK,
  COMMANDE_SHIPPING_LINK,
  COMMANDE_LINK,
  PAYMENT_LINK,
  COMMANDE_PAYMENT_LINK,
} from "../src/routerLinks";

const RouteBreadCrumbs=( routes )=>{


}



const getBreadcrumbsRoute = async (routes = []) => {
  const configs = await getAllConfig(routes);
  return configs;
};

const getAllConfig = async (routes) => {
  const all = [];
  for (let i = 0; i < routes.length; i++) {
    const rout = routes[i];
    const config = routesConfig.find((item) => item.href === rout);
    if (config) all.push(config);
  }

  return all;
};

const routesConfig = [
  {
    name: "Acceuil",
    icon: (props) => <HomeIcon {...props} />,
    href: "/",
  },
  {
    name: "Panier",
    icon: (props) => <ShoppingBasket {...props} />,
    href: CART_LINK,
    id: CART_LINK,
  },
  {
    name: "A commander",
    icon: (props) => <LocalMallIcon {...props} />,
    href: COMMANDE_LINK,
  },
  {
    name: "Livraison",
    icon: (props) => <LocalShippingIcon {...props} />,
    href: SHIPPING_LINK,
  },
  {
    name: "Livraison",
    icon: (props) => <LocalShippingIcon {...props} />,
    href: COMMANDE_SHIPPING_LINK,
  },
  {
    name: "Paiement",
    icon: (props) => <> </>,
    href: PAYMENT_LINK,
  },
  {
    name: "Paiement commande",
    icon: (props) => <></>,
    href: COMMANDE_PAYMENT_LINK,
  },
];

export {
  getBreadcrumbsRoute,
};
