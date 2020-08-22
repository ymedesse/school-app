import React from "react";

import ProductDashBoard from "../Product";
import * as productAccess from "../Product/container/accesses";

import OrderDashboard from "../order";
import * as orderAccess from "../order/container/accesses";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import CropFreeIcon from "@material-ui/icons/CropFree";
import QrCodePayment from "../order/payments";

import Manager from "../manager";
import Action from "../manager/Action";
import DesktopAccessDisabledIcon from "@material-ui/icons/DesktopAccessDisabled";

import School from "../school";
import * as schoolAccess from "../school/containers/accesses";
import SchoolIcon from "@material-ui/icons/School";

import Classe from "../classe";
import * as classeAccess from "../classe/containers/accesses";
import ClassIcon from "@material-ui/icons/Class";

import City from "../city";
import * as cityAccess from "../city/containers/accesses";
import LocationCityIcon from "@material-ui/icons/LocationCity";

import Privilege from "../manager/Privilege";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

import Compte from "../../user";

import * as routeLink from "../../routerLinks";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Intro from "./Intro";
import DnsIcon from "@material-ui/icons/Dns";

import FaceIcon from "@material-ui/icons/Face";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

export const generalItems = [
  {
    id: "dashboard",
    path: routeLink.ADMIN_DASHBOARD_LINK,
    itemIcon: <DashboardIcon />,
    action: <></>,
    content: (props) => <Intro {...props} />,
    title: "ADMIN DASHBOARD",
    isAllowed: () => true,
  },
  {
    id: "produits",
    title: "Produits",
    path: routeLink.ADMIN_PRODUCTS_LINK,
    itemIcon: <DnsIcon />,
    content: (props) => <ProductDashBoard {...props} />,
    action: <></>,
    access: productAccess.PRODUCT_MENU,
    isAllowed: (user) => checkPermission(user, productAccess.PRODUCT_MENU),
  },
  {
    id: "order",
    title: "Commande n°",
    path: routeLink.ADMIN_ORDER_LINK,
    itemIcon: <BookmarkBorderIcon />,
    content: (props) => <OrderDashboard {...props} />,
    action: <></>,
    access: orderAccess.ORDER_MENU,
    isAllowed: (user) => checkPermission(user, orderAccess.ORDER_MENU),
    child: [
      {
        id: "qrCodepayment",
        title: "Paiement par qrcodes ",
        path: routeLink.ADMIN_ORDER_PAYMENT_QRCODE_LINK,
        itemIcon: <CropFreeIcon />,
        content: (props) => <QrCodePayment {...props} />,
        action: <></>,
        access: orderAccess.ACTION_DO_PAYMENT_BY_QRCODE,
        isAllowed: (user) =>
          checkPermission(user, orderAccess.ACTION_DO_PAYMENT_BY_QRCODE),
      },
    ],
  },
  {
    id: "school",
    title: "Ecoles",
    path: routeLink.ADMIN_SCHOOL_LIST_LINK,
    itemIcon: <SchoolIcon />,
    content: (props) => <School {...props} />,
    isAllowed: (user) => checkPermission(user, schoolAccess.SCHOOL),
  },
  {
    id: "classe",
    title: "Classes",
    path: routeLink.ADMIN_CLASSE_LIST_LINK,
    itemIcon: <ClassIcon />,
    content: (props) => <Classe {...props} />,
    isAllowed: (user) => checkPermission(user, classeAccess.CLASSE),
  },
  {
    id: "compte",
    title: "Mon compte",
    path: routeLink.ADMIN_COMPTE_LINK,
    itemIcon: <FaceIcon />,
    content: (props) => <Compte {...props} />,
    isAllowed: () => true,
  },
  {
    id: "manager",
    title: "Gestion des utilisateurs",
    path: routeLink.ADMIN_MANAGE_USER_LINK,
    itemIcon: <AssignmentIndIcon />,
    content: (props) => <Manager {...props} />,
    action: <></>,
    isAllowed: (user) => isSupUser(user),
    child: [
      {
        id: "manager-sub",
        title: "Utilisateurs",
        path: routeLink.ADMIN_MANAGE_USER_LINK,
        itemIcon: <PeopleAltIcon />,
        content: (props) => <Manager {...props} />,
        action: <></>,
        isAllowed: (user) => isSupUser(user),
      },
      {
        id: "manager-actions",
        title: "Actions",
        itemIcon: <DesktopAccessDisabledIcon />,
        content: (props) => <Action {...props} />,
        path: routeLink.ADMIN_MANAGE_ACTION_LINK,
        isAllowed: (user) => isSupUser(user),
      },
      {
        id: "privilege",
        title: "Privilèges",
        itemIcon: <VerifiedUserIcon />,
        content: (props) => <Privilege {...props} />,
        path: routeLink.ADMIN_MANAGE_PRIVILEGE_LINK,
        isAllowed: (user) => isSupUser(user),
      },
    ],
  },
  {
    id: "city",
    title: "Villes",
    path: routeLink.ADMIN_CITIES_LIST_LINK,
    itemIcon: <LocationCityIcon />,
    content: (props) => <City {...props} />,
    isAllowed: (user) => checkPermission(user, cityAccess.CITY),
  },
];

const checkPermission = (user, access) => {
  let allow = false;
  if (user) {
    if (user.supUser) return true;

    const { accesses } = user;

    allow = access ? (accesses ? accesses[`${access}`] : undefined) : false;
  }
  return allow;
};

const isSupUser = (user) => {
  let allow = false;
  if (user) {
    allow = user.supUser;
  }
  return allow;
};
