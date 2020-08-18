import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import useQos from "./useQos";
import context from "../../rootContext/context";

import {
  SHIPPING_LINK,
  CART_LINK,
  COMMANDE_LINK,
  COMMANDE_SHIPPING_LINK,
  PAYMENT_LINK,
  COMMANDE_PAYMENT_LINK,
  NEW_ORDER_LINK,
} from "../../routerLinks";
import SubHeader from "../../components/PageSubHeader";
import ErrorBoundary from "../../components/ErrorBoundarySuspense";
import ListSkeleton from "../../components/ListSkeleton";
import { CART, COMMANDE } from "../container/constants";

const BillingBody = React.lazy(() => import("./Body"));
const Checkout = ({ location, history }) => {
  const pathName = location.pathname;
  const isCommande = pathName === COMMANDE_PAYMENT_LINK;
  const rootContext = React.useContext(context);
  const [submiting, setSubmiting] = React.useState(false);

  const submitQosPayment = useQos({ setSubmiting });

  const {
    cart: schortCart,
    commande: shortCmd,
    getReadCartUrl,
    getFetcher,
  } = rootContext.cart;

  const { performErrorAlert } = rootContext.alert;
  const { submitOder } = rootContext.checkout;

  const classes = useStyles();

  const handleSubmitOrder = async (values) => {
    setSubmiting(true);
    const { payment: paymentInfo } = values;
    const file = isCommande ? COMMANDE : CART;
    const isMomo = paymentInfo.method === "momo";
    const payment = isMomo
      ? await submitQosPayment(paymentInfo, () => setSubmiting(false))
      : paymentInfo;

    if (payment) {
      const data = {
        ...values,
        type: file,
        payment,
      };

      submitOder(data, (resultat) => {
        if (resultat) {
          const { error } = resultat;
          error && performErrorAlert(error);
          if (!error) {
            setSubmiting(false);
            history.push(NEW_ORDER_LINK + "/" + resultat._id);
            // setSuccess("Paiement éffectué avec succès !");
          }
        }
      });
    }
  };

  const showCheckout = (rest) => (
    <ErrorBoundary
      fallback={<ListSkeleton count={8} height={48} margin="32px" />}
    >
      <BillingBody
        getFetcher={getFetcher}
        isCommande={isCommande}
        onSubmit={handleSubmitOrder}
        schortCart={isCommande ? shortCmd : schortCart}
        getReadCartUrl={getReadCartUrl}
      />
    </ErrorBoundary>
  );

  return (
    <>
      <SubHeader routes={getRoutes(pathName)} title="Paiement" />

      {showCheckout()}
      <Backdrop className={classes.backdrop} open={submiting}>
        <CircularProgress color="inherit" />
        <div style={{ fontSize: "1.2rem" }}>
          Si vous ne recevez pas une demande de validation automatiquement,
          veuillez vérifier les validations en attente,
        </div>
      </Backdrop>
    </>
  );
};

export default Checkout;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const getRoutes = (pathName) => {
  return pathName === PAYMENT_LINK
    ? [CART_LINK, SHIPPING_LINK, PAYMENT_LINK]
    : [COMMANDE_LINK, COMMANDE_SHIPPING_LINK, COMMANDE_PAYMENT_LINK];
};
