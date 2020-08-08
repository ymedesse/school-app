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
} from "./routerLinks";
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const CART_BREADCRUMBS_TYPE = "panier";
const COMMANDE_BREADCRUMBS_TYPE = "commande";
const CHECKOUT_BREADCRUMBS_TYPE = "checkout";
const CMD_CHECKOUT_BREADCRUMBS_TYPE = "commande_checkout";
const SHIPPING_BREADCRUMBS_TYPE = "cart_shipping";
const CMD_SHIPPING_BREADCRUMBS_TYPE = "commande_shipping";

const HOME_BREADCRUMBS_TYPE = "home";

const getBreadcrumbsRoute = (type) => {
  let routes = [];

  const getValidLink = (values = []) => {
    let val = [];
    const lastIndex = values.findIndex((item) => item.id === type);
    if (lastIndex !== -1) {
      val = values.slice(0, lastIndex + 1);
    }
    return val;
  };

  const existOne = (arrays = []) => {
    return arrays.indexOf(type) !== -1;
  };

  if (
    existOne([
      CART_BREADCRUMBS_TYPE,
      CHECKOUT_BREADCRUMBS_TYPE,
      CMD_CHECKOUT_BREADCRUMBS_TYPE,
      SHIPPING_BREADCRUMBS_TYPE,
      COMMANDE_BREADCRUMBS_TYPE,
      CMD_SHIPPING_BREADCRUMBS_TYPE,
    ])
  ) {
    routes = [
      {
        name: "Acceuil",
        icon: (props) => <HomeIcon {...props} />,
        href: "/",
        id: HOME_BREADCRUMBS_TYPE,
        always: true,
      },
      {
        name: "Panier",
        icon: (props) => <ShoppingBasket {...props} />,
        href: CART_LINK,
        id: CART_BREADCRUMBS_TYPE,
        always: existOne([
          CHECKOUT_BREADCRUMBS_TYPE,
          SHIPPING_BREADCRUMBS_TYPE,
        ]),
      },
      {
        name: "A commander",
        icon: (props) => <LocalMallIcon {...props} />,
        href: COMMANDE_LINK,
        id: COMMANDE_BREADCRUMBS_TYPE,
        always: existOne([
          CMD_CHECKOUT_BREADCRUMBS_TYPE,
          CMD_SHIPPING_BREADCRUMBS_TYPE,
        ]),
      },
      {
        name: "Livraison",
        icon: (props) => <LocalShippingIcon {...props} />,
        href: SHIPPING_LINK,
        id: SHIPPING_BREADCRUMBS_TYPE,
        always: existOne([CHECKOUT_BREADCRUMBS_TYPE]),
      },
      {
        name: "Livraison",
        icon: (props) => <LocalShippingIcon {...props} />,
        href: COMMANDE_SHIPPING_LINK,
        id: CMD_SHIPPING_BREADCRUMBS_TYPE,
        always: existOne([CMD_CHECKOUT_BREADCRUMBS_TYPE]),
      },
      {
        name: "Paiement",
        icon: (props) => <div />,
        href: PAYMENT_LINK,
        id: CHECKOUT_BREADCRUMBS_TYPE,
        always: false,
      },
      {
        name: "Paiement commande",
        icon: (props) => <></>,
        href: COMMANDE_PAYMENT_LINK,
        id: CMD_CHECKOUT_BREADCRUMBS_TYPE,
        always: false,
      },
    ];
  }
  const val = getValidLink(routes, type);

  return val;
};
export {
  CART_BREADCRUMBS_TYPE,
  CHECKOUT_BREADCRUMBS_TYPE,
  CMD_CHECKOUT_BREADCRUMBS_TYPE,
  HOME_BREADCRUMBS_TYPE,
  SHIPPING_BREADCRUMBS_TYPE,
  COMMANDE_BREADCRUMBS_TYPE,
  CMD_SHIPPING_BREADCRUMBS_TYPE,
  getBreadcrumbsRoute,
};

export const API = process.env.REACT_APP_API_URL;
export const WOOCOMMERCE_URL_LIVE = "https://www.librairielbu.com";
export const ADMIN_PRODUCT_IMAGE_SIZE = "150px";
export const ADMIN_PRODUCT_MOBILE_IMAGE_SIZE = "80px";
export const ADMIN_PRODUCT_VARIANT_IMAGE_SIZE = "80px";
export const ADMIN_PRODUCT_VARIANT_MOBILE_IMAGE_SIZE = "80px";
export const CATALOG_LOAD_LIMIT = 5;

export const WOOCOMMERCE_URL = "https://oph.f19.myftpupload.com";
export const WOOCOMMERCE_KEY = "ck_a0b788e42b32f777fa86859fa9fbe95dd0bac179";
export const WOOCOMMERCE_SECRET = "cs_0aa8f8c8fd00d72df43eabbf1408425780b9d5f9";
export const defaultImage = "https://picsum.photos/200";
export const wooApi = (
  url = WOOCOMMERCE_URL,
  consumerKey = WOOCOMMERCE_KEY,
  consumerSecret = WOOCOMMERCE_SECRET
) =>
  new WooCommerceRestApi({
    url,
    consumerKey,
    consumerSecret,
    version: "wc/v3",
    queryStringAuth: true,
  });
