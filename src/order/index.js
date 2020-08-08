import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  ORDERS_LINK,
  ORDER_WITH_PARAM_LINK,
  DASHBOARD_LINK,
  INSTALLMENT_HISTORY_WITH_PARAM_LINK,
} from "../routerLinks";
import context from "../rootContext/context";
import OrdersList from "./components/Orders";
import InstallmentHistory from "./InstallmentsPayment/history";
import OrderBody from "./components/Body";

const Orders = ({ ...props }) => {
  const { match, history } = props;
  const rootContext = React.useContext(context);
  const classes = useStyles();

  const { ...rest } = rootContext.order;
  const { setSuccess, performErrorAlert } = rootContext.alert;
  const alertState = { setSuccess, performErrorAlert };
  const { path, params } = match;

  const renderComponent = () => {
    if (path === ORDERS_LINK) return <OrdersList {...props} {...rest} />;
    if (path === INSTALLMENT_HISTORY_WITH_PARAM_LINK)
      return <InstallmentHistory {...props} {...rest} id={params.orderId} />;

    if (path === ORDER_WITH_PARAM_LINK) {
      return (
        <OrderBody {...alertState} {...props} {...rest} id={params.orderId} />
      );
    }

    history.push(DASHBOARD_LINK);
  };

  return <Paper variant="outlined" className={classes.paper}>{renderComponent()}</Paper>;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "auto",
    padding: theme.spacing(2, 3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },
}));

export default React.memo(Orders);

//   const { setSuccess, performErrorAlert } = rootContext.alert;
//   const onUpdateWooStatus = (item, value, next) => {
//     updateWooStatus(item, value, (data) => {
//       if (data) {
//         const { error } = data;
//         performErrorAlert(error);
//         if (!error) {
//           setSuccess("Mis à jour avec succès");
//           next();
//         }
//       }
//     });
//   };
