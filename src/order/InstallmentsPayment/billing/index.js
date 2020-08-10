import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
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

const BillingBody = React.lazy(() => import("./Body"));
const InstallmentPayement = ({ match, history, location }) => {
  const id = match.params.orderId;
  const pathName = location.pathname;

  const rootContext = React.useContext(context);
  const [submiting, setSubmiting] = React.useState(false);
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
    setSubmiting(true);
    const { payment: paymentInfo } = values;
    const paymentData = await submitQosPayment(paymentInfo);

    if (paymentData) {
      const { date_paid, serviceref } = { ...paymentData };
      delete paymentData.date_paid;
      delete paymentData.serviceref;
      delete paymentData.responsemsg;

      const payment = {
        ...paymentInfo,
        date_paid,
        transaction_id: serviceref,
        transaction: { ...paymentData },
      };

      submitInstallmentPayment(id, payment, (resultat) => {
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

      <Backdrop
        className={classes.backdrop}
        open={submiting}
        // onClick={() => setSubmiting(false)}
      >
        <CircularProgress color="inherit" />
        <div style={{ fontSize: "1rem" }}>
          Si vous ne recevez pas une demande de validation automatiquement,
          veuillez vérifier les validations en attente,
        </div>
      </Backdrop>
    </>
  );
};

export default InstallmentPayement;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  body: {
    maxWidth: "800px",
    margin: "auto",
  },
}));

const getRoutes = () => {
  return [ORDERS_LINK, INSTALLMENT_PAYMENT_WITH_PARAMS_LINK];
};
