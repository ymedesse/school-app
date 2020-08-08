import * as routeLink from "../routerLinks";
import Intro from "./Intro";
import Adresses from "../user/layout/Adresses";
import Compte from "../user";
import Orders from "../order";
// import Notifications from "../user/layout/Notifications";
// import Payments from "../user/layout/Payment";
// import Messages from "../user/layout/Messages";
// const CountBadge = ({ count }) => {
//   return (
//     <Badge
//       badgeContent={count}
//       style={{ marginLeft: "20px" }}
//       color="secondary"
//     />
//   );
// };

const menuConfig = [
  {
    path: routeLink.DASHBOARD_LINK,
    title: "Tableau de bord",
    content: Intro,
    isRootLink: true,
  },
  {
    path: routeLink.ORDERS_LINK,
    title: "Commandes",
    content: Orders,
    isRootLink: true,
  },
  {
    path: routeLink.ORDER_WITH_PARAM_LINK,
    title: "Commande",
    content: Orders,
    isRootLink: false,
  },
  {
    path: routeLink.ADRESSES_LINK,
    title: "Adresses",
    content: Adresses,
    isRootLink: true,
  },
  {
    path: routeLink.COMPTE_LINK,
    title: "Détails du compte",
    content: Compte,
    isRootLink: true,
  },
  // {
  //   path: routeLink.DASHBOARD_PAYMENT_LINK,
  //   title: "Payements",
  //   content: Payments,
  //   isRootLink: true,
  // },
  {
    path: routeLink.INSTALLMENT_HISTORY_WITH_PARAM_LINK,
    title: "historique de paiement",
    content: Orders,
  },
  // {
  //   path: routeLink.NOTIFICATIONS_LINK,
  //   title: "Notification",
  //   content: Notifications,
  //   isRootLink: true,
  // },
  // {
  //   path: routeLink.MESSAGES_LINK,
  //   title: "Messages",
  //   content: Messages,
  //   isRootLink: true,
  // },
  // {
  //   path: routeLink.COUPONS_LINK,
  //   title: "Coupons",
  //   content: Messages,
  //   isRootLink: true,
  // },
];

export { menuConfig };
