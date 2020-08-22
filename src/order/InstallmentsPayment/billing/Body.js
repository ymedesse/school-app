import React from "react";
import useSWR from "swr";

// import { Debug } from "mui-rff";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import validate from "./validations";
import SwrRender from "../../../components/SwrRender";
import compareProps from "../../../utils/compareProps";
import ListSkeleton from "../../../components/ListSkeleton";
import FormValidator from "../../../components/FormValidator";
import { LargeTypography } from "../../../components/Typography";

import ErrorBoundarySuspense from "../../../components/ErrorBoundarySuspense";

import {
  MOMO_PAYMENT_WAY,
  MOMO_PAYMENT_WAY_TITLE,
} from "../../../Paiement/container/constants";
import {
  TitleTypography,
  SubTitleTypography,
} from "../../../components/Typography";

const Methods = React.lazy(() => import("../../../Paiement/Billing/Content"));

const BillingBody = ({ getFetcher, onSubmit, orderInit, getReadUrl, id }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({ order: orderInit });
  const { order } = state;
  const url = !orderInit ? getReadUrl(id) : null;

  const { data: result } = useSWR(url, getFetcher(), {
    refreshInterval: 0,
    revalidateOnFocus: false,
    suspense: true,
  });

  React.useEffect(() => {
    if (result && !result.error) {
      setOrderPayment(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const setOrderPayment = (values) => {
    setState((state) => ({
      ...state,
      order: values,
      payment: getPaymentInit(),
    }));
  };

  const getLeftToPay = () => {
    const { leftToPay } = order;
    return leftToPay;
  };

  const getMax = () => {
    return getLeftToPay();
  };

  const showTitle = () => (
    <>
      <Box alignItems="center" display="flex" width="100%">
        <Box mb={2} flexGrow={1}>
          <TitleTypography className={classes.inline}>
            Je choisis mon mode de paiement
          </TitleTypography>
        </Box>
      </Box>
      <Box mb={2} flexGrow={1}>
        <SubTitleTypography className={classes.inline}>
          Montant total restant à solder : <strong>{getLeftToPay()} </strong>
        </SubTitleTypography>
      </Box>
    </>
  );

  const showMethodsContent = (form) => {
    return (
      <ErrorBoundarySuspense fallback={<ListSkeleton fallback={5} />}>
        <Methods showButton maxAmount={getMax()} form={form} />
      </ErrorBoundarySuspense>
    );
  };
  const getorderId = () => order.id;

  const contents = ({ form, ...props }) => {
    return (
      <>
        <LargeTypography className={classes.title}>
          Paiement commande : {getorderId()}
        </LargeTypography>
        <Paper
          variant="outlined"
          style={{ padding: "24px 8px", width: "100%" }}
        >
          {showTitle()}
          {showMethodsContent(form)}
        </Paper>
        {/* <Debug /> */}
      </>
    );
  };

  const handleSubmit = (val) => {
    onSubmit(val);
  };

  return (
    <SwrRender data={order}>
      {() => (
        <FormValidator
          onSubmit={handleSubmit}
          initialValues={state}
          subscription={{ pristine: true, submitting: true }}
          contents={contents}
          validate={validate}
        />
      )}
    </SwrRender>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  inline: {
    display: "inline",
  },
  title: {
    textAlign: "center",
    marginBottom: "24px",
  },
}));

const isEqual = (prev, next) => {
  return compareProps(prev, next, ["isCommande"]);
};

// export default BillingBody;
export default React.memo(BillingBody, isEqual);

const getPaymentInit = () => {
  return {
    method: MOMO_PAYMENT_WAY,
    amount: "",
    method_title: MOMO_PAYMENT_WAY_TITLE,
    transaction_id: "",
    transaction: undefined,
  };
};
