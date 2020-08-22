import React from "react";
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
import SubmitBackDrop from "../components/SubmitBackDrop";
import SubHeader from "../../components/PageSubHeader";
import ErrorBoundary from "../../components/ErrorBoundarySuspense";
import LineProgressBuffer from "../../components/LineProgressBuffer";
import { CART, COMMANDE } from "../container/constants";

const BillingBody = React.lazy(() => import("./Body"));
const Checkout = ({ location, history }) => {
  const pathName = location.pathname;
  const isCommande = pathName === COMMANDE_PAYMENT_LINK;
  const rootContext = React.useContext(context);
  const [state, setState] = React.useState({
    submiting: false,
    isMomo: false,
  });

  const { submiting, isMomo } = state;
  const setSubmiting = (val) =>
    setState((state) => ({ ...state, submiting: val }));

  const submitQosPayment = useQos({ setSubmiting });

  const {
    cart: schortCart,
    commande: shortCmd,
    getReadCartUrl,
    getFetcher,
  } = rootContext.cart;

  const { performErrorAlert } = rootContext.alert;
  const { submitOder } = rootContext.checkout;

  const handleSubmitOrder = async (values) => {
    const { payment: paymentInfo } = values;
    const file = isCommande ? COMMANDE : CART;
    const isMomo = paymentInfo.method === "momo";

    setState((state) => ({ ...state, submiting: true, isMomo }));

    const payment = isMomo
      ? await submitQosPayment(paymentInfo, () => setSubmiting(false))
      : paymentInfo;

    console.log({ payment });
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
            history.push(NEW_ORDER_LINK + "/" + resultat.id);
            // setSuccess("Paiement éffectué avec succès !");
          }
        }
      });
    }
  };

  const showCheckout = (rest) => (
    <ErrorBoundary fallback={<LineProgressBuffer />}>
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
      <SubmitBackDrop
        submiting={submiting}
        setSubmiting={setSubmiting}
        isMomo={isMomo}
      />
    </>
  );
};

export default Checkout;

const getRoutes = (pathName) => {
  return pathName === PAYMENT_LINK
    ? [CART_LINK, SHIPPING_LINK, PAYMENT_LINK]
    : [COMMANDE_LINK, COMMANDE_SHIPPING_LINK, COMMANDE_PAYMENT_LINK];
};
