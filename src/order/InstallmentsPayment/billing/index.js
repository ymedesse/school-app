import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import useQos from "../../../Paiement/Billing/useQos";
import context from "../../../rootContext/context";
import SubHeader from "../../../components/PageSubHeader";
import ListSkeleton from "../../../components/ListSkeleton";
import ErrorBoundary from "../../../components/ErrorBoundarySuspense";
import {
  ORDERS_LINK,
  INSTALLMENT_PAYMENT_WITH_PARAMS_LINK,
  INSTALLMENT_HISTORY_LINK,
} from "../../../routerLinks";
import SubmitBackDrop from "../../../Paiement/components/SubmitBackDrop";
const BillingBody = React.lazy(() => import("./Body"));
const InstallmentPayement = ({ match, history, location }) => {
  const id = match.params.orderId;
  const pathName = location.pathname;

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
    currentOrder: order,
    getReadUrl,
    getFetcher,
    submitInstallmentPayment,
  } = rootContext.order;

  const { setSuccess, performErrorAlert } = rootContext.alert;

  const classes = useStyles();

  const handleSubmitPayment = async (values) => {
    const { payment: paymentInfo } = values;
    const isMomo = paymentInfo.method === "momo";

    setState((state) => ({ ...state, submiting: true, isMomo }));

    const payment = isMomo
      ? await submitQosPayment(paymentInfo, () => setSubmiting(false))
      : paymentInfo;

    if (payment) {
      const data = {
        ...values,
        payment,
      };

      submitInstallmentPayment(id, data, (resultat) => {
        if (resultat) {
          const { error } = resultat;
          error && performErrorAlert(error);
          if (!error) {
            setSubmiting(false);
            history.push(INSTALLMENT_HISTORY_LINK + "/" + id);
            setSuccess("Paiement éffectué avec succès !");
          }
        }
      });
    }
  };

  const showCheckout = (rest) => (
    <ErrorBoundary
      fallback={<ListSkeleton count={8} height={48} margin="32px" />}
    >
      <div className={classes.body}>
        <BillingBody
          getFetcher={getFetcher}
          onSubmit={handleSubmitPayment}
          order={order}
          getReadUrl={getReadUrl}
          id={id}
        />
      </div>
    </ErrorBoundary>
  );

  return (
    <>
      <SubHeader routes={getRoutes(pathName)} />

      {showCheckout()}

      <SubmitBackDrop
        submiting={submiting}
        setSubmiting={setSubmiting}
        isMomo={isMomo}
      />
    </>
  );
};

export default InstallmentPayement;

const useStyles = makeStyles((theme) => ({
  body: {
    maxWidth: "800px",
    margin: "auto",
  },
}));

const getRoutes = () => {
  return [ORDERS_LINK, INSTALLMENT_PAYMENT_WITH_PARAMS_LINK];
};
