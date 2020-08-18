import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import useSWR from "swr";
import {
  MOMO_PAYMENT_WAY,
  MOMO_PAYMENT_WAY_TITLE,
} from "../container/constants";
import {
  TitleTypography,
  SubTitleTypography,
} from "../../components/Typography";
import ListSkeleton from "../../components/ListSkeleton";
import ErrorBoundarySuspense from "../../components/ErrorBoundarySuspense";
import FormValidator from "../../components/FormValidator";
// import { Debug } from "mui-rff";
import { convertSNumber } from "../../utils";
import validate from "./validations";
import compareProps from "../../utils/compareProps";
import { CART, COMMANDE } from "../container/constants";
import { getMin } from "./utils";

const Methods = React.lazy(() => import("./Content"));
const Facturation = React.lazy(() => import("./Facturation"));

const BillingBody = ({
  isCommande = false,
  getFetcher,
  getReadCartUrl,
  onSubmit,
}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({});
  const file = isCommande ? COMMANDE : CART;
  const url = getReadCartUrl(file);

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

  const { cart = {} } = state;

  const setOrderPayment = (values) => {
    const { [`${file}`]: cart } = values;
    setState((state) => ({
      ...state,
      cart,
      payment: getPaymentInit(),
    }));
  };

  const getTotalAmount = () => {
    const { totalAmount = 0 } = cart;
    return totalAmount;
  };

  const totalAmount = getTotalAmount();

  const getShippingPrice = () => {
    const { shipping = {} } = cart;
    const value = convertSNumber(shipping.total);
    return value;
  };

  const getMax = (totalAmount) => {
    return totalAmount;
  };

  const showShortView = (form) => (
    <ErrorBoundarySuspense fallback={<ListSkeleton fallback={5} />}>
      <Facturation
        cart={cart}
        isCommande={isCommande}
        submitLabel={"PAYER"}
        shippingPrice={getShippingPrice()}
        initialExpanded={true}
        endStep
      />
    </ErrorBoundarySuspense>
  );

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
          Montant minimum à payer :{" "}
          <strong>{getMin(totalAmount, file)} </strong>
        </SubTitleTypography>
      </Box>
    </>
  );

  const showMethodsContent = (form) => {
    const totalAmount = getTotalAmount();
    return (
      <ErrorBoundarySuspense fallback={<ListSkeleton fallback={5} />}>
        <Methods maxAmount={getMax(totalAmount)} form={form} />
      </ErrorBoundarySuspense>
    );
  };

  const contents = ({ form, ...props }) => {
    return (
      <>
        <Grid spacing={2} container>
          <Grid item xs={12} sm={8}>
            <Paper style={{ padding: "24px 8px", width: "100%" }}>
              {showTitle()}
              {showMethodsContent(form)}
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            {showShortView(form)}
          </Grid>
        </Grid>
        {/* <Debug /> */}
      </>
    );
  };

  const handleSubmit = (values) => {
    const { cart } = { ...values };
    delete values.cart;
    const val = { ...values, [`${file}`]: cart };
    onSubmit(val);
  };

  return (
    <>
      <FormValidator
        onSubmit={handleSubmit}
        initialValues={state}
        subscription={{ pristine: true, submitting: true }}
        contents={contents}
        validate={validate(file)}
      />
    </>
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
